import React from 'react';
import { render } from '@testing-library/react';
import { SearchIngredients } from './SearchIngredients';
import { multiIngredientSearch } from '../mocks/mockRecipe';

test('renders recipe results correctly', () => {
    const component = render(
        <SearchIngredients
            prevIngList={[
                {value: "Milk", text: "Milk"},
                {value: "Corn", text: "Corn"},
                {value: "Potato", text: "Potato"}
            ]}
            setPrevIngList={jest.fn()}
            recipeResults={multiIngredientSearch}
            setRecipeResults={jest.fn()}
        />
    );

    const firstRecipe = component.getByText(/Potato, Corn & Bacon Chowder/i);
    expect(firstRecipe).toBeInTheDocument();

    const secondRecipe = component.getByText(/Milk, Corn, and Potato in a pot/i);
    expect(secondRecipe).toBeInTheDocument();

    const recipeCards = component.getAllByTestId("recipe_card");
    expect(recipeCards.length).toBe(2);
});
