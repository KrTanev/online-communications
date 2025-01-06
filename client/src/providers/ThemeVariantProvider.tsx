import type { Dispatch, SetStateAction } from 'react';
import { type ReactNode, createContext, useContext, useMemo, useState } from 'react';

import { ThemeProvider } from '@emotion/react';

import { themeConfigDark, themeConfigLight } from '../styles/theme/themeConfig';

type ThemeVariantProviderProps = {
  children: ReactNode;
};

type ThemeVariantProviderContextType = {
  isLightMode: boolean;
  setIsLightMode: Dispatch<SetStateAction<boolean>>;
};

const initialValue: ThemeVariantProviderContextType = {
  isLightMode: true,
  setIsLightMode: () => null,
};

const ThemeVariantContext = createContext(initialValue);

export const ThemeVariantProvider = (props: ThemeVariantProviderProps) => {
  const { children } = props;

  const [isLightMode, setIsLightMode] = useState(true);

  const value = useMemo(() => ({ isLightMode, setIsLightMode }), [isLightMode, setIsLightMode]);

  return <ThemeVariantContext.Provider value={value}>{children}</ThemeVariantContext.Provider>;
};

export const useThemeVariant = () => {
  return useContext(ThemeVariantContext);
};

export const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
  const { isLightMode } = useThemeVariant();
  const theme = isLightMode ? themeConfigLight : themeConfigDark;

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
