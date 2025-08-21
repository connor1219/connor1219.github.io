import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { M_PLUS_Rounded_1c } from "next/font/google";

const mPlusRounded = M_PLUS_Rounded_1c({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: mPlusRounded.style.fontFamily,
  },
  palette: {
    background: {
      default: "#F7F7F7",
    },
  },
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <title>Connor Morgan</title>
      </Head>
      <main className={mPlusRounded.className}>
        <Component {...pageProps} />
      </main>
    </ThemeProvider>
  );
}

