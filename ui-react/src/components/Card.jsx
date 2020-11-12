import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 200
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)"
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    },

    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    }
}));

export default function OutlinedCard({ recipeData, handleCardClick }) {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <CardActionArea onClick={(e) => handleCardClick()}>
                <CardMedia
                    className={classes.media}
                    image={recipeData.recipeDetails ? recipeData.recipeDetails.image :  recipeData.image}
                    title={recipeData.recipeDetails ? recipeData.recipeDetails.title :  recipeData.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {recipeData.recipeDetails ? recipeData.recipeDetails.title :  recipeData.title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
