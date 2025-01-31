import { MutationOptions, QueryOptions, useMutation } from '@tanstack/react-query';

import { axiosClient } from '../../config/axios.config';
import { queryClient } from '../../config/queryclient.config';
import { requestResponseHandler } from '../../config/requests.config';
import { useQueryRequest } from '../../hooks/useQueryRequest';
import { Endpoints } from '../Endpoints';
import { FriendsResponse } from '../types/friends';

const getAllFriendsForUser = async (userId: number): Promise<FriendsResponse[]> => {
  return requestResponseHandler<FriendsResponse[]>(() =>
    axiosClient.get(`${Endpoints.friends}/forUser/${userId}`),
  );
};

const addFriend = async (userId: number, friendId: number): Promise<void> => {
  return requestResponseHandler<void>(() =>
    axiosClient.post(`${Endpoints.friends}/addFriend/${userId}/${friendId}`),
  );
};

const deleteFriend = async (userId: number, friendId: number): Promise<void> => {
  return requestResponseHandler<void>(() =>
    axiosClient.put(`${Endpoints.friends}/deleteFriend/${userId}/${friendId}`),
  );
};

export const useGetAllFriendsForUser = (
  userId: number,
  options?: QueryOptions<FriendsResponse[]>,
) => {
  return useQueryRequest({
    func: () => getAllFriendsForUser(userId),
    key: [Endpoints.friends, `${Endpoints.friends}/forUser/${userId}`],
    options: { ...options, enabled: userId > 0 },
  });
};

export const useAddFriend = (
  options?: MutationOptions<void, Error, { userId: number; friendId: number }>,
) => {
  return useMutation({
    mutationFn: ({ userId, friendId }: { userId: number; friendId: number }) =>
      addFriend(userId, friendId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Endpoints.friends] });
    },
    ...options,
  });
};

export const useDeleteFriend = (
  options?: MutationOptions<void, Error, { userId: number; friendId: number }>,
) => {
  return useMutation({
    mutationFn: ({ userId, friendId }: { userId: number; friendId: number }) =>
      deleteFriend(userId, friendId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Endpoints.friends] });
    },
    ...options,
  });
};
