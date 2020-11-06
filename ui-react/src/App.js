import React, {useEffect, useState} from 'react';
import { Menu } from 'semantic-ui-react'
import './App.css';
import { SearchRecipes } from './components/SearchRecipes'
import { SearchIngredients } from './components/SearchIngredients'
import { About } from './components/About'
import { Help } from './components/Help'
import image from './ezcook.png'
import Card from './components/Card'
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '20px'

  }


});

function App() {
  const [recipeCount, setRecipeCount] = useState(0);
  const [recipes, setRecipes] = useState([]);

  // ? Chris: I think having specialRecipe is kind of redundant since we can get the input directly from the SearchRecipes.js
  // ? I think if we just pass in setRecipes to set the new recipe list into that component, there's no need for the other useState
  const [specialRecipe, setSpecialRecipe] = useState('');
  const [activeTab, setActiveTab] = useState('search_recipes');

  // useEffect(() => {
  //   // TODO: Disable these fetches because they're calling redundant HTTP requests to the back-end
  //   // fetch('/get_recipes').then(response => {
  //   //   response.json().then(data => {
  //   //     setRecipeCount(data.count);
  //   //     setRecipes(data.recipes);
  //   //   });
  //   // });

  // //   fetch('/get_recipe').then(response => {
  // //     response.json().then(data => {
  // //       setSpecialRecipe(data.name);
  // //     });
  // //   });
  // }, []);

const handleTabClick = (e, { name }) => {
  setActiveTab(name);
};

const gridClass = useStyles();
  return (
    
    <div className="App">
      <Menu pointing secondary>
        <Menu.Item data-testid="company_logo">
          <img src={image} />
        </Menu.Item>
        <Menu.Item
          name='search_recipes'
          active={activeTab === 'search_recipes'}
          onClick={handleTabClick}
        />
        <Menu.Item
          name='search_ingredients'
          active={activeTab === 'search_ingredients'}
          onClick={handleTabClick}
        />
        <Menu.Item
          name='about_us'
          active={activeTab === 'about_us'}
          onClick={handleTabClick}
        />
        <Menu.Item
          name='help'
          active={activeTab === 'help'}
          onClick={handleTabClick}
        />
      </Menu>
      <header className="App-header">
        {activeTab === 'search_recipes' ? <SearchRecipes setRecipes={setRecipes} /> : <></>}
        {activeTab === 'search_ingredients' ? <SearchIngredients recipeCount={recipeCount} recipes={recipes} /> : <></>}
        {activeTab === 'about_us' ? <About /> : <></>}
        {activeTab === 'help' ? <Help /> : <></>}
      </header>
      <Grid container spacing ={4} className = { gridClass.gridContainer }>
      <Grid item xs={12} sm = {6} md = {4}>
      <Card />
      </Grid> 

      <Grid item xs={12} sm = {6} md = {4}>
      <Card />
      </Grid> 

      <Grid item xs={12} sm = {6} md = {4}>
      <Card />
      </Grid> 

      <Grid item xs={12} sm = {6} md = {4}>
      <Card />
      </Grid> 

      <Grid item xs={12} sm = {6} md = {4}>
      <Card />
      </Grid> 

      <Grid item xs={12} sm = {6} md = {4}>
      <Card />
      </Grid> 

      </Grid>

    </div>
  );
}

export default App;
