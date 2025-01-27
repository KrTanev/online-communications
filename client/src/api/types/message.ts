import { BaseEntity } from './generic';

export type Message = BaseEntity & {
  senderId: number;
  recipientId?: number;
  channelId?: number;
  content: string;
  isDeleted?: boolean;
};

export type MessageCreateRequest = {
  senderId: number;
  content: string;
  recipientId?: number;
  channelId?: number;
};
