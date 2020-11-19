import React, { useState } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import Card from './Card';
import { RecipeDialog } from './RecipeDialog';
import { Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
    gridContainer: {
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '20px'
    }
});

const searchStyles = makeStyles({
    root: {
        marginTop: "20px",
        '& label.Mui-focused': {
            color: "#2ED573",
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "white"
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#2ED573",
            borderWidth: "2px"
        },
        "&:focus .MuiOutlinedInput-notchedOutline": {
            borderColor: "#2ED573 !important",
            borderWidth: "2px"
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#2ED573 !important",
            borderWidth: "2px"
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: "30px",
            backgroundColor: "white",
            width: "500px"
        },
        '& .MuiOutlinedInput-root.Mui-focused fieldset': {
            borderColor: "#2ED573",
            borderWidth: "2px"
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: "#2ED573",
        }
    }
});

const loaderClasses = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
}));

export function SearchRecipes({ prevSearch, setPrevSearch, recipeResults, setRecipeResults }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [recipeIndex, setRecipeIndex] = useState(-1);
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleClick = async () => {
        if (searchQuery && searchQuery !== prevSearch) {
            setLoading(true);
            let params = new URLSearchParams({ recipe: searchQuery });
            const url = `https://ezcook18.herokuapp.com/get_spoontacular_recipes?${params}`;

            let response = await fetch(url)
                .then((res) => res.json())
                .catch((error) => console.log(error));

            setLoading(false);
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

    const handleLoaderClose = () => {
        setLoading(false);
    };

    const gridClass = useStyles();
    const searchClass = searchStyles();
    const backdropClasses = loaderClasses();

    return (
        <>
            <TextField
                variant="outlined"
                label="Search Recipe by Name"
                onChange={handleChange}
                classes={searchClass}
            />
            <Button 
                className="ingredients-dropdown-search-btn"
                animated 
                onClick={handleClick}
            >
                <Button.Content visible>Search Recipes</Button.Content>
                <Button.Content hidden>
                    <Icon name='search' />
                </Button.Content>
            </Button>
            {recipeResults.results.length > 0 ? 
                <div style={{"color": "black", "margin-top": "10px"}}>
                    Recipe results for "{prevSearch}" ({recipeResults.number}):
                </div>
             : <></> }
            <Grid container spacing={4} className={gridClass.gridContainer}>
                {recipeResults.results.map((recipe, index) => (
                    <Grid item xs={12} sm={6} md={4} data-testid="recipe_card">
                        <Card
                            recipeData={recipe}
                            handleCardClick={() => handleRecipeClick(index)}
                        />
                    </Grid>
                ))}
            </Grid>
            <RecipeDialog
                open={openDialog}
                handleClose={handleClose}
                data={recipeIndex >= 0 ? recipeResults.results[recipeIndex] : undefined}
                searchedIngredients={[]}
            />
            <Backdrop className={backdropClasses.backdrop} open={loading} onClick={handleLoaderClose}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
}
