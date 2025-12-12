import React, { createContext, useState, useContext, useEffect } from 'react';
import { db } from '@/firebaseConfig';
import { doc, getDocs, collection, writeBatch, deleteDoc } from 'firebase/firestore'; // Import deleteDoc
import { useAuth } from './AuthContext';
import { AllergenContextType } from '@/types/types';

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

    const globalAllergenRef = doc(db, 'allergens', newAllergen);
    batch.set(globalAllergenRef, { name: newAllergen }, { merge: true });

    const userAllergenRef = doc(db, 'userAllergens', user.uid, 'selected', newAllergen);
    batch.set(userAllergenRef, {});

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
      await deleteDoc(userAllergenRef);
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
