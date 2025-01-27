import { BaseEntity } from './generic';

type Channel = BaseEntity & {
  name: string;
  ownerId: number;
};

export type ChannelCreateRequest = {
  name: string;
  ownerId: number;
};

export type EditChannelNameRequest = {
  name: string;
};

export type EditChannelMembersRequest = {
  userIds: number[];
};

export type AccessibleChannelsResponse = Channel & {
  memberIds: number[];
};

export type ChannelMembersResponse = {
  channelId: number;
  member: MemberResponse;
  addedBy: MemberResponse;
  joinedAt: string;
  isDeleted: boolean;
};

export type MemberResponse = {
  id: number;
  username: string;
};
