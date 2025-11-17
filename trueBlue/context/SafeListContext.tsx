import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { db } from '@/firebaseConfig';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { useAuth } from './AuthContext';

export interface Product {
  _id: string;
  product_name: string;
  image_url?: string;
  brands?: string;
  quantity?: string;
  countries?: string;
  nutrition_grade_fr?: string;
  ingredients_text?: string;
  allergens_from_ingredients?: string;
}

interface SafeListContextType {
  safeList: Product[];
  addToSafeList: (product: Product) => void;
  isProductInSafeList: (productId: string) => boolean;
}

const SafeListContext = createContext<SafeListContextType | undefined>(undefined);

export const SafeListProvider = ({ children }: { children: ReactNode }) => {
  const [safeList, setSafeList] = useState<Product[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const loadSafeList = async () => {
      if (!user) {
        setSafeList([]);
        return;
      }
      try {
        const q = query(collection(db, "safeList"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const items: Product[] = [];
        querySnapshot.forEach((doc) => {
          items.push({ ...doc.data() as Product, _id: doc.data()._id });
        });
        setSafeList(items);
      } catch (e) {
        console.error('Failed to load safelist from Firestore', e);
      }
    };

    loadSafeList().catch(e => console.error('Failed to load user-specific safelist', e));
  }, [user]);

  const addToSafeList = async (product: Product) => {
    if (isProductInSafeList(product._id)) {
      return;
    }

    if (!user) {
      console.error("No user logged in to save product to safelist.");
      return;
    }

    const productToAdd: Omit<Product, '_id'> & { userId: string, _id: string } = { ...product, userId: user.uid };
    if (!productToAdd.product_name && productToAdd.brands) {
        productToAdd.product_name = productToAdd.brands.split(',')[0].trim();
    }

    try {
      const docRef = await addDoc(collection(db, "safeList"), { ...productToAdd });
      console.log("Document written with ID: ", docRef.id);

      const newSafeList = [...safeList, productToAdd];
      setSafeList(newSafeList);
    } catch (e) {
      console.error('Failed to save safelist to storage', e);
    }
  };

  const isProductInSafeList = (productId: string) => {
    return safeList.some(item => item._id === productId);
  };

  return (
    <SafeListContext.Provider value={{ safeList, addToSafeList, isProductInSafeList }}>
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
