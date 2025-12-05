import { User } from 'firebase/auth';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
}

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export interface Product {
  _id: string;
  product_name: string;
  image_url?: string;
  brands?: string;
  quantity?: string;
  countries?: string;
  manufacturing_places?: string;
  nutrition_grade_fr?: string;
  ingredients_text?: string;
  allergens_from_ingredients?: string;
}

export interface SafeListContextType {
  safeList: Product[];
  addToSafeList: (product: Product) => Promise<void>;
  isProductInSafeList: (productId: string) => boolean;
  removeFromSafeList: (productId: string) => Promise<void>;
  loading: boolean;
}
