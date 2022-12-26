import { StorageItemDTO, IngredientViewType } from "@inventory-app/types";
import Link from "next/link";
import styles from './storage-item-box.module.css'

type Props = StorageItemDTO;

export default function StorageItemBox({ amount, ingredient, _id }: Props) {
  const ingredientDTO = ingredient as IngredientViewType;
  if (!ingredientDTO) {
    return <div className={styles.root} data-cy="storage-item-box"></div>
  }
  
  return (
    <Link href={`/storage/items/${_id}` }>
        <div className={styles.root} data-cy="storage-item-box">
          <h3>{ingredientDTO.name}</h3>
          <p>{amount} {ingredientDTO.measureUnit}</p>
        </div>
    </Link>
  )
}