import { ProductDetail } from '../types';
import useFetch from './useFetch';

export default function useFetchProduct({ productId }: {
  productId: string;
}) {
  const {
    data, error, loading, mutate,
  } = useFetch<ProductDetail>(`/products/${productId}`);

  return {
    product: data,
    error,
    loading,
    async refresh() {
      mutate();
    },
  };
}
