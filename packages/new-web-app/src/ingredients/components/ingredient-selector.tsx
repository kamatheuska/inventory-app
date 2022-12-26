import { MouseEventHandler, useState } from 'react';
import { IngredientViewType } from '@inventory-app/types';
import IngredientCard from './ingredient-card';

import ListIngredients from './list-ingredients';

type Props = {
    onSelect: (ingredient: IngredientViewType) => void;
};

export default function IngridientSelector({ onSelect }: Props) {
    const [showList, setShowList] = useState(false);

    const [selected, setSelected] = useState<IngredientViewType | null>(null);

    const onIngridientSelect = (ingredient: IngredientViewType) => {
        setShowList(false);
        setSelected(ingredient);
        onSelect(ingredient);
    };

    const handleShowList: MouseEventHandler = (event) => {
        event.preventDefault();
        setShowList(!showList);
    };

    if (showList) {
        return (
            <div>
                <button type="button" onClick={handleShowList}>
                    Hide List
                </button>
                <pre>show {showList}</pre>
                <ListIngredients onSelect={onIngridientSelect} />
            </div>
        );
    }
    return (
        <div>
            <pre>show {showList}</pre>
            <button type="button" onClick={handleShowList}>
                Select Ingredient
            </button>
            {!!selected && <IngredientCard ingredient={selected} />}
        </div>
    );
}
