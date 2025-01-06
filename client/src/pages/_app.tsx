import type { ReactElement, ReactNode } from 'react';

import { StyledEngineProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClientProvider } from '@tanstack/react-query';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { queryClient } from '@/config/queryclient.config';
import { CustomThemeProvider, ThemeVariantProvider } from '@/providers/ThemeVariantProvider';
import '@/styles/globals.css';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export interface MyAppProps extends AppProps {
  Component: NextPageWithLayout;
}

const MyApp = ({ Component, pageProps }: MyAppProps) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          {/* <link rel="icon" href="/favicon.png" sizes="any" /> */}
          <title>FE</title>
        </Head>

        <ThemeVariantProvider>
          <CustomThemeProvider>
            <CssBaseline />

            {getLayout(<Component {...pageProps} />)}
          </CustomThemeProvider>
        </ThemeVariantProvider>
      </StyledEngineProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
