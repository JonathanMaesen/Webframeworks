import React, { createContext, useState, useContext, useEffect } from 'react';
import { db } from '@/firebaseConfig';
import { collection, getDocs, doc, setDoc, getDoc, serverTimestamp, deleteDoc, writeBatch } from 'firebase/firestore';
import { useAuth } from './AuthContext';
import { Product } from '@/types & interfaces/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

type Action = { type: 'add'; payload: Product } | { type: 'remove'; payload: string };

interface SafeListContextType {
  safeList: Product[];
  addToSafeList: (product: Product) => Promise<void>;
  isProductInSafeList: (productId: string) => boolean;
  removeFromSafeList: (productId: string) => Promise<void>;
  loading: boolean;
}

const SafeListContext = createContext<SafeListContextType | undefined>(undefined);

const ACTION_QUEUE_KEY = 'safeListActionQueue';
const LOCAL_SAFELIST_KEY = 'localSafeList';

const sanitizeProductForFirestore = (product: Product): Product => {
    const sanitizeField = (field: any): string | undefined => {
        if (field === null || field === undefined) return undefined;
        if (Array.isArray(field)) {
            return field.flat(Infinity).filter(item => item !== null && item !== undefined).join(', ');
        }
        return String(field);
    };

    return {
      _id: product._id,
      product_name: sanitizeField(product.product_name)!,
      image_url: sanitizeField(product.image_url),
      brands: sanitizeField(product.brands),
      quantity: sanitizeField(product.quantity),
      countries: sanitizeField(product.countries),
      manufacturing_places: sanitizeField(product.manufacturing_places),
      nutrition_grade_fr: sanitizeField(product.nutrition_grade_fr),
      ingredients_text: sanitizeField(product.ingredients_text),
      allergens_from_ingredients: sanitizeField(product.allergens_from_ingredients),
    };
};

export const SafeListProvider = ({ children }: { children: React.ReactNode }) => {
  const [safeList, setSafeList] = useState<Product[]>([]);
  const [actionQueue, setActionQueue] = useState<Action[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const managePersistence = async () => {
      if (user) {
        await AsyncStorage.setItem(`${ACTION_QUEUE_KEY}_${user.uid}`, JSON.stringify(actionQueue));
        await AsyncStorage.setItem(`${LOCAL_SAFELIST_KEY}_${user.uid}`, JSON.stringify(safeList));
      }
    };
    managePersistence();
  }, [actionQueue, safeList, user]);

  useEffect(() => {
    const initialize = async () => {
      if (!user) {
        setSafeList([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      const localListJson = await AsyncStorage.getItem(`${LOCAL_SAFELIST_KEY}_${user.uid}`);
      setSafeList(localListJson ? JSON.parse(localListJson) : []);

      const savedQueueJson = await AsyncStorage.getItem(`${ACTION_QUEUE_KEY}_${user.uid}`);
      const savedQueue = savedQueueJson ? JSON.parse(savedQueueJson) : [];
      
      const netState = await NetInfo.fetch();
      if (netState.isConnected) {
        await processQueue(savedQueue);
        const firestoreList = await fetchFirestoreList();
        setSafeList(firestoreList);
        setActionQueue([]);
      } else {
        setActionQueue(savedQueue);
      }
      setLoading(false);
    };

    const unsubscribeNetInfo = NetInfo.addEventListener(state => {
      if (state.isConnected && user && actionQueue.length > 0) {
        processQueue(actionQueue);
      }
    });

    initialize();
    return () => unsubscribeNetInfo();
  }, [user]);

  const fetchFirestoreList = async (): Promise<Product[]> => {
    if (!user) return [];
    try {
      const userProductsRef = collection(db, "userSafeLists", user.uid, "products");
      const userProductsSnapshot = await getDocs(userProductsRef);
      const productIds = userProductsSnapshot.docs.map(doc => doc.id);

      const fetchedProducts = await Promise.all(productIds.map(async (pId) => {
        const productDocRef = doc(db, "products", pId);
        const productDocSnap = await getDoc(productDocRef);
        return productDocSnap.exists() ? { ...productDocSnap.data() as Product, _id: productDocSnap.id } : null;
      }));
      
      return fetchedProducts.filter((p): p is Product => p !== null);
    } catch (error) {
      console.error("Failed to fetch Firestore list:", error);
      return [];
    }
  };

  const processQueue = async (queue: Action[]) => {
    if (!user || queue.length === 0) return;

    const batch = writeBatch(db);
    queue.forEach(action => {
      if (action.type === 'add') {
        const sanitizedProduct = sanitizeProductForFirestore(action.payload);
        const productDocRef = doc(db, "products", sanitizedProduct._id);
        const userProductDocRef = doc(db, "userSafeLists", user.uid, "products", sanitizedProduct._id);
        batch.set(productDocRef, sanitizedProduct, { merge: true });
        batch.set(userProductDocRef, { addedAt: serverTimestamp() });
      } else if (action.type === 'remove') {
        const productId = action.payload;
        const userProductDocRef = doc(db, "userSafeLists", user.uid, "products", productId);
        batch.delete(userProductDocRef);
      }
    });

    try {
      await batch.commit();
      console.log(`[Sync Success] Successfully synced ${queue.length} action(s) to Firestore.`);
      setActionQueue(currentQueue => currentQueue.filter(a => !queue.includes(a)));
    } catch (error) {
      console.error("[Sync Error] Failed to sync action queue to Firestore:", error);
    }
  };

  const addToSafeList = async (product: Product) => {
    if (safeList.some(p => p._id === product._id)) return;
    const productDataToSave = sanitizeProductForFirestore(product);
    const action: Action = { type: 'add', payload: productDataToSave };
    setSafeList(prev => [...prev, productDataToSave]);
    setActionQueue(prev => [...prev, action]);
  };

  const removeFromSafeList = async (productId: string) => {
    const action: Action = { type: 'remove', payload: productId };
    setSafeList(prev => prev.filter(p => p._id !== productId));
    setActionQueue(prev => [...prev, action]);
  };

  const isProductInSafeList = (productId: string) => {
    return safeList.some(p => p._id === productId);
  };

  return (
    <SafeListContext.Provider value={{ safeList, addToSafeList, isProductInSafeList, removeFromSafeList, loading }}>
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
