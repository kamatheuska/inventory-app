import { IngredientDTO, StorageItemDTO } from '@inventory-app/types';
import { useSelector } from 'react-redux'
import { getAll } from '../storageItemSlice';
import styles from './storage-item-list.module.css'
import StorageItemBox from './storage-item-box';
import StorageItemBoxPlaceholder from './storage-item-box-placeholder';


export default function StorageItemList () {
  const storageItemList = useSelector(getAll);
  
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