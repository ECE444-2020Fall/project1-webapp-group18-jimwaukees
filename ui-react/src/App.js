import React, { useEffect, useState } from 'react';
import { Menu } from 'semantic-ui-react'
import './App.css';
import { SearchRecipes } from './components/SearchRecipes'
import { SearchIngredients } from './components/SearchIngredients'
import { About } from './components/About'
import { Help } from './components/Help'
import image from './ezcook.png'

function App() {
    const [activeTab, setActiveTab] = useState('search_recipes');
    const [prevIngList, setPrevIngList] = useState([]);
    const [recipeResultsIng, setRecipeResultsIng] = useState({
        recipes: []
    });
    const [prevSearch, setPrevSearch] = useState('');
    const [recipeResults, setRecipeResults] = useState({
        number: 0,
        offset: 0,
        results: []
    });

    // ? Chris: I think having specialRecipe is kind of redundant since we can get the input directly from the SearchRecipes.js
    // ? I think if we just pass in setRecipes to set the new recipe list into that component, there's no need for the other useState
    useEffect(() => {
        /*fetch('/get_recipes').then(response => {
            response.json().then(data => {
                setRecipeCount(data.count);
                setRecipes(data.recipes);
            });
        });

        fetch('/get_recipe').then(response => {
            response.json().then(data => {
                setSpecialRecipe(data.name);
            });
        });*/
    }, []);

    const handleTabClick = (e, { name }) => {
        setActiveTab(name);
    };

    return (
        <div className="App">
            <Menu pointing secondary>
                <Menu.Item className="logo-space" data-testid="company_logo">
                    <img className="logo" src={image} />
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
            </Menu>
            <header className="App-header">
                {activeTab === 'search_recipes' ? 
                    <SearchRecipes 
                        prevSearch={prevSearch}
                        setPrevSearch={setPrevSearch}
                        recipeResults={recipeResults}
                        setRecipeResults={setRecipeResults}
                    /> : 
                <></>}
                {activeTab === 'search_ingredients' ? 
                    <SearchIngredients 
                        prevIngList={prevIngList}
                        setPrevIngList={setPrevIngList}
                        recipeResults={recipeResultsIng}
                        setRecipeResults={setRecipeResultsIng}
                    /> : 
                <></>}
                {activeTab === 'about_us' ? <About /> : <></>}
                {activeTab === 'help' ? <Help /> : <></>}
            </header>
        </div>
    );
}

export default App;
