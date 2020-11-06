import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { Image } from 'semantic-ui-react'

let ingMap = new Map();

export function RecipeDialog({ open, handleClose, data, searchedIngredients }) {
    const [ingList, setIngList] = useState([]);

    useEffect(() => {
        if (data && searchedIngredients.length > 0) {
            if (ingMap.has(data.recipeDetails.id)) {
                setIngList(ingMap.get(data.recipeDetails.id));
            } else {
                let list = data.recipeDetails.missedIngredients.map((ing) => {
                    return { name: ing.name, searchedIng: '' }
                });
                data.recipeDetails.usedIngredients.forEach((ing) => {
                    let match = '';
                    searchedIngredients.forEach((input) => {
                        if (ing.name.includes(input)) {
                            match = input
                        }
                    });
                    list.push({ name: ing.name, searchedIng: match });
                });

                const compare = (a, b) => {
                    if (a.searchedIng && !b.searchedIng) {
                        return -1;
                    }
                    if (!a.searchedIng && b.searchedIng) {
                        return 1;
                    }
                    return 0;
                };
                list.sort(compare);
                ingMap.set(data.recipeDetails.id, list);
                setIngList(list);
            }
        } else if (data && searchedIngredients.length === 0) {
            setIngList(data.missedIngredients.map((ing) => {
                return { name: ing.name, searchedIng: '' }
            }));
        }
    }, [data]);

    const renderSteps = (steps) => {
        return steps.map((step) => {
            return (
                <>
                    <Typography color="inherit" variant="h6">
                        {"Step " + step.number}
                    </Typography>
                    <Typography color="inherit" variant="subtitle2">
                        Equipment:
                        {step.equipment.map(item => <Chip size="small" label={item.name} />)}
                    </Typography>
                    <Typography color="inherit" variant="subtitle2">
                        Ingredients:
                        {step.ingredients.map(item => <Chip size="small" label={item.name} />)}
                    </Typography>
                    <Typography color="inherit" variant="subtitle2">
                        Length:
                        {step.length ? step.length.number + ' ' + step.length.unit : 'N/A'}
                    </Typography>
                    <Typography color="inherit" variant="body2">
                        {step.step}
                    </Typography>
                </>
            );
        })
    };

    return (
        <Dialog
            fullWidth={true}
            maxWidth="xl"
            scroll={'paper'}
            open={open}
            onClose={handleClose}
            aria-labelledby="dialog-title"
        >
            <DialogTitle id="dialog-title">
                {(data && data.recipeDetails) ? data?.recipeDetails.title : data?.title}
            </DialogTitle>
            <DialogContent>
                <Image src={(data && data.recipeDetails) ? data?.recipeDetails.image : data?.image} size={'large'} />
                <Typography color="inherit" variant="h5">
                    Reciepe Ingredients
                </Typography>
                {ingList.map((ing) => {
                    if (ing.searchedIng) {
                        return (
                            <Tooltip
                                title={
                                    <Typography color="inherit">
                                        {"Matched Searched Ingredient: " + ing.searchedIng}
                                    </Typography>
                                }
                                arrow
                            >
                                <Chip size="small" label={ing.name} color="primary" />
                            </Tooltip>
                        );
                    }
                    return (
                        <Chip size="small" label={ing.name} />
                    );
                })}
                {((data && data.recipeInstructions && data.recipeInstructions[0].steps) ||
                    (data && data.analyzedInstructions && data.analyzedInstructions[0].steps)) ?
                    (<>
                        <Typography color="inherit" variant="h5">
                            Reciepe Instructions
                        </Typography>
                        {data.recipeInstructions ?
                            renderSteps(data.recipeInstructions[0].steps) :
                            renderSteps(data.analyzedInstructions[0].steps)}
                    </>) : <></>}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}