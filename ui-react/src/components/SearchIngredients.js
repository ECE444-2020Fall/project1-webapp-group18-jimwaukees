import React, { useState } from 'react';
import { Dropdown, Button } from 'semantic-ui-react';
import { ingredients } from './IngredientData';
import Card from './Card';
import { RecipeDialog } from './RecipeDialog';
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    gridContainer: {
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '20px'
    }
});

export function SearchIngredients({ prevIngList, setPrevIngList, recipeResults, setRecipeResults }) {
    const [ingList, setIngList] = useState([]);
    const [options, setOptions] = useState(ingredients);
    const [openDialog, setOpenDialog] = useState(false);
    const [recipeIndex, setRecipeIndex] = useState(-1);

    const handleAddition = (e, { value }) => {
        setOptions([{ text: value, value, key: value.toLowerCase() }, ...options]);
    };

    const handleChange = (e, { value }) => {
        setIngList(value);
    };

    const handleSearch = async (e) => {
        let sameSearch = prevIngList.length === ingList.length && prevIngList.every((ing) => ingList.includes(ing));
        if (!sameSearch && ingList.length > 0) {
            let ingDict = {};
            for (var i = 0; i < ingList.length; i++) {
                ingDict['ing' + i.toString()] = ingList[i].toLowerCase();
            }
            let params = await new URLSearchParams(ingDict);
            let res = await fetch('https://ezcook18.herokuapp.com//get_recipes?' + params.toString());
            let data = await res.json();
            setRecipeResults(data);
            setPrevIngList(ingList);
        }
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleRecipeClick = (index) => {
        setOpenDialog(true);
        setRecipeIndex(index);
    };

    const { currentValues } = options;
    const gridClass = useStyles();

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
                Ingredients you searched for({prevIngList.length}):
                {
                    prevIngList.map(ing => {
                        return (
                            <>
                                {ing},
                            </>
                        )
                    })
                }
            </div>
            <Grid container spacing={4} className={gridClass.gridContainer}>
                {recipeResults.recipes.map((recipe, index) => (
                    <Grid item xs={12} sm={6} md={4}>
                        <Card recipeData={recipe} handleCardClick={() => handleRecipeClick(index)} />
                    </Grid>
                ))}
            </Grid>
            <RecipeDialog
                open={openDialog}
                handleClose={handleClose}
                data={recipeIndex >= 0 ? recipeResults.recipes[recipeIndex] : undefined}
                searchedIngredients={prevIngList}
            />
        </>
    );
}
