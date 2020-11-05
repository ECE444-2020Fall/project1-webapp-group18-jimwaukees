import React, { useState } from 'react';
import { Input, Button, Icon } from 'semantic-ui-react'

export function SearchRecipes({ searchedRecipe }) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleChange = (e, {value}) => {
        setSearchQuery(value);
    }

    return (
        <>
            <Input fluid placeholder='Search...' size='large' className="search-recipe" onChange={handleChange} action={
                    <Button icon>
                        <Icon name='search' />
                    </Button>
                }/>
            <div>
                What you have entered: {searchQuery}
            </div>
            <div>
                Recipe you searched for: {searchedRecipe}
            </div>
        </>
    );
}