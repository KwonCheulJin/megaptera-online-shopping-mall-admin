import { ProductSummary } from '../types';
import useFetch from './useFetch';

export default function useFetchProducts() {
  const {
    data, error, loading, mutate,
  } = useFetch<{
    products: ProductSummary[];
  }>('/products');

  return {
    products: data?.products ?? [],
    error,
    loading,
    async refresh() {
      mutate();
    },
  };
}
