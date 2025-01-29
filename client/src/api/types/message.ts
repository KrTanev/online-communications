import { BaseEntity, User } from './generic';

export type Message = BaseEntity & {
  sender: User;
  recipientId?: number;
  recipientChannel?: number;
  message: string;
  isDeleted?: boolean;
};

export type MessageCreateRequest = {
  senderId: number;
  message: string;
  recipientId?: number;
  channelId?: number;
};
