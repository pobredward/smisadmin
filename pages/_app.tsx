// pages/_app.tsx
import { Global, css } from "@emotion/react";
import { AppProps } from "next/app";
import Head from "next/head";
import NavBar from "../components/NavBar";

const GlobalStyles = css`
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap");

  * {
    font-family: "Noto Sans KR", sans-serif;
    font-size: 12px;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: "Noto Sans KR", sans-serif;
    font-size: 12px;
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/circlelogo.png" /> {/* 파비콘 추가 */}
      </Head>
      <Global styles={GlobalStyles} />
      <NavBar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
