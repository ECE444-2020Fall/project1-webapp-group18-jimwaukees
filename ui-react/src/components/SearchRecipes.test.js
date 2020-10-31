import React from 'react';
import { render } from '@testing-library/react';
import SearchRecipes from './SearchRecipes';

// developed by: Matthew Viegas
test('render default search recipe page elements', () => {
    //const component = render(<SearchRecipes />);
    const component = render(SearchRecipes)  

    const searchIcon = component.getByText('Search')
    expect(searchBar).toBeInTheDocument()
});
