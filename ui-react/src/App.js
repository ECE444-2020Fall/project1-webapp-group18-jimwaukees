import React, {useEffect, useState} from 'react';
import { Menu } from 'semantic-ui-react'
import './App.css';
import { SearchRecipes } from './components/SearchRecipes'
import { SearchIngredients } from './components/SearchIngredients'
import { About } from './components/About'
import { Help } from './components/Help'
import image from './Placeholder_Icon.png'

function App() {
  const [recipeCount, setRecipeCount] = useState(0);
  const [recipes, setRecipes] = useState([]);
  const [specialRecipe, setSpecialRecipe] = useState('');
  const [activeTab, setActiveTab] = useState('search_recipes');

  useEffect(() => {
    fetch('/get_recipes').then(response => {
      response.json().then(data => {
        setRecipeCount(data.count);
        setRecipes(data.recipes);
      });
    });

    fetch('/get_recipe').then(response => {
      response.json().then(data => {
        setSpecialRecipe(data.name);
      });
    });
  }, []);

const handleTabClick = (e, { name }) => {
  setActiveTab(name);
};

  return (
    <div className="App">
      <Menu pointing secondary>
        <Menu.Item>
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
        {activeTab === 'search_recipes' ? <SearchRecipes searchedRecipe={specialRecipe} /> : <></>}
        {activeTab === 'search_ingredients' ? <SearchIngredients recipeCount={recipeCount} recipes={recipes} /> : <></>}
        {activeTab === 'about_us' ? <About /> : <></>}
        {activeTab === 'help' ? <Help /> : <></>}
      </header>
    </div>
  );
}

export default App;
