import { useState } from 'react';
import { Product } from '@/context/SafeListContext';
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

      if (data.status === 1) {
        setProduct(data.product);
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
