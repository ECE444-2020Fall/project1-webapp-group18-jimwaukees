import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

// developed by: Devesh Nischal
test('renders all appropriate tabs and logo', () => {
    const component = render(<App />);

    const searchTab = component.getByText(/search recipes/i);
    expect(searchTab).toBeInTheDocument();

    const searchIngredientsTab = component.getByText(/search ingredients/i);
    expect(searchIngredientsTab).toBeInTheDocument();

    const aboutTab = component.getByText(/about us/i);
    expect(aboutTab).toBeInTheDocument();

    const helpTab = component.getByText(/help/i);
    expect(helpTab).toBeInTheDocument();

    const logo = component.getByTestId("company_logo");
    expect(logo).toBeInTheDocument();
});
