import type { Dispatch, SetStateAction } from 'react';
import { type ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';

import { useGetUserByUsername } from '../api/controllers/userInfoController';
import { User } from '../api/types/generic';
import { getSessionUser } from '../utils/authHelper';

type AuthorizationProviderProps = {
  children: ReactNode;
};

type AuthorizationProviderContextType = {
  authUser?: User;
  setAuthUser: Dispatch<SetStateAction<User | undefined>>;
};

const initialValue: AuthorizationProviderContextType = {
  authUser: undefined,
  setAuthUser: () => null,
};

const AuthorizationContext = createContext(initialValue);

export const AuthorizationProvider = (props: AuthorizationProviderProps) => {
  const { children } = props;

  const [authUser, setAuthUser] = useState<User>();

  let username = '';

  if (typeof window !== 'undefined') {
    username = getSessionUser()?.username || '';
  }

  const { data } = useGetUserByUsername(username);

  useEffect(() => {
    setAuthUser(data);
  }, [data]);

  const value = useMemo(() => ({ authUser, setAuthUser }), [authUser, setAuthUser]);

  return <AuthorizationContext.Provider value={value}>{children}</AuthorizationContext.Provider>;
};

export const useAuthorization = () => {
  return useContext(AuthorizationContext);
};
