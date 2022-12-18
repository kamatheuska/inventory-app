import { StorageItemDTO, IngredientDTO } from "@inventory-app/types";
import styles from './storage-item-box.module.css'

import { IoAdd} from "react-icons/io5";

export default function StorageItemBoxPlaceholder() {
  return (
    <div className={styles.root} data-cy="storage-item-box">
      <IoAdd size='30px' />
      <p>Add one</p>
    </div>
  )
}