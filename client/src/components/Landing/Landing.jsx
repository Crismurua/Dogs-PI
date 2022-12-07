import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    main: {
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyItems: 'center',
        alignItems: 'center'

        
    },
    image: {
        position: 'relative',
      width: '100vw',
      height: 'auto',
      margin:0,
      top:84
      
    },
    btn: {
        position: 'relative',
        maxHeight: 50,
        maxWidth: 400,
        left: 590,
        zIndex: 1000,
        backgroundColor: '#4070ff',
        color: '#fff',

             
        
    },

    
  }));


const Landing = () => {
    const navigate = useHistory();
    const classes = useStyles(); 
    
    return (
        <div className={classes.main}>
            <Button  variant="contained" size="medium" className={classes.btn} onClick={()=> navigate.push('/dogs')} >WELCOME</Button>            {/* <img src="media/pokemon-logo.png" className="land-logo" alt="logo" />
            <img src="media/landing.png" className="wall" alt="pokeball" /> */}
            <img className={classes.image} src='media/landing.png' alt='landing' />
        </div>
    )
}
export default Landing;