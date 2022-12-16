import { useSelector } from 'react-redux'
import { AppState } from '../../store'
import styles from './list-movements.module.css'

export default function ListMovements () {
  const movementsList = useSelector((state: AppState) => state.movements.list);
  
  return (
    <div className={styles.root}>
      <div className={styles.grid}>
        {movementsList.map((movement, index) => (
          <div key={index} className={styles.row}>
            <div className={styles.cell}>
              <span>
                { movement.ingredientId }
              </span>
            </div>
            <div className={styles.cell}>
              <span>
                { movement.amount }
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}