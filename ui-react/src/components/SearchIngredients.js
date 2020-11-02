import React, { useState } from 'react';
import { Dropdown, Button, Icon } from 'semantic-ui-react'
import { ingredients } from './IngredientData'

export function SearchIngredients({ recipeCount, recipes }) {
    const [ingList, setIngList] = useState([]);  
    const [options, setOptions] = useState(ingredients);

    const handleAddition = (e, {value}) => {
      setOptions([{text: value, value, key: value.toLowerCase()}, ...options]);
    }

    const handleChange = (e, {value}) => {
      setIngList(value);
    }

    const handleClick = async (e) => {
      let ingDict = {};
      for(var i = 0; i < ingList.length; i++) {
        ingDict['ing' + i.toString()] = ingList[i].toLowerCase();
      }
      let params = await new URLSearchParams(ingDict);
      let res = await fetch('/get_recipes?' + params.toString());
      let data = await res.json();
      recipes = data;
    }

    const {currentValues} = options;

    return (
        <>
            <div className="dropdown-group">
                <Dropdown
                    clearable
                    multiple
                    search
                    selection
                    allowAdditions
                    options={options}
                    placeholder='Select Ingredients'
                    className="ingredients-dropdown"
                    onChange={handleChange}
                    onAddItem={handleAddition}
                    value={currentValues}
                />
                <Button icon className="ingredients-dropdown-search" onClick={handleClick}>
                    Search Recipes
                </Button>
            </div>
            <div>
                List of ingredients({ingList.length}):
            </div>
            {
                ingList.map(ing => {
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
