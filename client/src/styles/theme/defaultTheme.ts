import { Manrope } from 'next/font/google';

export const manrope = Manrope({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

let rootElement;

if (typeof window !== 'undefined') {
  rootElement = document.getElementById('__next');
}

export const lightTheme = {
  mode: 'light',
  palette: {
    common: {
      black: '#000',
      white: '#fff',
    },
    background: {
      palette: '#fff',
      default: '#fff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
    primary: {
      main: '#43a047',
      light: '#68B36B',
      dark: '#2E7031',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ffca28',
      light: '#FFD453',
      dark: '#B28D1C',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    error: {
      main: '#D32F2F',
      light: '#EF5350',
      dark: '#C62828',
      contrastText: '#fff',
    },
    warning: {
      main: '#ED6C02',
      light: '#FF9800',
      dark: '#E65100',
      contrastText: '#fff',
    },
    info: {
      main: '#0288D1',
      light: '#03A9F4',
      dark: '#01579B',
      contrastText: '#fff',
    },
    success: {
      main: '#2E7D32',
      light: '#4CAF50',
      dark: '#1B5E20',
      contrastText: '#fff',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
  },
};

export const darkTheme = {
  mode: 'dark',
  palette: {
    common: {
      black: '#000',
      white: '#fff',
    },
    background: {
      palette: '#121212',
      default: '#121212',
    },
    text: {
      primary: '#fff',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
    primary: {
      main: '#2E7031',
      light: '#1B5E20',
      dark: '#0D3D10',
      contrastText: '#fff',
    },
    secondary: {
      main: '#B28D1C',
      light: '#8C6E15',
      dark: '#5A460E',
      contrastText: 'rgba(255, 255, 255, 0.87)',
    },
    error: {
      main: '#F44336',
      light: '#E57373',
      dark: '#D32F2F',
      contrastText: '#fff',
    },
    warning: {
      main: '#FFA726',
      light: '#FFB74D',
      dark: '#F57C00',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    info: {
      main: '#29B6F6',
      light: '#4FC3F7',
      dark: '#0288D1',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    success: {
      main: '#66BB6A',
      light: '#81C784',
      dark: '#388E3C',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
  },
};

export const defaultTheme = {
  palette: {
    primary: {
      main: '#43a047',
      light: '#68B36B',
      dark: '#2E7031',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ffca28',
      light: '#FFD453',
      dark: '#B28D1C',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
  },
};

export const defaultThemeOptions = {
  components: {
    MuiPopover: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiPopper: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },

    MuiDataGrid: {
      styleOverrides: {
        root: {
          '& .MuiDataGrid-columnHeaderTitle': {
            color: 'grey',
            fontSize: 14,
            font: 'Manrope',
          },
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: 'gray',
            borderColor: 'black',
            borderLeft: 1,
            borderRight: 1,
            ':hover': {
              cursor: 'default',
            },
          },
          '& .MuiDataGrid-row': {
            ':hover': {
              cursor: 'default',
            },
          },
          '& .MuiDataGrid-cell': {
            color: 'grey',
            font: 'Manrope',
          },
          '& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
          '& .MuiDataGrid-columnHeader:focus': {
            outline: 'none',
          },
          '& .MuiDataGrid-columnSeparator': {
            display: 'none',
          },
          '& .MuiDataGrid-withBorderColor': {
            borderColor: 'grey',
          },
          '& .MuiDataGrid-columnHeader:focus-within': {
            outline: 'none',
          },
          '& .MuiDataGrid-virtualScroller::-webkit-scrollbar': {
            display: 'none',
          },
        },
      },
    },
  },
  palette: defaultTheme.palette,
  typography: {
    fontFamily: manrope.style.fontFamily,
    fontLora: manrope.style.fontFamily,
    button: {
      textTransform: 'none' as const,
    },
  },
};
