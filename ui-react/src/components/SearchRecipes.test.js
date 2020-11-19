import React from 'react';
import { render } from '@testing-library/react';
import { SearchRecipes } from './SearchRecipes';
import { multiRecipeSearch } from '../mocks/mockRecipe';

test('renders recipe results correctly', () => {
    const component = render(
        <SearchRecipes
            prevSearch={"pasta"}
            setPrevSearch={jest.fn()}
            recipeResults={multiRecipeSearch}
            setRecipeResults={jest.fn()}
        />
    );

    const firstRecipe = component.getByText(/Pasta With Tuna/i);
    expect(firstRecipe).toBeInTheDocument();

    const secondRecipe = component.getByText(/Pasta Margherita/i);
    expect(secondRecipe).toBeInTheDocument();

    const recipeCards = component.getAllByTestId("recipe_card");
    expect(recipeCards.length).toBe(2);
});
