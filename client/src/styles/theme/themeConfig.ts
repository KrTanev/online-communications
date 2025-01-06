import { createTheme } from '@mui/material';

import { darkTheme, defaultThemeOptions, lightTheme } from './defaultTheme';

export const themeConfigLight = createTheme({
  palette: lightTheme.palette,
  typography: defaultThemeOptions.typography,
  components: defaultThemeOptions.components,
});

export const themeConfigDark = createTheme({
  palette: darkTheme.palette,
  typography: defaultThemeOptions.typography,
  components: defaultThemeOptions.components,
});
