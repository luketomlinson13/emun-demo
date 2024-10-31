// theme.ts
import { createTheme, ThemeOptions, Theme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

const lightPalette: ThemeOptions['palette'] = {
  mode: 'light',
  primary: { main: '#1976d2' },
  secondary: { main: '#F7F7F7' },
};

const darkPalette: ThemeOptions['palette'] = {
  mode: 'dark',
  primary: { main: '#90caf9' },
  secondary: { main: '#1f1f1f' },
};

const componentOverrides: ThemeOptions['components'] = {
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        borderRadius: 8,
      },
    },
  },
  MuiTableContainer: {
    styleOverrides: {
      root: {
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.4)',
        borderRadius: '1rem',
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      head: ({ theme }: { theme: Theme }) => ({
        backgroundColor: theme.palette.secondary.dark,
        whiteSpace: 'nowrap',
        fontWeight: 'bold',
      }),
      body: {
        whiteSpace: 'nowrap',
      },
    },
  },
  MuiTableRow: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }) => ({
        '&:nth-of-type(even)': {
          backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }),
    },
  },
};

export const getTheme = (mode: PaletteMode) =>
  createTheme({
    palette: mode === 'light' ? lightPalette : darkPalette,
    components: componentOverrides,
  });
