import { useSelector } from 'react-redux'
import { AppState } from '../../store'
import { IIngredient } from '../ingredients.types';
import IngredientCard from './ingredient-card';
import styles from './list-ingredients.module.css'

type Props = {
  onSelect?: (ingredient: IIngredient) => void
}

export default function ListIngredients ({ onSelect }: Props) {
  const ingredientsList = useSelector((state: AppState) => state.ingredients.list);
  console.log('log')
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