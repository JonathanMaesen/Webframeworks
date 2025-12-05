import { useState } from 'react';
import { Product } from '@/types/types';
import { API_URL } from '@/config';

export function useBarcodeSearch() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (barcode: string) => {
    setLoading(true);
    setError(null);
    setProduct(null);

    try {
      const response = await fetch(`${API_URL}/${barcode}.json`);
      const data = await response.json();

      if (data.status === 1 && data.product) {
        const fetchedProduct = data.product;
        const productWithId: Product = {
          _id: fetchedProduct.id || fetchedProduct._id,
          product_name: fetchedProduct.product_name || 'Unknown Product',
          image_url: fetchedProduct.image_url || fetchedProduct.image_front_url,
          brands: fetchedProduct.brands,
          quantity: fetchedProduct.quantity,
          countries: fetchedProduct.countries,
          manufacturing_places: fetchedProduct.manufacturing_places,
          nutrition_grade_fr: fetchedProduct.nutrition_grade_fr,
          ingredients_text: fetchedProduct.ingredients_text,
          allergens_from_ingredients: fetchedProduct.allergens_from_ingredients
        };
        setProduct(productWithId);
      } else {
        setError(data.status_verbose || 'Product not found');
      }
    } catch (e) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return { product, loading, error, search };
}
