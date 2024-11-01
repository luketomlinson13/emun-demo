import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ThemeProvider, CssBaseline, PaletteMode, useMediaQuery } from '@mui/material';
import { useState, useMemo, useEffect } from 'react';
import { getTheme } from '../theme/theme';
import { GlobalStyles } from '@mui/material';

dayjs.extend(customParseFormat);

type EnhancedAppProps = AppProps & {
  Component: NextPage;
};

const GlobalScrollbarStyles = () => (
  <GlobalStyles
    styles={{
      '*::-webkit-scrollbar': {
        width: '8px',
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: 'secondary.dark',
      },
      '*::-webkit-scrollbar-track': {
        backgroundColor: 'transparent',
      },
      '*': {
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(0, 0, 0, 0.5) transparent',
      },
    }}
  />
);

export default function App(props: EnhancedAppProps) {
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  // * This will set the theme based on the browsers color scheme
  // ?? If you want to specify a theme, just remove the useEffect logic and just keep getTheme('dark')
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<PaletteMode>('light');
  useEffect(() => {
    setMode(prefersDarkMode ? 'dark' : 'light');
  }, [prefersDarkMode]);
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalScrollbarStyles />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Head>
          <title>EMUN Commission Portal</title>
          <meta name='viewport' content='initial-scale=1, width=device-width' />
        </Head>
        <CssBaseline />
        {getLayout(<Component {...pageProps} />)}
      </LocalizationProvider>
    </ThemeProvider>
  );
}
