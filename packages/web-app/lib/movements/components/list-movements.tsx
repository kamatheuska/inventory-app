import { useSelector } from 'react-redux'
import { getAll } from '../movementSlice';
import styles from './list-movements.module.css'

export default function ListMovements () {
  const movementsList = useSelector(getAll);
  
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