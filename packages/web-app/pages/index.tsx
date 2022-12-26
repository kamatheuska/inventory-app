import Head from 'next/head'
import Link from 'next/link';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import CircleButtonIcon from '../lib/components/buttons/circle-button-icon';
import Layout from '../lib/components/layout/layout';
import { IoAdd} from "react-icons/io5";

import MovementsList from '../lib/movements/components/movements-list';
import { useFetchMovements } from '../lib/movements/movements.hooks';
import { getAll, getIsLoading, setList } from '../lib/movements/movementSlice';
import styles from '../styles/Home.module.css'
import { NextPageWithLayout } from './_app';
import { getAllMovements } from '../lib/movements/movements.rest';
import { useDispatch } from 'react-redux';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { MovementViewType } from '@inventory-app/types';

function Home ({ movements }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const dispatch = useDispatch()
  dispatch(setList(movements))
  
  return (
    <div data-cy="home-page">
      <Head>
        <title>Home - Inventory App</title>
        <meta name="description" content="An app to keep your inventory in check" />
      </Head>

      <div className={styles.home}>
        <header>
          <h1>Movements</h1>
          <div>
            <CircleButtonIcon
              label='Add movement'
              variant='primary'
            >
              <Link href="/movements/add">
                <IoAdd size='30px' />
              </Link>
            </CircleButtonIcon>
          </div>
        </header>
        <MovementsList />
      </div>
    </div>
  )
}

interface IProps {
  movements: MovementViewType[]
}

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  const movements: MovementViewType[] = await getAllMovements();

  return {
    props: {
      movements
    }
  }
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default Home