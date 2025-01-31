export type CreateUserRequest = {
  username: string;
  email: string;
  password: string;
};

export type VerifyUserRequest = {
  email: string;
  password: string;
};
