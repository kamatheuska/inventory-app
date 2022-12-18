import { useSelector } from 'react-redux'
import { IngredientDTO } from "@inventory-app/types"
import { getAll } from '../ingredientSlice';
import IngredientCard from './ingredient-card';
import styles from './list-ingredients.module.css'

type Props = {
  onSelect?: (ingredient: IngredientDTO) => void
}

export default function ListIngredients ({ onSelect }: Props) {
  const ingredientsList = useSelector(getAll);

  return (
    <div className={styles.root}>
      <div className={styles.grid}>
        {ingredientsList.map((ingredient, index) => (
          <IngredientCard
            key={index}
            ingredient={ingredient}
            onSelect={onSelect}
          />
        ))}
      </div>

    </div>
  )
}