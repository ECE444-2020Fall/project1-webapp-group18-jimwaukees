import React, { useState } from 'react';
import { Input, Button, Icon } from 'semantic-ui-react';
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

export function SearchRecipes({ prevSearch, setPrevSearch, recipeResults, setRecipeResults }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [recipeIndex, setRecipeIndex] = useState(-1);

    const handleChange = (e, { value }) => {
        setSearchQuery(value);
    };

    const handleClick = async () => {
        if (searchQuery && searchQuery !== prevSearch) {
            let params = new URLSearchParams({ recipe: searchQuery });
            const url = `https://ezcook18.herokuapp.com/get_spoontacular_recipes?${params}`;

            let response = await fetch(url)
                .then((res) => res.json())
                .catch((error) => console.log(error));

            console.log(response);
            setRecipeResults(response);
            setPrevSearch(searchQuery);
        }
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleRecipeClick = (index) => {
        setOpenDialog(true);
        setRecipeIndex(index);
    };

    const gridClass = useStyles();

    return (
        <>
            <Input
                fluid
                placeholder='Search...'
                size='large'
                className="search-recipe"
                onChange={handleChange}
                action={
                    <Button icon onClick={handleClick} >
                        <Icon name='search' />
                    </Button>
                }
            />
            <div>
                Recipe you searched for: {prevSearch}
            </div>
            <Grid container spacing={4} className={gridClass.gridContainer}>
                {recipeResults.results.map((recipe, index) => (
                    <Grid item xs={12} sm={6} md={4}>
                        <Card recipeData={recipe} handleCardClick={() => handleRecipeClick(index)} />
                    </Grid>
                ))}
            </Grid>
            <RecipeDialog
                open={openDialog}
                handleClose={handleClose}
                data={recipeIndex >= 0 ? recipeResults.results[recipeIndex] : undefined}
                searchedIngredients={[]}
            />
        </>
    );
}
