import { MutationOptions, QueryOptions, useMutation } from '@tanstack/react-query';

import { axiosClient } from '../../config/axios.config';
import { queryClient } from '../../config/queryclient.config';
import { requestResponseHandler } from '../../config/requests.config';
import { useQueryRequest } from '../../hooks/useQueryRequest';
import { Endpoints } from '../Endpoints';
import {
  AccessibleChannelsResponse,
  ChannelCreateRequest,
  ChannelMembersResponse,
  EditChannelRequest,
} from '../types/channels';

const getAccessibleChannels = async (userId: number): Promise<AccessibleChannelsResponse[]> => {
  return requestResponseHandler<AccessibleChannelsResponse[]>(() =>
    axiosClient.get(`${Endpoints.channel}/user/${userId}`),
  );
};

const getAllChannelMembers = async (channelId: number): Promise<ChannelMembersResponse[]> => {
  return requestResponseHandler<ChannelMembersResponse[]>(() =>
    axiosClient.get(`${Endpoints.channel}/${channelId}/members`),
  );
};

const createChannel = async (body: ChannelCreateRequest): Promise<void> => {
  return requestResponseHandler<void>(() => axiosClient.post(`${Endpoints.channel}/create`, body));
};

const editChannelName = async (channelId: number, body: EditChannelRequest): Promise<void> => {
  return requestResponseHandler<void>(() =>
    axiosClient.put(`${Endpoints.channel}/${channelId}/edit`, body),
  );
};

const deleteChannel = async (channelId: number): Promise<void> => {
  return requestResponseHandler<void>(() =>
    axiosClient.put(`${Endpoints.channel}/${channelId}/delete`),
  );
};

export const useGetAccessibleChannels = (
  userId: number,
  options?: QueryOptions<AccessibleChannelsResponse[]>,
) => {
  return useQueryRequest({
    func: () => getAccessibleChannels(userId),
    key: [Endpoints.channel, `${Endpoints.channel}/user/${userId}`],
    options: { ...options, enabled: Boolean(userId > 0) },
  });
};

export const useCreateChannel = (options?: MutationOptions<void, Error, ChannelCreateRequest>) => {
  return useMutation({
    mutationFn: (body: ChannelCreateRequest) => createChannel(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Endpoints.channel] });
    },
    ...options,
  });
};

export const useEditChannel = (
  options?: MutationOptions<void, Error, { channelId: number; body: EditChannelRequest }>,
) => {
  return useMutation({
    mutationFn: ({ channelId, body }: { channelId: number; body: EditChannelRequest }) =>
      editChannelName(channelId, body),
    onSuccess: (_, { channelId }) => {
      queryClient.invalidateQueries({ queryKey: [`${Endpoints.channel}/${channelId}`] });
      queryClient.invalidateQueries({ queryKey: [Endpoints.channel] });
    },
    ...options,
  });
};

export const useDeleteChannel = (options?: MutationOptions<void, Error, number>) => {
  return useMutation({
    mutationFn: (channelId: number) => deleteChannel(channelId),
    onSuccess: (_, channelId) => {
      queryClient.invalidateQueries({ queryKey: [Endpoints.channel] });
      queryClient.invalidateQueries({ queryKey: [`${Endpoints.channel}/${channelId}`] });
    },
    ...options,
  });
};
