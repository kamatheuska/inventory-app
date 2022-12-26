import { useSelector } from 'react-redux'
import { getAll, getIsLoading } from '../storageItemSlice';
import styles from './storage-item-list.module.css'
import StorageItemBox from './storage-item-box';
import StorageItemBoxPlaceholder from './storage-item-box-placeholder';
import { useFetchStorageItems } from '../storage.hooks';


export default function StorageItemList () {
  useFetchStorageItems();
  const isLoading = useSelector(getIsLoading);
  const storageItemList = useSelector(getAll);

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (storageItemList.length === 0) {
    return <div>No items to show</div>;
  }

  return (
    <div className={styles.root} data-cy="storage-item-list">
      <div className={styles.grid}>
        {storageItemList.map((storageItem, index) => (
          <StorageItemBox key={index} {...storageItem} />
        ))}
        <StorageItemBoxPlaceholder />
      </div>

    </div>
  )
}