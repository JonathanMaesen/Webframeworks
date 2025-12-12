import React, {createContext, useState, useContext, useEffect, useRef, useCallback} from 'react';
import { db } from '@/firebaseConfig';
import { collection, getDocs, doc, getDoc, serverTimestamp, writeBatch } from 'firebase/firestore';
import { useAuth } from './AuthContext';
import { Product, SafeListContextType } from '@/types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

type Action = { type: 'add'; payload: Product } | { type: 'remove'; payload: string };

const SafeListContext = createContext<SafeListContextType | undefined>(undefined);
const ACTION_QUEUE_KEY = 'safeListActionQueue';
const LOCAL_SAFELIST_KEY = 'localSafeList';

// --- Helper Functions ---

const sanitizeProduct = (product: Product): Product => {
  const sanitizeField = (field: any) => {
    if (field == null) return null;
    if (Array.isArray(field)) return field.flat(Infinity).filter(i => i != null).join(', ');
    return String(field);
  };
  return {
    _id: product._id,
    product_name: sanitizeField(product.product_name) ?? 'Unknown Product',
    image_url: sanitizeField(product.image_url),
    brands: sanitizeField(product.brands),
    quantity: sanitizeField(product.quantity),
    countries: sanitizeField(product.countries),
    manufacturing_places: sanitizeField(product.manufacturing_places),
    nutrition_grade_fr: sanitizeField(product.nutrition_grade_fr),
    ingredients_text: sanitizeField(product.ingredients_text),
    allergens_from_ingredients: sanitizeField(product.allergens_from_ingredients),
  } as Product;
};

const fetchRemoteList = async (userId: string): Promise<Product[]> => {
  try {
    const userProductsRef = collection(db, "userSafeLists", userId, "products");
    const snapshot = await getDocs(userProductsRef);
    const products = await Promise.all(snapshot.docs.map(async (d) => {
      const snap = await getDoc(doc(db, "products", d.id));
      return snap.exists() ? { ...snap.data() as Product, _id: snap.id } : null;
    }));
    return products.filter((p): p is Product => p !== null);
  } catch (error) {
    console.error("Failed to fetch remote safe list:", error);
    return [];
  }
};

const syncQueueWithFirestore = async (userId: string, queue: Action[]): Promise<Action[]> => {
  if (queue.length === 0) return [];
  const batch = writeBatch(db);
  
  queue.forEach(action => {
    if (action.type === 'add') {
      const product = sanitizeProduct(action.payload);
      batch.set(doc(db, "products", product._id), product, { merge: true });
      batch.set(doc(db, "userSafeLists", userId, "products", product._id), { addedAt: serverTimestamp() });
    } else {
      batch.delete(doc(db, "userSafeLists", userId, "products", action.payload));
    }
  });

  try {
    await batch.commit();
    console.log(`[Sync Success] ${queue.length} actions synced.`);
    return queue;
  } catch (error) {
    console.error("[Sync Error] Failed to sync queue:", error);
    return [];
  }
};

// --- Custom Hook for Logic ---

const useSafeListLogic = () => {
  const { user } = useAuth();
  const [safeList, setSafeList] = useState<Product[]>([]);
  const [actionQueue, setActionQueue] = useState<Action[]>([]);
  const [loading, setLoading] = useState(true);
  const isSyncing = useRef(false);

  // Refs to hold the latest state for callbacks, avoiding stale closures.
  const queueRef = useRef(actionQueue);
  queueRef.current = actionQueue;
  const userRef = useRef(user);
  userRef.current = user;

  // Centralized function to update state and persist to AsyncStorage.
  const updateStateAndPersist = useCallback((list: Product[], queue: Action[]) => {
    setSafeList(list);
    setActionQueue(queue);
    const currentUser = userRef.current;
    if (currentUser) {
      AsyncStorage.setItem(`${LOCAL_SAFELIST_KEY}_${currentUser.uid}`, JSON.stringify(list));
      AsyncStorage.setItem(`${ACTION_QUEUE_KEY}_${currentUser.uid}`, JSON.stringify(queue));
    }
  }, []);

  // The core sync logic
  const syncList = useCallback(async () => {
    const currentUser = userRef.current;
    if (!currentUser || isSyncing.current) return;

    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) return;

    isSyncing.current = true;
    if (queueRef.current.length > 0) setLoading(true);

    const queueToSync = [...queueRef.current];
    const processedActions = await syncQueueWithFirestore(currentUser.uid, queueToSync);
    const remoteList = await fetchRemoteList(currentUser.uid);

    // Filter out actions that were successfully synced.
    const newQueue = queueRef.current.filter(
      (action) => !processedActions.some(p => p.payload === action.payload && p.type === action.type)
    );

    // Re-create the list by applying the remaining (un-synced) actions to the fresh remote list.
    const mergedList = newQueue.reduce((list, action) => {
      if (action.type === 'add') {
        return list.some(p => p._id === action.payload._id) ? list : [...list, action.payload];
      }
      if (action.type === 'remove') {
        return list.filter(p => p._id !== action.payload);
      }
      return list;
    }, remoteList);

    updateStateAndPersist(mergedList, newQueue);
    
    isSyncing.current = false;
    setLoading(false);

    if (queueRef.current.length > 0) {
      setTimeout(() => syncList(), 500); // Debounce to prevent rapid loops.
    }
  }, [updateStateAndPersist]);

  // Effect for initialization: Load from storage and perform initial sync.
  useEffect(() => {
    if (!user) {
      updateStateAndPersist([], []);
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);

    const loadFromStorage = async () => {
      const [list, queue] = await Promise.all([
        AsyncStorage.getItem(`${LOCAL_SAFELIST_KEY}_${user.uid}`),
        AsyncStorage.getItem(`${ACTION_QUEUE_KEY}_${user.uid}`)
      ]);
      if (isMounted) {
        setSafeList(list ? JSON.parse(list) : []);
        setActionQueue(queue ? JSON.parse(queue) : []);
        syncList(); // Once local state is restored, trigger sync with remote.
      }
    };

    loadFromStorage();
    return () => { isMounted = false; };
  }, [user, syncList, updateStateAndPersist]);

  // Effect for network connectivity: Trigger sync when coming online.
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        syncList();
      }
    });
    return () => unsubscribe();
  }, [syncList]);
  
  // Helper to apply a local change and trigger a sync.
  const applyChangeAndSync = (newList: Product[], newAction: Action) => {
    const newQueue = [...actionQueue, newAction];
    updateStateAndPersist(newList, newQueue);
    syncList();
  };

  const addToSafeList = (product: Product) => {
    if (!product._id || safeList.some(p => p._id === product._id)) return;
    const sanitized = sanitizeProduct(product);
    const action: Action = { type: 'add', payload: sanitized };
    applyChangeAndSync([...safeList, sanitized], action);
  };

  const removeFromSafeList = (productId: string) => {
    if (!safeList.some(p => p._id === productId)) return;
    const action: Action = { type: 'remove', payload: productId };
    applyChangeAndSync(safeList.filter(p => p._id !== productId), action);
  };

  const isProductInSafeList = (productId: string) => safeList.some(p => p._id === productId);

  return { safeList, loading, addToSafeList, removeFromSafeList, isProductInSafeList };
};


// --- Provider Component ---

export const SafeListProvider = ({ children }: { children: React.ReactNode }) => {
  const value = useSafeListLogic();
  return (
    <SafeListContext.Provider value={value}>
      {children}
    </SafeListContext.Provider>
  );
};

export const useSafeList = () => {
  const context = useContext(SafeListContext);
  if (context === undefined) {
    throw new Error('useSafeList must be used within a SafeListProvider');
  }
  return context;
};
