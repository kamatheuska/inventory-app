import { useSelector } from 'react-redux';
import ListIngredients from '../components/list-ingredients';
import { useFetchIngredients } from '../ingredients.hooks';
import { getIsLoading } from '../ingredientSlice';

export default function IngredientsIndex() {
    useFetchIngredients();
    const isLoading = useSelector(getIsLoading);

    return (
        <div>
            <div>
                {isLoading && <div>Loading...</div>}
                {!isLoading && <ListIngredients />}
            </div>
        </div>
    );
}
