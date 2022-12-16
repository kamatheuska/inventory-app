import '../styles/reset.css'
import '../styles/globals.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { wrapper } from '../lib/store';
import { Provider } from 'react-redux';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, ...rest }: AppPropsWithLayout) {
  const { store, props } = wrapper.useWrappedStore(rest);
  
  const getLayout = Component.getLayout ?? ((page: any) => page)

  return (
    <Provider store={store}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        getLayout(<Component {...props.pageProps} />)
      }
    </Provider>
  )
}
