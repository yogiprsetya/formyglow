import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import useSWR, { mutate } from 'swr';
import type { SelectRoutine, CreateRoutineFormData, CreateRoutineItem } from './schema';
import { HttpResponse } from '~/types/Response';
import { useDebouncedCallback } from 'use-debounce';
import { httpClient } from '~/config/http-client';
import { errorHandler } from '~/utils/error-handler';

interface CreateRoutinePayload {
  name: string;
  type: CreateRoutineFormData['type'];
  description?: string;
  isActive: boolean;
  items: Array<{
    inventoryId: string;
    order: number;
    frequency: CreateRoutineItem['frequency'];
    repeatOn: CreateRoutineItem['repeatOn'];
    notes?: string;
  }>;
}

type Options = {
  disabled?: boolean;
};

export const useRoutines = (opt?: Options) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [keyword, setSearchKeyword] = useState('');
  const [routineTypes, setRoutineTypes] = useState<CreateRoutineFormData['type'] | 'all'>('all');
  const [page, setPage] = useState(1);
  // const [isActive, setIsActive] = useState(false);

  const router = useRouter();

  const params = new URLSearchParams({
    keyword,
    limit: '10',
    type: routineTypes,
    // isActive: isActive.toString(),
    page: page.toString()
  });

  const { data, isLoading } = useSWR<HttpResponse<SelectRoutine[]>>(
    opt?.disabled ? null : `routines?${params.toString()}`,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      errorRetryCount: 3
    }
  );

  const routines = data?.data || [];
  const meta = data?.meta;

  const createRoutine = async (data: CreateRoutineFormData) => {
    setIsSubmitting(true);

    const payload: CreateRoutinePayload = {
      name: data.name,
      type: data.type,
      description: data.description,
      isActive: data.isActive,
      items: data.items.map((item) => ({
        inventoryId: item.product.id,
        order: item.order,
        frequency: item.frequency,
        repeatOn: item.frequency === 'weekly' ? item.repeatOn : undefined,
        notes: item.notes
      }))
    };

    return httpClient
      .post<HttpResponse<SelectRoutine>>('routines', payload)
      .then((res) => {
        if (!res.data.success) {
          toast.error(`Error! status: ${res.status}`);
          return { success: false };
        }

        if (res.data.success) {
          toast.success('Routine berhasil dibuat!');
          mutate('routines');
          router.push('/space/routines');
          return { success: true };
        }

        toast.error('Failed to create routine');
        return { success: false };
      })
      .catch(errorHandler)
      .finally(() => setIsSubmitting(false));
  };

  const updateRoutine = async (id: string, data: CreateRoutineFormData) => {
    setIsSubmitting(true);

    const payload: CreateRoutinePayload = {
      name: data.name,
      type: data.type,
      description: data.description,
      isActive: data.isActive,
      items: data.items.map((item) => ({
        inventoryId: item.product.id,
        order: item.order,
        frequency: item.frequency,
        repeatOn: item.frequency === 'weekly' ? item.repeatOn : undefined,
        notes: item.notes
      }))
    };

    return httpClient
      .put<HttpResponse<SelectRoutine>>(`routines/${id}`, payload)
      .then((res) => {
        if (!res.data.success) {
          toast.error(`Error! status: ${res.status}`);
          return { success: false };
        }

        if (res.data.success) {
          toast.success('Routine berhasil diperbarui!');
          mutate('routines');
          router.push('/space/routines');
          return { success: true };
        }

        toast.error('Failed to update routine');
        return { success: false };
      })
      .catch(errorHandler)
      .finally(() => setIsSubmitting(false));
  };

  const deleteRoutine = async (id: string) => {
    setIsSubmitting(true);

    return httpClient
      .delete<HttpResponse<void>>(`routines/${id}`)
      .then((res) => {
        if (!res.data.success) {
          toast.error(`Error! status: ${res.status}`);
          return { success: false };
        }

        if (res.data.success) {
          toast.success('Routine berhasil dihapus!');
          mutate('routines');
          return { success: true };
        }

        toast.error('Failed to delete routine');
        return { success: false };
      })
      .catch(errorHandler)
      .finally(() => setIsSubmitting(false));
  };

  const debouncedSearch = useDebouncedCallback(
    (q: string) => {
      setSearchKeyword(q);
      setPage(1);
    },
    500,
    { leading: false, trailing: true } // Optional: config debounce behavior
  );

  return {
    routines,
    meta,
    isLoading,
    isSubmitting,
    createRoutine,
    updateRoutine,
    deleteRoutine,
    setSearchKeyword: debouncedSearch,
    setRoutineTypes,
    setPage
  };
};
