import React, { useState } from 'react';
import { Input, Button, Icon } from 'semantic-ui-react'

export function SearchRecipes({ setRecipes }) {

    const [searchQuery, setSearchQuery] = useState('');
    const [prevSearch, setPrevSearch] = useState('');

    const handleChange = (e, {value}) => {
        setSearchQuery(value);
    }

    const handleClick = async () => {
      if (searchQuery && searchQuery !== prevSearch) {
        let params = new URLSearchParams({recipe: searchQuery});
        const url = `/get_spoontacular_recipes?${params}`;

        let recipeResults = await fetch(url)
          .then((res) => res.json())
          .catch((error) => console.log(error));

        console.log(recipeResults);
        setPrevSearch(searchQuery);
      }
    }

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
        </>
    );
}