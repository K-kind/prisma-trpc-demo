import "@/styles/globals.css";

import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";

import { theme } from "@/lib/antd";
import { trpc } from "@/lib/trpc";

function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider theme={theme}>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}

export default trpc.withTRPC(App);
