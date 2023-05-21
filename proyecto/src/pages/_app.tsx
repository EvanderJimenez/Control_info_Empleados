import "@/styles/globals.css";
import type { AppProps } from "next/app";
import  { Provider }  from  "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import  ApplicationStore  from  "@/root/redux/store";



export default function App({ Component, pageProps }: AppProps) {
  return (
	
		<Provider  store={ApplicationStore}>
			<Component  {...pageProps}  />
		</Provider>
	

	);
}
