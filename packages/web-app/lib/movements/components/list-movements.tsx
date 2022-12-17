import { useSelector } from 'react-redux'
import { getAll } from '../movementSlice';
import styles from './list-movements.module.css'
import MovementItem from './movement-item';

export default function ListMovements () {
  const movementsList = useSelector(getAll);
  
  return (
    <div className={styles.root}>
      <div className={styles.grid}>
        {movementsList.map((movement, index) => (
          <MovementItem key={index} {...movement} />
        ))}
      </div>

    </div>
  )
}