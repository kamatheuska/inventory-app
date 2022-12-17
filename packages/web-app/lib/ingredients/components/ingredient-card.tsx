import { IIngredient } from "@inventory-app/types"

import styles from './ingredient-card.module.css'

type Props = {
  ingredient: IIngredient,
  onSelect?: (ingredient: IIngredient) => void
}
export default function IngredientCard ({ ingredient, onSelect }: Props) {
  const handleSelect = () => {
    if (onSelect && typeof onSelect === 'function') {
      onSelect(ingredient)
    }
  }
  return (
    <div className={styles.root} onClick={handleSelect}>
      <header className={styles.header}>
        <h3>
          { ingredient.name }
        </h3>
      </header>
      <div className={styles.content}>

        <p>
          { ingredient.description }
        </p>
        <p>
          <strong>
            Category:
          </strong>
          <span>
            { ingredient.category }
          </span>
        </p>
      </div>
    </div>
  )
}