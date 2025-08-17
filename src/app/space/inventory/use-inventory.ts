import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { SelectProductFormData, type AddProductFormData } from './schema';
import { httpClient } from '~/config/http-client';
import { HttpResponse } from '~/types/Response';
import { errorHandler } from '~/utils/error-handler';

export const useInventory = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addProduct = useCallback(async (data: AddProductFormData) => {
    setIsSubmitting(true);

    return httpClient
      .post<HttpResponse<SelectProductFormData>>('inventory', data)
      .then((res) => {
        if (!res.data.success) {
          toast.error(`Error! status: ${res.status}`);
          return { success: false };
        }

        if (res.data.success) {
          toast.success('Produk berhasil ditambahkan ke inventory!');
          return { success: false };
        }

        toast.error('Gagal menambahkan produk');
        return { success: false };
      })
      .catch(errorHandler)
      .finally(() => setIsSubmitting(false));
  }, []);

  return {
    addProduct,
    isSubmitting
  };
};
