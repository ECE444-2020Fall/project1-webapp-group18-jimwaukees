import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import Card from "@material-ui/core/Card";
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from "@material-ui/core/CardActions";
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import recipeImage from './cheeseburger.jpeg'


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

export default function OutlinedCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant="outlined">
    <CardHeader title = "Cheeseburger" />
    <CardMedia
        className={classes.media}
        image= {recipeImage}
        title="Cheeseburger"
      />

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This cheeseburger is an easy to cook dish if you have buns, patties, and veggies. Make it smaller for a party portion, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
      <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Grill buns with 1 ounce of butter on the pan. Next, grill patties until they turn golden brown. Add lettuce, tomatoes, onions, provolone cheese, and pickles. If you'd like, you can add some honey mustard or other sauce with your cheeseburger.
          </Typography>
          </CardContent>
      </Collapse>



      <CardActions>
        <Button size="small">Try this Recipe</Button>
      </CardActions>
    </Card>
  );
}
