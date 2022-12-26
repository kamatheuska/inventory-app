import Head from 'next/head'
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../lib/components/layout/layout';
import StorageItemList from '../../lib/storage/components/storage-item-list';
import { useFetchStorageItems } from '../../lib/storage/storage.hooks';
import { getIsLoading } from '../../lib/storage/storageItemSlice';
import styles from '../../styles/Storage.module.css'
import { NextPageWithLayout } from '../_app';

const Storage: NextPageWithLayout = () => {

  return (
    <div className={styles.container}>
      <Head>
        <title>Storage - Inventory App</title>
        <meta name="description" content="Storage of the inventory app" />
      </Head>

      <div className={styles.content}>
          <StorageItemList />
      </div>
    </div>
  )
}


Storage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default Storage;