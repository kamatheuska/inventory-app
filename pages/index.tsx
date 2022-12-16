import Head from 'next/head'
import Link from 'next/link';
import { ReactElement } from 'react';
import Layout from '../lib/components/layout/layout';

import ListMovements from '../lib/movements/components/list-movements';
import { useFetchMovements } from '../lib/movements/movements.hooks';
import styles from '../styles/Home.module.css'
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  const isLoadingMovements = useFetchMovements();
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Home - Inventory App</title>
        <meta name="description" content="An app to keep your inventory in check" />
      </Head>

      <div className={styles.home}>
        <h1>Movements</h1>
        <Link href="/movements/add">
          <button>
            Add Movement
          </button>
        </Link>
        { isLoadingMovements && <div>Loading...</div>}
        { !isLoadingMovements && <ListMovements />}
      </div>
    </div>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default Home