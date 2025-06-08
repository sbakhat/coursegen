import { createTheme } from '@mui/material/styles';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: { main: '#7C4DFF' },
          secondary: { main: '#00E5FF' },
          background: {
            default: '#f5f7fa',
            paper: '#fff',
          },
          text: {
            primary: '#222',
            secondary: '#555',
          },
        }
      : {
          primary: { main: '#7C4DFF' },
          secondary: { main: '#00E5FF' },
          background: {
            default: '#181A20',
            paper: '#23272F',
          },
          text: {
            primary: '#fff',
            secondary: '#b0b3b8',
          },
        }),
  },
  typography: {
    fontFamily: 'Poppins, Roboto, Arial, sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 18,
        },
      },
    },
  },
});

const getTheme = (mode) => createTheme(getDesignTokens(mode));

export default getTheme; 