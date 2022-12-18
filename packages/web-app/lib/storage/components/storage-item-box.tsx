import { StorageItemDTO, IngredientDTO } from "@inventory-app/types";
import styles from './storage-item-box.module.css'

type Props = StorageItemDTO;

export default function StorageItemBox({ amount, ingredient }: Props) {
  const ingredientDTO = ingredient as IngredientDTO;
  if (!ingredientDTO) {
    return <div className={styles.root} data-cy="storage-item-box"></div>
  }
  return (
    <div className={styles.root} data-cy="storage-item-box">
      <h3>{ingredientDTO.name}</h3>
      <p>{amount} {ingredientDTO.measureUnit}</p>
    </div>
  )
}