import { useSelector } from 'react-redux'
import { AppState } from '../../store'
import styles from './list-ingredients.module.css'

export default function ListIngredients () {
  const ingredientsList = useSelector((state: AppState) => state.ingredients.list);

  return (
    <div className={styles.root}>
      <div>
        {ingredientsList.map((ingredient, index) => (
          <div key={index}>
            <p>
              { ingredient.name }
            </p>
            <p>
              { ingredient.description }
            </p>
          </div>
        ))}
      </div>

    </div>
  )
}