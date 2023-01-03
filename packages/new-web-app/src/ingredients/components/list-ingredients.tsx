import { useSelector } from 'react-redux';
import { IngredientViewType } from '@inventory-app/types';
import { getAll } from '../ingredientSlice';
import IngredientCard from './ingredient-card';
import styles from './list-ingredients.module.css';

type Props = {
    onSelect?: (ingredient: IngredientViewType) => void;
};

export default function ListIngredients({ onSelect }: Props) {
    const list = useSelector(getAll);
    if (!list || list.length === 0) {
        return (
            <div className={styles.root}>
                <div className={styles.empty}>No Ingredients to show</div>
            </div>
        );
    }

    return (
        <div className={styles.root}>
            <div className={styles.grid}>
                {list.map((ingredient, index) => (
                    <IngredientCard key={index} ingredient={ingredient} onSelect={onSelect} />
                ))}
            </div>
        </div>
    );
}
