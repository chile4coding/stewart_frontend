import "@/styles/globals.css";
import Providers from "@/redux/Provider";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { SEOHeader } from "@/components/SEOHeader";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <>
      <SEOHeader
        title={pageProps?.eventData?.title || "Stewart Collection"}
        siteName="Stewart Collection"
        description={pageProps?.eventData?.description || ""}
        pageUrl={
          pageProps?.eventData?.pageUrl || process.env.NEXT_PUBLIC_FRONTEND
        }
        ogImage={
          pageProps?.eventData?.banner?.url ||
          "https://res.cloudinary.com/dynkejvim/image/upload/v1748335214/o1kxynt46keabweyl0kp.png"
        }
      />

      <QueryClientProvider client={queryClient}>
        <Providers>
          <Toaster />

          <Component {...pageProps} />
        </Providers>
      </QueryClientProvider>
    </>
  );
}
