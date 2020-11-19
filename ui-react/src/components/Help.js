import React from 'react';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

export function Help() {
    return (
        <>
            <HelpOutlineIcon color="primary" style={{ fontSize: 200, "margin-bottom": "60px", color: "#2ED573" }}/>
            <div style={{"color": "black", "inline-size": "1500px", "font-size": "27px"}}>
                <p>
                    If you have a specific meal in mind, click on the Search Recipe tab. Simply enter the meal and recipes related to your search will be provided.
                </p>
                <p>
                    If you are unsure what you want to cook, but have a set of ingredients on hand, click on the Search Ingredients tab. Select the ingredients you want to use from the dropdown, and the system will return recipes using those ingredients.
                </p>
                <p>
                    Happy Cooking!
                </p>
            </div>
        </>
    );
}