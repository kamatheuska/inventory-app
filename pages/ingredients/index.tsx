import Head from 'next/head'
import ListIngredients from '../../lib/ingredients/components/list-ingredients'
import { useFetchIngredients } from '../../lib/ingredients/ingredients.hooks';
import styles from '../../styles/Ingredients.module.css'

export default function Ingredients() {
  const isLoading = useFetchIngredients();
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Ingredients - Inventory App</title>
        <meta name="description" content="List of ingredients of the inventory app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        { isLoading && <div>Loading...</div>}
        { !isLoading && <ListIngredients />}
      </main>
    </div>
  )
}
