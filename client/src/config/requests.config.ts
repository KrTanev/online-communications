import type { AxiosError, AxiosResponse } from 'axios';

import type { Endpoints } from '@/api/Endpoints';
import { showNotification } from '@/config/notification.config';

export const generateQueryKey = (baseKey: keyof typeof Endpoints, ...ids: string[]): string[] => {
  const key = [baseKey, ...ids];

  return key;
};

export const requestResponseHandler = async <T>(
  getRequestFunction: () => Promise<AxiosResponse<T>>,
  hideNotification?: boolean,
  customErrorMessage?: string,
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await getRequestFunction();
    return response.data;
  } catch (error) {
    if (!hideNotification) {
      const errorResponse = error as AxiosError;
      const errorMessage =
        customErrorMessage ?? errorResponse.response?.data ?? (error as Error)?.message;

      showNotification('error', `Error getting the data: ${errorMessage}`);
    }
    return Promise.reject();
  }
};
