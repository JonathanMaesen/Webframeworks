import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { db } from '@/firebaseConfig';
import { collection, getDocs, doc, setDoc, getDoc, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';
import { Product } from '@/types & interfaces/types';

interface SafeListContextType {
  safeList: Product[];
  addToSafeList: (product: Product) => Promise<void>;
  isProductInSafeList: (productId: string) => Promise<boolean>;
  removeFromSafeList: (productId: string) => Promise<void>;
}

const SafeListContext = createContext<SafeListContextType | undefined>(undefined);

export const SafeListProvider = ({ children }: { children: React.ReactNode }) => {
  const [safeList, setSafeList] = useState<Product[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const loadSafeList = async () => {
      if (!user) {
        setSafeList([]);
        return;
      }
      try {
        const userProductsRef = collection(db, "userSafeLists", user.uid, "products");
        const userProductsSnapshot = await getDocs(userProductsRef);
        const productIds: string[] = userProductsSnapshot.docs.map(doc => doc.id);

        const fetchedProducts: Product[] = [];
        for (const pId of productIds) {
          const productDocRef = doc(db, "products", pId);
          const productDocSnap = await getDoc(productDocRef);
          if (productDocSnap.exists()) {
            fetchedProducts.push({ ...productDocSnap.data() as Product, _id: productDocSnap.id });
          }
        }
        setSafeList(fetchedProducts);
      } catch (e) {
        console.error('Failed to load safelist from Firestore', e);
      }
    };

    loadSafeList().catch(e => console.error('Failed to load user-specific safelist', e));
  }, [user]);

  const addToSafeList = async (product: Product) => {
    if (safeList.some(p => p._id === product._id)) {
        console.log("Optimistic check failed: Product already in safelist.");
        return;
    }
      
    if (!user) {
      throw new Error("No user logged in to save product to safelist.");
    }

    const productDataToSave: Product = {
      _id: product._id,
      product_name: product.product_name,
      image_url: product.image_url,
      brands: product.brands,
      quantity: product.quantity,
      countries: product.countries,
      manufacturing_places: product.manufacturing_places,
      nutrition_grade_fr: product.nutrition_grade_fr,
      ingredients_text: Array.isArray(product.ingredients_text) ? product.ingredients_text.join(', ') : product.ingredients_text,
      allergens_from_ingredients: Array.isArray(product.allergens_from_ingredients) ? product.allergens_from_ingredients.join(', ') : product.allergens_from_ingredients,
    };
    if (!productDataToSave.product_name && productDataToSave.brands) {
        productDataToSave.product_name = productDataToSave.brands.split(',')[0].trim();
    }

    setSafeList((prevSafeList) => [...prevSafeList, productDataToSave]);

    try {
      const productDocRef = doc(db, "products", product._id);
      const userProductDocRef = doc(db, "userSafeLists", user.uid, "products", product._id);

      await setDoc(productDocRef, productDataToSave, { merge: true });
      await setDoc(userProductDocRef, { addedAt: serverTimestamp() });
    } catch (e) {
      console.error('Failed to save product to Firestore', e);
      setSafeList((prevSafeList) => prevSafeList.filter(p => p._id !== product._id));
      throw e;
    }
  };

  const isProductInSafeList = useCallback(async (productId: string) => {
    if (!user) return false;
    const userProductDocRef = doc(db, "userSafeLists", user.uid, "products", productId);
    const userProductDocSnap = await getDoc(userProductDocRef);
    return userProductDocSnap.exists();
  }, [user]);

  const removeFromSafeList = async (productId: string) => {
    if (!user) {
      throw new Error("No user logged in to remove product from safelist.");
    }
    
    const productToRemove = safeList.find(p => p._id === productId);
    if (!productToRemove) return;

    setSafeList((prevSafeList) => prevSafeList.filter((product) => product._id !== productId));

    try {
      const userProductDocRef = doc(db, "userSafeLists", user.uid, "products", productId);
      await deleteDoc(userProductDocRef);
    } catch (e) {
      console.error('Failed to remove product from safelist, rolling back', e);
      setSafeList((prevSafeList) => [...prevSafeList, productToRemove]);
      throw e;
    }
  };

  return (
    <SafeListContext.Provider value={{ safeList, addToSafeList, isProductInSafeList, removeFromSafeList }}>
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
