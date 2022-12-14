import Head from 'next/head'
import { ReactElement } from 'react';
import Layout from '../lib/components/layout/layout';
import { useFetchIngredients } from '../lib/ingredients/ingredients.hooks';

import AddMovementForm from '../lib/movements/components/add-movement'
import styles from '../styles/Home.module.css'
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  const isLoading = useFetchIngredients();
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Home - Inventory App</title>
        <meta name="description" content="An app to keep your inventory in check" />
      </Head>

      <div className={styles.home}>
        { isLoading && <div>Loading...</div>}
        { !isLoading && <AddMovementForm />}
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