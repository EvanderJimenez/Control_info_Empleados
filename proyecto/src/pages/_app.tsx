import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import ApplicationStore from "@/root/redux/store";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import { useEffect } from "react";
const toastConfig = {
  success: {
    duration: 2000,
    style: {
      background: "#B3C890",
      color: "white",
    },
    iconTheme: {
      primary: "white",
      secondary: "green",
    },
  },
  alert: {
    duration: 2000,
    style: {
      background: "##E8AA42",
      color: "white",
    },
    iconTheme: {
      primary: "white",
      secondary: "yellow",
    },
  },

  error: {
    duration: 2000,
    style: {
      background: "#CD0404",
      color: "white",
    },
    iconTheme: {
      primary: "white",
      secondary: "red",
    },
  },

  loading: {
    duration: 2000,
    style: {
      background: "#9DB2BF",
      color: "white",
    },
    iconTheme: {
      primary: "white",
      secondary: "blue",
    },
  },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={ApplicationStore}>
      <Component {...pageProps} />
      <Toaster position="top-center" toastOptions={toastConfig} />
    </Provider>
  );
}
