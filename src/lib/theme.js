import { createMuiTheme } from '@material-ui/core/styles';

const textBlack = { main: '#162C29' };
const white = { main: '#fffff' };

// A custom theme for this app
const theme = createMuiTheme({
  spacing: (factor) => `${0.8 * factor}rem`,
  typography: {
    htmlFontSize: 10, // Paired with the html 62.5% font-size specified in withMaterialUI
    h1: {
      fontFamily:
        '-apple-system, system-ui, "San Francisco", "Helvetica Neue", Arial, sans-serif;',
      fontSize: '8rem',
      fontWeight: '600',
    },
    h2: {
      fontFamily:
        '-apple-system, system-ui, "San Francisco", "Helvetica Neue", Arial, sans-serif;',
      fontWeight: '600',
      fontSize: '4rem',
    },
    h3: {
      fontFamily:
        '-apple-system, system-ui, "San Francisco", "Helvetica Neue", Arial, sans-serif;',
      fontSize: '3rem',
    },
    h4: {
      fontFamily:
        '-apple-system, system-ui, "San Francisco", "Helvetica Neue", Arial, sans-serif;',
      fontSize: '2.5rem',
      fontWeight: 'bold',
    },
    h6: {
      fontFamily:
        '-apple-system, system-ui, "San Francisco", "Helvetica Neue", Arial, sans-serif;',
      fontSize: '2rem',
      fontWeight: 'bold',
      color: textBlack.main,
    },
    body1: {
      fontFamily:
        '-apple-system, system-ui, "San Francisco", "Helvetica Neue", Arial, sans-serif;',
      fontSize: '1.6rem',
      lineHeight: '2.8rem',
    },
    button: {
      fontFamily:
        '-apple-system, system-ui, "San Francisco", "Helvetica Neue", Arial, sans-serif;',
      fontSize: '1.6rem',
      lineHeight: '2.1rem',
      textTransform: 'none',
      fontWeight: 600,
    },
    a: {
      color: '#8357DF',
      transition: '0.25s ease',
      '&:hover': {
        color: '#356AD2',
        transition: '0.25s ease',
      },
    },
  },
  palette: {
    primary: {
      ...textBlack,
    },
    background: {
      default: white.main,
    },
    text: {
      primary: textBlack.main,
    },
    error: {
      main: '#ff604f',
    },
  },
  colors: {
    white,
  },
  overrides: {
    MuiButton: {
      root: {
        padding: '1.3rem',
      },
      text: {
        padding: '1.3rem',
      },
      outlined: {
        padding: '1.3rem',
      },
      sizeSmall: {
        padding: '.6rem',
      },
      sizeLarge: {
        padding: '2.1rem',
      },
    },
  },
});

export default theme;
