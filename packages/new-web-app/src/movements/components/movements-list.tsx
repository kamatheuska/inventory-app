import { useSelector } from 'react-redux';
import { getAll } from '../movementSlice';
import styles from './movements-list.module.css';
import MovementItem from './movement-item';

export default function MovementsList() {
    const movementsList = useSelector(getAll);

    return (
        <div className={styles.root} data-cy="movements-list">
            <div className={styles.grid}>
                {movementsList.map((movement, index) => (
                    <MovementItem key={index} {...movement} />
                ))}
            </div>
        </div>
    );
}
