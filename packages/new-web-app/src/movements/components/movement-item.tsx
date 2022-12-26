import styles from './movement-item.module.css';
import circlePlaceholder from '../../lib/assets/images/circle-placeholder.png';
import { IngredientViewType, MovementDTO } from '@inventory-app/types';

type Props = MovementDTO;

export default function MovementItem({ amount, ingredient, operation, createdAt }: Props) {
    const ingredientDTO = ingredient as IngredientViewType;
    const isAddOperation = () => operation === 'add';
    const date = Intl.DateTimeFormat('es-ES', {
        month: 'short',
        day: 'numeric',
    }).format(createdAt);

    const amountClasses = [styles.amount, isAddOperation() && styles.tag];

    return (
        <div className={styles.root} data-cy="movement-item">
            <div className={styles.icon}>
                <img src={circlePlaceholder} alt="Add an item icon" width={35} height={35} />
            </div>
            {ingredientDTO ? (
                <>
                    <div className={styles.content}>
                        <h5>{ingredientDTO.name}</h5>
                        <p>{date}</p>
                    </div>
                    <div className={amountClasses.join(' ')}>
                        <span>
                            {isAddOperation() ? '' : '-'} {amount}
                        </span>
                        <span> {ingredientDTO.measureUnit}</span>
                    </div>
                </>
            ) : (
                <div className={styles.content}></div>
            )}
        </div>
    );
}
