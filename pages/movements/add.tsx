import Head from 'next/head'
import { ReactElement, useEffect } from 'react';
import Layout from '../../lib/components/layout/layout';
import { NextPageWithLayout } from '../_app';
import styles from '../../styles/movements/AddMovement.module.css'
import AddMovementForm from '../../lib/movements/components/add-movement';
import { useFetchIngredients } from '../../lib/ingredients/ingredients.hooks';
import { useSelector } from 'react-redux';
import { AppState } from '../../lib/store';

const AddMovementPage: NextPageWithLayout = () => {
  const { fetchIngredients } = useFetchIngredients()
  const isLoading = useSelector((state: AppState) => state.ingredients.isLoading)
  useEffect(() => {
    console.log('fetch')
    fetchIngredients()
  }, [fetchIngredients]);

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