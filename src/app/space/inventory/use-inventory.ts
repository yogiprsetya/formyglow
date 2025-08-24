import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import useSWR from 'swr';
import type { SelectInventory, AddProductFormData } from './schema';
import { httpClient } from '~/config/http-client';
import { HttpResponse } from '~/types/Response';
import { errorHandler } from '~/utils/error-handler';
import { useDebouncedCallback } from 'use-debounce';

type Options = {
  disabled?: boolean;
};

export const useInventory = (opt?: Options) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [keyword, setSearchKeyword] = useState('');
  const [sort, setSort] = useState<'expiryDate' | 'createdAt' | 'purchaseDate'>('createdAt');
  const [page, setPage] = useState(1);

  const params = new URLSearchParams({
    keyword,
    limit: '10',
    sort: sort,
    page: page.toString()
  });

  const { data, isLoading, mutate } = useSWR<HttpResponse<SelectInventory[]>>(
    opt?.disabled ? null : `inventory?${params.toString()}`
  );

  const addProduct = useCallback(async (data: AddProductFormData) => {
    setIsSubmitting(true);

    return httpClient
      .post<HttpResponse<SelectInventory>>('inventory', data)
      .then((res) => {
        if (!res.data.success) {
          toast.error(`Error! status: ${res.status}`);
          return { success: false };
        }

        if (res.data.success) {
          toast.success('Produk berhasil ditambahkan ke inventory!');
          return { success: true };
        }

        toast.error('Gagal menambahkan produk');
        return { success: false };
      })
      .catch(errorHandler)
      .finally(() => setIsSubmitting(false));
  }, []);

  const updateProduct = useCallback(
    async (id: string, data: AddProductFormData) => {
      setIsSubmitting(true);

      return httpClient
        .put<HttpResponse<SelectInventory>>(`inventory/${id}`, data)
        .then((res) => {
          if (!res.data.success) {
            toast.error(`Error! status: ${res.status}`);
            return { success: false };
          }

          if (res.data.success) {
            toast.success('Produk berhasil diperbarui!');
            mutate();
            return { success: true };
          }

          toast.error('Gagal memperbarui produk');
          return { success: false };
        })
        .catch(errorHandler)
        .finally(() => setIsSubmitting(false));
    },
    [mutate]
  );

  const deleteProduct = useCallback(
    async (id: string) => {
      setIsSubmitting(true);

      return httpClient
        .delete<HttpResponse<SelectInventory>>(`inventory/${id}`)
        .then((res) => {
          if (!res.data.success) {
            toast.error(`Error! status: ${res.status}`);
            return { success: false };
          }

          if (res.data.success) {
            toast.success('Produk berhasil dihapus dari inventory!');
            mutate();
            return { success: true };
          }

          toast.error('Gagal menghapus produk');
          return { success: false };
        })
        .catch(errorHandler)
        .finally(() => setIsSubmitting(false));
    },
    [mutate]
  );

  return {
    addProduct,
    updateProduct,
    deleteProduct,
    isSubmitting,
    keyword,
    setSearchKeyword: useDebouncedCallback((q: string) => setSearchKeyword(q), 500),
    setSort,
    setPage,
    data,
    isLoading,
    mutate
  };
};
