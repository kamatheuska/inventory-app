import { IngredientDTO } from "@inventory-app/types"

import styles from './ingredient-card.module.css'

type Props = {
  ingredient: IngredientDTO,
  onSelect?: (ingredient: IngredientDTO) => void
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
        { !!ingredient.description && (
          <p>
            { ingredient.description }
          </p>
        )}
        <p>
          <strong>
            Category:
          </strong>
        </p>
        <p>
          { ingredient.category }
        </p>
      </div>
    </div>
  )
}