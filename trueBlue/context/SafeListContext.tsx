import React, { createContext, useState, useContext, useEffect, useCallback } from 'react'; // Added useCallback
import { db } from '@/firebaseConfig';
import { collection, getDocs, doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from './AuthContext';

import { Product, SafeListContextType } from '@/types/types';

const SafeListContext = createContext<SafeListContextType | undefined>(undefined);

export const SafeListProvider = ({children}: {children: React.ReactNode}) => {
  const [safeList, setSafeList] = useState<Product[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const loadSafeList = async () => {
      if (!user) {
        setSafeList([]);
        return;
      }
      try {
        // 1. Get product IDs from the user's safelist subcollection
        const userProductsRef = collection(db, "userSafeLists", user.uid, "products");
        const userProductsSnapshot = await getDocs(userProductsRef);
        const productIds: string[] = [];
        userProductsSnapshot.forEach((doc) => {
          productIds.push(doc.id); // doc.id is the product _id
        });

        // 2. Fetch full product details from the main 'products' collection
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
    if (!user) {
      console.error("No user logged in to save product to safelist.");
      return;
    }

    // Check if product is already in user's safelist
    const userProductDocRef = doc(db, "userSafeLists", user.uid, "products", product._id);
    const userProductDocSnap = await getDoc(userProductDocRef);
    if (userProductDocSnap.exists()) {
      console.log("Product already in user's safelist.");
      return;
    }

    // Explicitly pick only the fields defined in the Product interface
    const productDataToSave: Product = {
      _id: product._id,
      product_name: product.product_name,
      image_url: product.image_url,
      brands: product.brands,
      quantity: product.quantity,
      countries: product.countries,
      nutrition_grade_fr: product.nutrition_grade_fr,
      ingredients_text: product.ingredients_text,
      allergens_from_ingredients: product.allergens_from_ingredients,
    };

    // Sanitize fields that might unexpectedly be arrays
    if (Array.isArray(productDataToSave.ingredients_text)) {
      productDataToSave.ingredients_text = productDataToSave.ingredients_text.join(', ');
    }
    if (Array.isArray(productDataToSave.allergens_from_ingredients)) {
      productDataToSave.allergens_from_ingredients = productDataToSave.allergens_from_ingredients.join(', ');
    }
    if (Array.isArray(productDataToSave.countries)) {
      productDataToSave.countries = productDataToSave.countries.join(', ');
    }

    if (!productDataToSave.product_name && productDataToSave.brands) {
        productDataToSave.product_name = productDataToSave.brands.split(',')[0].trim();
    }

    try {
      // 1. Save product details to the main 'products' collection
      // Use setDoc with merge: true to avoid overwriting if product already exists
      await setDoc(doc(db, "products", product._id), productDataToSave, { merge: true });

      // 2. Add a reference to this product in the user's safelist subcollection
      await setDoc(userProductDocRef, { addedAt: serverTimestamp() });

      console.log(`Product ${product._id} added to main products collection and user's safelist.`);

      // Update the local safelist with the newly added product
      setSafeList((prevSafeList) => [...prevSafeList, productDataToSave]);
    } catch (e) {
      console.error('Failed to save product to Firestore', e);
    }
  };

  const isProductInSafeList = useCallback(async (productId: string) => {
    if (!user) return false;
    const userProductDocRef = doc(db, "userSafeLists", user.uid, "products", productId);
    const userProductDocSnap = await getDoc(userProductDocRef);
    return userProductDocSnap.exists();
  }, [user]);

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
