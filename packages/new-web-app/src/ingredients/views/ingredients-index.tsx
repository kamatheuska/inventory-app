import Head from 'next/head';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../lib/components/layout/layout';
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
