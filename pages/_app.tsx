import '../styles/global/reset.scss';
import '../styles/global/vars.scss';
import '../styles/global/utility.scss';
import type { AppProps } from 'next/app';
import StateProvider from '../state/store';
import Layout from '../components/Layout';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StateProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StateProvider>
  );
}

export default MyApp;
