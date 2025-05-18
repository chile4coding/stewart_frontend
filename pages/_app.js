import "@/styles/globals.css";
import Providers from "@/redux/Provider";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Providers>
        <Toaster />

        <Component {...pageProps} />
      </Providers>
    </QueryClientProvider>
  );
}
