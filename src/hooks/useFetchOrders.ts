import useFetch from './useFetch';

import { OrderSummary } from '../types';

export default function useFetchCategories() {
  const {
    data, error, loading,
  } = useFetch<{
    orders: OrderSummary[];
  }>('/orders');

  return {
    orders: data?.orders ?? [],
    error,
    loading,
  };
}
