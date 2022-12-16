import Head from 'next/head'
import { ReactElement } from 'react';
import Layout from '../../lib/components/layout/layout';
import ListIngredients from '../../lib/ingredients/components/list-ingredients'
import { useFetchIngredients } from '../../lib/ingredients/ingredients.hooks';
import styles from '../../styles/Ingredients.module.css'
import { NextPageWithLayout } from '../_app';

const Ingredients: NextPageWithLayout = () => {
  const isLoading = useFetchIngredients();
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Ingredients - Inventory App</title>
        <meta name="description" content="List of ingredients of the inventory app" />
      </Head>

      <main className={styles.main}>
        { isLoading && <div>Loading...</div>}
        { !isLoading && <ListIngredients />}
      </main>
    </div>
  )
}


Ingredients.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default Ingredients;