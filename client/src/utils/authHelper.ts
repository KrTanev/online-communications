import { User } from '../api/types/generic';

export const getSessionUser = (): User | undefined => {
  const userSession = sessionStorage.getItem('loggedUserObject');
  const loggedUserName = userSession ? (JSON.parse(userSession) as User) : undefined;

  return loggedUserName;
};
