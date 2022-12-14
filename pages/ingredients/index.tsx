import Head from 'next/head'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ListIngredients from '../../lib/ingredients/components/list-ingredients'
import { getAllIngredients } from '../../lib/ingredients/ingredients.rest';
import { setIngredientsList } from '../../lib/ingredients/ingredientSlice';
import styles from '../../styles/Ingredients.module.css'

export default function Ingredients() {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchIngredients = async () => {
      setLoading(true);
      const list = await getAllIngredients();

      dispatch(setIngredientsList(list));
    }

    fetchIngredients()
      .catch(console.error)
      .finally(() => {
        setLoading(false);
      })
  }, [dispatch])
  
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
