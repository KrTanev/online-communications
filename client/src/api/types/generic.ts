export type BaseEntity = {
  id: number;
  createdAt?: string;
  updatedAt?: string;
};

export type User = BaseEntity & {
  username: string;
  email: string;
  password?: string;
};
