import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    tertiary?: Palette['primary'];
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#34d399' // Navbar and buttons color
    },
    secondary: {
      main: '#F27121' // Accent color (links, spinners, highlights)
    },
    tertiary: {
      main: '#A78BFA'
    },
    background: {
      default: '#0f2027',
      paper: '#2c5364'
    },
    text: {
      primary: '#ffffff',
      secondary: '#d1d5db'
    }
  },
  typography: {
    fontFamily: 'Inter, Roboto, Arial, sans-serif'
  }
});

export default theme;
