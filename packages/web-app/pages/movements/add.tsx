import Head from 'next/head'
import { ReactElement, useEffect } from 'react';
import Layout from '../../lib/components/layout/layout';
import { NextPageWithLayout } from '../_app';
import styles from '../../styles/movements/AddMovement.module.css'
import AddMovementForm from '../../lib/movements/components/add-movement';
import { useFetchIngredients } from '../../lib/ingredients/ingredients.hooks';
import { useSelector } from 'react-redux';
import { AppState } from '../../lib/store';
import { getIsLoading } from '../../lib/ingredients/ingredientSlice';

const AddMovementPage: NextPageWithLayout = () => {
  useFetchIngredients()
  const isLoading = useSelector(getIsLoading)

  return (
    <div className={styles.container}>
      <Head>
        <title>Add Movement - Inventory App</title>
        <meta name="description" content="Form to add movement" />
      </Head>

      <div className={styles.wrapper}>
        { isLoading
          ? (<div>Loading...</div>)
          : <AddMovementForm />
        }
        
      </div>
    </div>
  )
}

AddMovementPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default AddMovementPage