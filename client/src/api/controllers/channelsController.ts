import { MutationOptions, QueryOptions, useMutation } from '@tanstack/react-query';

import { axiosClient } from '../../config/axios.config';
import { requestResponseHandler } from '../../config/requests.config';
import { useQueryRequest } from '../../hooks/useQueryRequest';
import { Endpoints } from '../Endpoints';
import {
  AccessibleChannelsResponse,
  ChannelCreateRequest,
  ChannelMembersResponse,
  EditChannelMembersRequest,
  EditChannelNameRequest,
} from '../types/channels';

const getAccessibleChannels = async (userId: string): Promise<AccessibleChannelsResponse[]> => {
  return requestResponseHandler<AccessibleChannelsResponse[]>(() =>
    axiosClient.get(`${Endpoints.channel}/user/${userId}`),
  );
};

const getAllChannelMembers = async (channelId: string): Promise<ChannelMembersResponse[]> => {
  return requestResponseHandler<ChannelMembersResponse[]>(() =>
    axiosClient.get(`${Endpoints.channel}/${channelId}/members`),
  );
};

const createChannel = async (body: ChannelCreateRequest): Promise<void> => {
  return requestResponseHandler<void>(() => axiosClient.post(`${Endpoints.channel}/create`, body));
};

const editChannelName = async (channelId: string, body: EditChannelNameRequest): Promise<void> => {
  return requestResponseHandler<void>(() =>
    axiosClient.put(`${Endpoints.channel}/${channelId}/edit`, body),
  );
};

const editChannelMembers = async (
  channelId: string,
  body: EditChannelMembersRequest,
): Promise<void> => {
  return requestResponseHandler<void>(() =>
    axiosClient.put(`${Endpoints.channel}/${channelId}/edit/members`, body),
  );
};

const deleteChannel = async (channelId: string): Promise<void> => {
  return requestResponseHandler<void>(() =>
    axiosClient.put(`${Endpoints.channel}/${channelId}/delete`),
  );
};

export const useGetAccessibleChannels = (
  userId: string,
  options?: QueryOptions<AccessibleChannelsResponse[]>,
) => {
  return useQueryRequest({
    func: () => getAccessibleChannels(userId),
    key: [`${Endpoints.channel}/user/${userId}`],
    options,
  });
};

export const useGetAllChannelMembers = (
  channelId: string,
  options?: QueryOptions<ChannelMembersResponse[]>,
) => {
  return useQueryRequest({
    func: () => getAllChannelMembers(channelId),
    key: [`${Endpoints.channel}/${channelId}/members`],
    options,
  });
};

export const useCreateChannel = (options?: MutationOptions<void, Error, ChannelCreateRequest>) => {
  return useMutation({
    mutationFn: (body: ChannelCreateRequest) => createChannel(body),
    ...options,
  });
};

export const useEditChannelName = (
  options?: MutationOptions<void, Error, { channelId: string; body: EditChannelNameRequest }>,
) => {
  return useMutation({
    mutationFn: ({ channelId, body }: { channelId: string; body: EditChannelNameRequest }) =>
      editChannelName(channelId, body),
    ...options,
  });
};

export const useEditChannelMembers = (
  options?: MutationOptions<void, Error, { channelId: string; body: EditChannelMembersRequest }>,
) => {
  return useMutation({
    mutationFn: ({ channelId, body }: { channelId: string; body: EditChannelMembersRequest }) =>
      editChannelMembers(channelId, body),
    ...options,
  });
};

export const useDeleteChannel = (options?: MutationOptions<void, Error, string>) => {
  return useMutation({
    mutationFn: (channelId: string) => deleteChannel(channelId),
    ...options,
  });
};
