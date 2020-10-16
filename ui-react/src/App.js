import React, {useEffect, useState} from 'react';
import './App.css';

function App() {
  const [recipeCount, setRecipeCount] = useState(0);
  const [recipes, setRecipes] = useState([]);
  const [specialRecipe, setSpecialRecipe] = useState('');

  useEffect(() => {
    fetch("/get_recipes").then(response => {
      response.json().then(data => {
        setRecipeCount(data.count);
        setRecipes(data.recipes);
      });
    });

    fetch("/get_recipe").then(response => {
      response.json().then(data => {
        setSpecialRecipe(data.name);
      });
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          Recipe you searched for: {specialRecipe}
        </div>
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
      </header>
    </div>
  );
}

export default App;
