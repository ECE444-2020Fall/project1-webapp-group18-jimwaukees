import React, { useState } from 'react';
import { Dropdown, Button, Icon } from 'semantic-ui-react';
import { ingredients } from './IngredientData';
import { RecipeDialog } from './RecipeDialog';
import { recipeIngredientSearch, recipeNameSearch } from '../mocks/mockRecipe';

export function SearchIngredients({ recipeCount, recipes }) {
    const [ingList, setIngList] = useState([]);
    const [options, setOptions] = useState(ingredients);
    const [openDialog, setOpenDialog] = useState(false);
    const [searchType, setSearchType] = useState('name');

    const handleAddition = (e, { value }) => {
        setOptions([{ text: value, value, key: value.toLowerCase() }, ...options]);
    };

    const handleChange = (e, { value }) => {
        setIngList(value);
    };

    const handleSearch = async (e) => {
        let ingDict = {};
        for (var i = 0; i < ingList.length; i++) {
            ingDict['ing' + i.toString()] = ingList[i].toLowerCase();
        }
        let params = await new URLSearchParams(ingDict);
        let res = await fetch('https://ezcook18.herokuapp.com/get_recipes?' + params.toString());
        let data = await res.json();
        recipes = data;
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const { currentValues } = options;

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
                <Button icon className="ingredients-dropdown-search" onClick={handleSearch}>
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
            <Button icon onClick={(e) => {
                setOpenDialog(true);
                setSearchType('ing');
            }}>
                    Open Recipe Ingredient Search
            </Button>
            <Button icon onClick={(e) => {
                setOpenDialog(true);
                setSearchType('name');
            }}>
                    Open Recipe Name Search
            </Button>
            <RecipeDialog
                open={openDialog}
                handleClose={handleClose}
                data={searchType === 'ing' ? recipeIngredientSearch : recipeNameSearch}
                searchedIngredients={searchType === 'ing' ? ['milk', 'corn', 'potato'] : []}
            />
        </>
    );
}
