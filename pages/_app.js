import Layout from '../components/Layout'
import { wrapper } from '../store/store';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (<Layout>
    <Component {...pageProps} />
  </Layout>)
}

export default wrapper.withRedux(MyApp);

