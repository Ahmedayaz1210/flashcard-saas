import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3a8ff2', // The bright blue color used in the UI
    },
    background: {
      default: 'linear-gradient(to bottom, #001f3f, #000000)',
      paper: 'rgba(10, 25, 41, 0.7)',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: 'linear-gradient(to bottom, #001f3f, #000000)',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
        },
      },
    },
  },
});

export default darkTheme;