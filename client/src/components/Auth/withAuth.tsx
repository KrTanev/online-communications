import type { ReactElement, ReactNode } from 'react';
import { useEffect, useState } from 'react';

import { LinearProgress } from '@mui/material';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { useAuthorization } from '../../providers/AuthorizationProvider';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export const withAuth = <P extends object>(Component: NextPageWithLayout): React.FC<P> => {
  const getLayout = Component.getLayout ?? ((page) => page);

  const Authenticated: React.FC<P> = (props) => {
    const router = useRouter();
    const { authUser } = useAuthorization();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const userSession = sessionStorage.getItem('loggedUserObject');
      const loggedUserName = userSession ? JSON.parse(userSession) : undefined;

      const unsubscribe = () => {
        if (!authUser && !loggedUserName) {
          router.push('/login');
        }
        setLoading(false);
      };

      return () => unsubscribe();
    }, [router]);

    if (loading) {
      return <LinearProgress color="success" />;
    }

    return getLayout(<Component {...props} />) as any;
  };

  return Authenticated;
};
