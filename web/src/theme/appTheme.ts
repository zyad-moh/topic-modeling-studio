import { alpha, createTheme } from '@mui/material/styles';

const background = '#070914';
const surface = '#11152a';

export const appTheme = createTheme({
  palette: {
    mode: 'dark',
    background: { default: background, paper: surface },
    primary: { main: '#7893ff', light: '#b6c4ff', dark: '#516bd8' },
    secondary: { main: '#af7df8', light: '#dbbdff' },
    success: { main: '#55d6a2' },
    text: { primary: '#f7f8ff', secondary: '#a7b1d1' },
    error: { main: '#ff6b81' },
  },
  typography: {
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h3: { fontWeight: 800, letterSpacing: '-0.052em', lineHeight: 1.05 },
    h4: { fontWeight: 760, letterSpacing: '-0.04em', lineHeight: 1.1 },
    h5: { fontWeight: 730, letterSpacing: '-0.025em' },
    button: { fontWeight: 700, textTransform: 'none' },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: `radial-gradient(circle at 12% 5%, ${alpha('#546dff', 0.19)}, transparent 27%), radial-gradient(circle at 92% 78%, ${alpha('#a35cff', 0.16)}, transparent 30%), ${background}`,
          minHeight: '100vh',
          letterSpacing: '-0.01em',
        },
        '*': { boxSizing: 'border-box' },
      },
    },
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
    MuiButton: { styleOverrides: { root: { borderRadius: 12, minHeight: 46, paddingInline: 20, boxShadow: 'none', transition: 'transform .18s ease, box-shadow .18s ease, background .18s ease', '&:hover': { transform: 'translateY(-1px)', boxShadow: '0 10px 24px rgba(74, 99, 226, .22)' } } } },
    MuiTabs: { styleOverrides: { indicator: { height: 3, borderRadius: '3px 3px 0 0', background: 'linear-gradient(90deg, #7893ff, #af7df8)' } } },
    MuiTab: { styleOverrides: { root: { minHeight: 62, fontWeight: 700 } } },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { backgroundColor: alpha('#ffffff', 0.045), borderRadius: 12, transition: 'background .18s ease', '&:hover': { backgroundColor: alpha('#ffffff', 0.065) } },
        notchedOutline: { borderColor: alpha('#ffffff', 0.13) },
      },
    },
  },
});
