import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DogCard from "../DogCard/DogCard";
import { getDogs } from "../../Redux/action/index";

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';





const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(3),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      
    },
  }));
  


 function DogCards(){
    const dispatch = useDispatch();
    const dogs = useSelector(state => state.dogs)
    const [page, setPage] = React.useState(1);
    
    React.useEffect(() => {
        dispatch(getDogs())
    }, [dispatch, page]);

    
    // PAGINADO -----------------------------------
    
    const handleNext = (value) => {
        setPage(page+1)
        window.scrollTo(0, 0);
    };

    const handlePrev = () => {
        setPage(page-1)
        window.scrollTo(0, 0);
    };


    let start = (page - 1) * 12;
    let end = start + 12;
    if (end > dogs) end = dogs;
    if (start < 0) start = 0;

    //------------------------------------------
  

     const classes = useStyles(); 

    return (
        <div className={classes.root}>
           <br></br> 
           <Button onClick={handlePrev} disabled={page === 1 || !dogs.length ? true : false}>Prev</Button>
                <Button onClick={handleNext} disabled={page === dogs.length/12 || !dogs.length ? true : false}>Next</Button>
                
            
                 
                <Grid container spacing={1}
                direction="row"
                justifyContent="space-evenly"
                alignItems="stretch"
                
                >
            {   
                dogs.length ?
                dogs?.map(d => {
                    return (
                        
                            <DogCard className="card" key={d.id}
                                id={d.id}
                                name={d.name}
                                img={d.img}
                                weight={d.weight}
                                temperament={d.temperament}
                                temperaments={d.temperaments}
                            />
                            
                        
                    )
                }).slice(start, end)
                :
                            <CircularProgress />
            }
                </Grid>
              
                <Button onClick={handlePrev} disabled={page === 1 || !dogs.length ? true : false}>Prev</Button>
                <Button onClick={handleNext} disabled={page === dogs.length/12 || !dogs.length ? true : false}>Next</Button>
                
        </div>
    )
};

export default DogCards;
