import React, { useEffect, useState } from 'react';
import { Menu } from 'semantic-ui-react'
import './App.css';
import { SearchRecipes } from './components/SearchRecipes'
import { SearchIngredients } from './components/SearchIngredients'
import { About } from './components/About'
import { Help } from './components/Help'
import image from './ezcook.png'

function App() {
    const [activeTab, setActiveTab] = useState('search_ingredients');
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
                    data-testid="search_recipes"
                />
                <Menu.Item
                    name='search_ingredients'
                    active={activeTab === 'search_ingredients'}
                    onClick={handleTabClick}
                    data-testid="search_ingredients"
                />
                <Menu.Item
                    name='help'
                    active={activeTab === 'help'}
                    onClick={handleTabClick}
                    data-testid="help"
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
                {activeTab === 'help' ? <Help /> : <></>}
            </header>
        </div>
    );
}

export default App;
