import React from "react";
import { useHistory } from "react-router-dom";
import { Button, makeStyles } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import Image from './landing.png';

const useStyles = makeStyles((theme) => ({
    main: {
        
        backgroundImage: `url(${Image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '90vh',
        width: '80vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyItems: 'center'



        
    },
    image: {

      
    },
    btn: {
        position: 'relative',
        top: 100,
        display: 'flex',
        maxHeight: 50,
        maxWidth: 400,
        zIndex: 1000,
        backgroundColor: '#4070ff',
        color: '#fff',
        

             
        
    },

    
  }));


const Landing = () => {
    const navigate = useHistory();
    const classes = useStyles(); 
    
    return (
        <Paper className={classes.main}>
            <Typography variant="h3" gutterBottom>
                Dogsbook
            </Typography>
            <Typography variant="body1" gutterBottom>
                A Simple but Awesome Page Application about them!
            </Typography>
            <Button  variant="contained" size="medium" elevation={6} className={classes.btn} onClick={()=> navigate.push('/dogs')} >WELCOME</Button>
            {/* <img className={classes.image} src='media/landing.png' alt='landing' /> */}
        </Paper>
    )
}
export default Landing;