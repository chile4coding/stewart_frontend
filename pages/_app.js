import '@/styles/globals.css'
import Providers from '@/redux/Provider';

export default function App({ Component, pageProps }) {

  return (
    <Providers>
    <div >
      <Component {...pageProps} />

    </div>
    </Providers>
  );
}
