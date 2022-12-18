import Head from 'next/head'
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../lib/components/layout/layout';
import ListIngredients from '../../lib/ingredients/components/list-ingredients'
import { useFetchIngredients } from '../../lib/ingredients/ingredients.hooks';
import { getIsLoading } from '../../lib/ingredients/ingredientSlice';
import styles from '../../styles/Ingredients.module.css'
import { NextPageWithLayout } from '../_app';

const Ingredients: NextPageWithLayout = () => {
  useFetchIngredients();
  const isLoading = useSelector(getIsLoading);
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Ingredients - Inventory App</title>
        <meta name="description" content="List of ingredients of the inventory app" />
      </Head>

      <div className={styles.main}>
        { isLoading && <div>Loading...</div>}
        { !isLoading && <ListIngredients />}
      </div>
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