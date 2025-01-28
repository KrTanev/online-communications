import { BaseEntity } from './generic';

type Channel = BaseEntity & {
  channelId: number;
  channelName: string;
  ownerId: number;
  memberIds: number[];
};

export type ChannelCreateRequest = {
  name: string;
  ownerId: number;
  memberIds: number[];
};

export type EditChannelRequest = {
  name: string;
  memberIds: number[];
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
