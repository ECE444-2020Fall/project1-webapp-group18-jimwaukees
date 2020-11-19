import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

// developed by: Devesh Nischal
test('renders all appropriate tabs and logo', () => {
    const component = render(<App />);

    const searchTab = component.getByTestId("search_recipes");
    expect(searchTab).toBeInTheDocument();

    const searchIngredientsTab = component.getByTestId("search_ingredients");
    expect(searchIngredientsTab).toBeInTheDocument();

    const aboutTab = component.getByTestId("help");
    expect(aboutTab).toBeInTheDocument();

    const logo = component.getByTestId("company_logo");
    expect(logo).toBeInTheDocument();
});
