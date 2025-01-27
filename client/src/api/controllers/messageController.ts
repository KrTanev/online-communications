import { MutationOptions, useMutation } from '@tanstack/react-query';

import { axiosClient } from '../../config/axios.config';
import { requestResponseHandler } from '../../config/requests.config';
import { QueryOptions, useQueryRequest } from '../../hooks/useQueryRequest';
import { Endpoints } from '../Endpoints';
import { Message, MessageCreateRequest } from '../types/message';

type MessageFriendsRequest = {
  recipientId: number;
  senderId: number;
  message: string;
};
const getAllMessagesForChannel = async (channelId: number): Promise<Message[]> => {
  return requestResponseHandler<Message[]>(() =>
    axiosClient.get(`${Endpoints.message}/channel/${channelId}`),
  );
};

const getAllMessagesBetweenUsers = async (
  recipientId: number,
  senderId: number,
): Promise<Message[]> => {
  return requestResponseHandler<Message[]>(() =>
    axiosClient.get(`${Endpoints.message}/user/${recipientId}/${senderId}`),
  );
};

const addMessageBetweenUsers = async (body: MessageFriendsRequest): Promise<void> => {
  return requestResponseHandler<void>(() =>
    axiosClient.post(`${Endpoints.message}/users/create`, body),
  );
};

const softDeleteMessage = async (messageId: number): Promise<void> => {
  return requestResponseHandler<void>(() =>
    axiosClient.put(`${Endpoints.message}/delete/${messageId}`),
  );
};

const addMessageInChannel = async (body: MessageCreateRequest): Promise<void> => {
  return requestResponseHandler<void>(() =>
    axiosClient.post(`${Endpoints.message}/channel/create`, body),
  );
};

export const useGetAllMessagesForChannel = (
  channelId: number,
  options?: QueryOptions<Message[]>,
) => {
  return useQueryRequest({
    func: () => getAllMessagesForChannel(channelId),
    key: [`${Endpoints.message}/channel/${channelId}`],
    options,
  });
};

export const useGetAllMessagesBetweenUsers = (
  recipientId: number,
  senderId: number,
  options?: QueryOptions<Message[]>,
) => {
  return useQueryRequest({
    func: () => getAllMessagesBetweenUsers(recipientId, senderId),
    key: [`${Endpoints.message}/user/${recipientId}/${senderId}`],
    options,
  });
};

export const useAddMessageBetweenUsers = (
  options?: MutationOptions<void, Error, MessageFriendsRequest>,
) => {
  return useMutation({
    mutationFn: (body: MessageFriendsRequest) => addMessageBetweenUsers(body),
    ...options,
  });
};

export const useSoftDeleteMessage = (options?: MutationOptions<void, Error, number>) => {
  return useMutation({
    mutationFn: (messageId: number) => softDeleteMessage(messageId),
    ...options,
  });
};

export const useAddMessageInChannel = (
  options?: MutationOptions<void, Error, MessageCreateRequest>,
) => {
  return useMutation({
    mutationFn: (body: MessageCreateRequest) => addMessageInChannel(body),
    ...options,
  });
};
