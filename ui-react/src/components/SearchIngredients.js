import React, { useState } from 'react';
import { Dropdown, Button, Icon } from 'semantic-ui-react'

export function SearchIngredients({ recipeCount, recipes }) {
    const [searchArray, setSearchArray] = useState([]);

    const handleChange = (e, {value}) => {
        setSearchArray(value);
    }

    const options = [
        { key: 'milk', value: 'milk', text: 'Milk' },
        { key: 'cajun', value: 'cajun', text: 'Cajun' },
        { key: 'chicken', value: 'chicken', text: 'Chicken' },
        { key: 'eggs', value: 'eggs', text: 'Eggs' },
        { key: 'salt', value: 'salt', text: 'Salt' },
        { key: 'beef', value: 'beef', text: 'Beef' },
        { key: 'onions', value: 'onions', text: 'Onions' },
        { key: 'tomato', value: 'tomato', text: 'Tomato' },
        { key: 'cucumber', value: 'cucumber', text: 'Beef' },
    ];
    
    return (
        <>
            <div className="dropdown-group">
                <Dropdown
                    clearable
                    multiple
                    search
                    selection
                    options={options}
                    placeholder='Select Ingredients'
                    className="ingredients-dropdown"
                    onChange={handleChange}
                />
                <Button icon className="ingredients-dropdown-search">
                    Search Recipes
                </Button>
            </div>
            <div>
                List of ingredients({searchArray.length}):
            </div>
            {
                searchArray.map(ing => { 
                    return (
                        <div>
                            {ing} 
                        </div>
                    )
                })
            }
            <div>
                List of recipes({recipeCount}):
            </div>
            {
                recipes.map(recipe => { 
                    return (
                        <div>
                            {recipe.name} 
                        </div>
                    )
                })
            }
        </>
    );
}