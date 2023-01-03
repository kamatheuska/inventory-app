import { describe, it } from 'vitest';
import React from 'react';

import { render } from '@testing-library/react';
import ListIngredients from '../../../src/ingredients/components/list-ingredients';

describe('List Ingredients', () => {
    it('should list a bunch of ingredients', () => {
        render(<ListIngredients />);
    });
});
