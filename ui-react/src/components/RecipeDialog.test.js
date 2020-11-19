import React from 'react';
import { render } from '@testing-library/react';
import { RecipeDialog } from './RecipeDialog';
import { recipeIngredientSearch, recipeNameSearch } from '../mocks/mockRecipe';

test('renders recipe dialog correctly - name search', () => {
    const component = render(
        <RecipeDialog
            open={true}
            handleClose={jest.fn()}
            data={recipeNameSearch}
            searchedIngredients={[]}
        />
    );

    const title = component.getByText(/pasta with tuna/i);
    expect(title).toBeInTheDocument();

    const image = component.getByTestId("recipe_image");
    expect(image).toBeInTheDocument();

    const ingredients = component.getAllByTestId("ingredient_pill");
    expect(ingredients.length).toBe(9);

    const steps = component.getAllByTestId("recipe_step");
    expect(steps.length).toBe(6);
});

test('renders recipe dialog correctly - ingredient search', () => {
    const component = render(
        <RecipeDialog
            open={true}
            handleClose={jest.fn()}
            data={recipeIngredientSearch}
            searchedIngredients={[
                {value: "Milk", text: "Milk"},
                {value: "Corn", text: "Corn"},
                {value: "Potato", text: "Potato"}
            ]}
        />
    );

    const title = component.getByText(/Potato, Corn & Bacon Chowder/i);
    expect(title).toBeInTheDocument();

    const image = component.getByTestId("recipe_image");
    expect(image).toBeInTheDocument();

    const matchedIngredients = component.getAllByTestId("ingredient_pill_matched");
    expect(matchedIngredients.length).toBe(4);

    const ingredients = component.getAllByTestId("ingredient_pill");
    expect(ingredients.length).toBe(3);

    const steps = component.getAllByTestId("recipe_step");
    expect(steps.length).toBe(2);
});