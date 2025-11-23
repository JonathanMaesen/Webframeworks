import React, { createContext, useState, useContext, useEffect } from 'react';
import { db } from '@/firebaseConfig';
import { doc, getDoc, setDoc, getDocs, collection, writeBatch } from 'firebase/firestore';
import { useAuth } from './AuthContext';

interface AllergenContextType {
  allergens: string[];
  addAllergen: (allergen: string) => Promise<void>;
  removeAllergen: (allergen: string) => Promise<void>;
  loading: boolean;
}

const AllergenContext = createContext<AllergenContextType | undefined>(undefined);

export const AllergenProvider = ({ children }: { children: React.ReactNode }) => {
  const [allergens, setAllergens] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const loadAllergens = async () => {
      if (!user) {
        setAllergens([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const userAllergensRef = collection(db, 'userAllergens', user.uid, 'selected');
        const querySnapshot = await getDocs(userAllergensRef);
        const userAllergens = querySnapshot.docs.map(doc => doc.id);
        setAllergens(userAllergens);
      } catch (error) {
        console.error("Failed to load allergens:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAllergens();
  }, [user]);

  const addAllergen = async (allergen: string) => {
    if (!user || !allergen.trim()) return;
    const newAllergen = allergen.trim().toLowerCase();
    if (allergens.includes(newAllergen)) return;

    const batch = writeBatch(db);

    // 1. Add to the global 'allergens' collection to ensure it exists
    const globalAllergenRef = doc(db, 'allergens', newAllergen);
    batch.set(globalAllergenRef, { name: newAllergen });

    // 2. Add a reference to the user's subcollection
    const userAllergenRef = doc(db, 'userAllergens', user.uid, 'selected', newAllergen);
    batch.set(userAllergenRef, {}); // Store an empty object as a reference

    try {
      await batch.commit();
      setAllergens(prev => [...prev, newAllergen]);
    } catch (error) {
      console.error("Failed to add allergen:", error);
    }
  };

  const removeAllergen = async (allergen: string) => {
    if (!user) return;
    
    const userAllergenRef = doc(db, 'userAllergens', user.uid, 'selected', allergen);
    try {
      // We only need to delete the reference in the user's subcollection.
      // We leave the global allergen in place for other users.
      await setDoc(userAllergenRef, {}, { merge: false }); // Using setDoc with merge:false is equivalent to delete for this purpose
      await doc(userAllergenRef).delete();

      setAllergens(prev => prev.filter(a => a !== allergen));
    } catch (error) {
      console.error("Failed to remove allergen:", error);
    }
  };

  return (
    <AllergenContext.Provider value={{ allergens, addAllergen, removeAllergen, loading }}>
      {children}
    </AllergenContext.Provider>
  );
};

export const useAllergens = () => {
  const context = useContext(AllergenContext);
  if (context === undefined) {
    throw new Error('useAllergens must be used within an AllergenProvider');
  }
  return context;
};
