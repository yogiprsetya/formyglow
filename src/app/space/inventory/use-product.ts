import useSWR from 'swr';
import { HttpResponse } from '~/types/Response';
import type { SelectInventory } from './schema';

export const useProduct = (id: string | null) => {
  const { data, error, isLoading, mutate } = useSWR<HttpResponse<SelectInventory>>(
    id ? `inventory/${id}` : null
  );

  return {
    product: data?.data || null,
    isLoading,
    error,
    mutate
  };
};
