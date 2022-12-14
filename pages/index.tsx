import Head from 'next/head'
import Image from 'next/image'
import { useFetchIngredients } from '../lib/ingredients/ingredients.hooks';

import AddMovementForm from '../lib/movements/components/add-movement'
import styles from '../styles/Home.module.css'

export default function Home() {
  const isLoading = useFetchIngredients();
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Inventory APp</title>
        <meta name="description" content="An app to keep your inventory in check" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        { isLoading && <div>Loading...</div>}
        { !isLoading && <AddMovementForm />}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
