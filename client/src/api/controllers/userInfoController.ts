import { MutationOptions, useMutation } from '@tanstack/react-query';

import { axiosClient } from '@/config/axios.config';
import type { QueryOptions } from '@/hooks/useQueryRequest';
import { useQueryRequest } from '@/hooks/useQueryRequest';

import { requestResponseHandler } from '../../config/requests.config';
import { Endpoints } from '../Endpoints';
import { User } from '../types/generic';
import { CreateUserRequest, VerifyUserRequest } from '../types/user';

const getAllUsers = async (): Promise<User[]> => {
  return requestResponseHandler<User[]>(() => axiosClient.get(`${Endpoints.user}`));
};

const getUserByUsername = async (username: string): Promise<User> => {
  return requestResponseHandler<User>(() => axiosClient.get(`${Endpoints.user}/${username}`));
};

const createNewUser = async (user: CreateUserRequest): Promise<User> => {
  return requestResponseHandler<User>(() => axiosClient.post(`${Endpoints.user}`, user));
};

const verifyUser = async (user: VerifyUserRequest): Promise<User> => {
  return requestResponseHandler<User>(() => axiosClient.put(`${Endpoints.user}/verify`, user));
};

const deleteUser = async (userId: number): Promise<void> => {
  return requestResponseHandler<void>(() => axiosClient.delete(`${Endpoints.user}/${userId}`));
};

export const useGetAllUsers = (options?: QueryOptions<User[]>) => {
  return useQueryRequest({
    func: getAllUsers,
    key: [Endpoints.user],
    options,
  });
};

export const useGetUserByUsername = (username: string, options?: QueryOptions<User>) => {
  return useQueryRequest({
    func: () => getUserByUsername(username),
    key: [`${Endpoints.user}/${username}`],
    options,
  });
};

export const useCreateNewUser = (options?: MutationOptions<User, Error, CreateUserRequest>) => {
  return useMutation({
    mutationFn: (user: CreateUserRequest) => createNewUser(user),
    ...options,
  });
};

export const useVerifyUser = (options?: MutationOptions<User, Error, VerifyUserRequest>) => {
  return useMutation({
    mutationFn: async (user: VerifyUserRequest) => {
      const response = await verifyUser(user);

      return response;
    },
    ...options,
  });
};

export const useDeleteUser = (options?: MutationOptions<void, Error, number>) => {
  return useMutation({
    mutationFn: (userId: number) => deleteUser(userId),
    ...options,
  });
};
