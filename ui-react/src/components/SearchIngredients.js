import React, { useState } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { ingredients } from './IngredientData';
import Card from './Card';
import { RecipeDialog } from './RecipeDialog';
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import './Styles/SearchIngredients.css';


const gridStyles = makeStyles({
    gridContainer: {
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '20px'
    },
});

const searchStyles = makeStyles({
  inputRoot: {
    color: "purple",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "white"
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#2ED573",
      borderWidth: "2px"
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#2ED573"
    },
    "&.MuiOutlinedInput-root": {
      borderRadius: "30px"
    },
    "&.MuiInputBase-root": {
      backgroundColor: "white"
    }
  }
})

export function SearchIngredients({ prevIngList, setPrevIngList, recipeResults, setRecipeResults }) {
    const [ingList, setIngList] = useState([]);
    const [options, setOptions] = useState(ingredients);
    const [openDialog, setOpenDialog] = useState(false);
    const [recipeIndex, setRecipeIndex] = useState(-1);

    const handleAddition = (e,  value ) => {
        setOptions([{ text: value, value, key: value.toLowerCase() }, ...options]);
    };

    const handleChange = (e,  value ) => {
        setIngList(value);
    };

    const handleSearch = async (e) => {
        let sameSearch = prevIngList.length === ingList.length && prevIngList.every((ing) => ingList.includes(ing));
        if (!sameSearch && ingList.length > 0) {
            let ingDict = {};
            for (var i = 0; i < ingList.length; i++) {
                ingDict['ing' + i.toString()] = ingList[i].value.toLowerCase();
            }
            let params = await new URLSearchParams(ingDict);

            const url = 'https://ezcook18.herokuapp.com/get_recipes?' + params.toString();
            await fetch(url, {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            })
            .then((res) => res.json())
            .then((data) => {setRecipeResults(data);});

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
    const gridClass = gridStyles();
    const searchClass = searchStyles();

    return (
        <>
            <div className="dropdown-group">
                <Autocomplete
                  className="ingredients-dropdown-search"
                  classes={searchClass}
                  style={{ width: "500px" }}
                  filterSelectedOptions
                  multiple
                  onChange={handleChange}
                  limitTags={3}
                  disableCloseOnSelect
                  options={options}
                  getOptionLabel={(option)=> option.text}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" label="Select Ingredients" />
                  )}
                />
                <Button 
                  className="ingredients-dropdown-search-btn"
                  animated 
                  onClick={handleSearch}
                >
                  <Button.Content visible>Search Recipes</Button.Content>
                  <Button.Content hidden>
                    <Icon name='search' />
                  </Button.Content>
                </Button>

            </div>
            <div>
                Ingredients you searched for({prevIngList.length}):
                {
                    prevIngList.map(ing => {
                        return (
                            <>
                                {ing.text},
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
