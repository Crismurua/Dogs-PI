import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import {Link} from 'react-router-dom';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      maxWidth: 350,
      minWidth: 350,
      maxHeight: 400,
      margin: 10.
      
    },
    media: {
      height: 250,
      textDecoration: "none"
    },
    typo: {
        textDecoration: "none"
    },
  });

const DogCard = (props) => {

    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <Link to={`/dogs/${props.id}`}>
                    <CardMedia
                        className={classes.media}
                        image={props.img}   
                        title={props.name}
                    />
                </Link> 
            <CardContent>
                <Typography className={classes.typo} variant="body2" color="textSecondary" component="p">
                    Breed Name : {props.name}
                    <br></br>
                    Weight : {props.weight} Kg
                    <br></br>
                    Temps : {props.temperament ? props.temperament : props.temperaments?.map(t => t.name)}
                </Typography>
            </CardContent>
            </CardActionArea>
          
        </Card>
    )
};

export default DogCard;