import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from "../components/layout/layout";
import {AuthProvider} from "../context/auth-context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}
