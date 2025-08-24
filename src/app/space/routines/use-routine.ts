import useSWR from 'swr';
import { httpClient } from '~/config/http-client';
import { HttpResponse } from '~/types/Response';
import type { SelectRoutine } from './schema';

export const useRoutineData = (routineId: string) => {
  const {
    data: routineResponse,
    error: routineError,
    isLoading: isLoadingRoutine
  } = useSWR<HttpResponse<SelectRoutine>>(
    routineId ? `routines/${routineId}` : null,
    async (url) => {
      const response = await httpClient.get<HttpResponse<SelectRoutine>>(url);
      return response.data;
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      errorRetryCount: 3
    }
  );

  const routine = routineResponse?.data || null;

  return {
    routine,
    routineError,
    isLoadingRoutine
  };
};
