import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DogCard from "../DogCard/DogCard";
import { getDogs, filterOrigin, getTemperaments, filterTemps, orderName, orderWeight } from "../../Redux/action/index";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';





const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(3),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      
    },
    filters: {
        width: '90vw',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
  }));
  


 function DogCards(){
    const dispatch = useDispatch();
    const dogs = useSelector(state => state.dogs)
    const temps = useSelector(state => state.temperaments)
    const [page, setPage] = React.useState(1);
    
    React.useEffect(() => {
        dispatch(getDogs())
        dispatch(getTemperaments())
        setPage(1)
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
    //FILTER & ODER---------------------------

   
    const handleOrigin = (e) => {
        dispatch(filterOrigin(e.target.value))
    }

    const filterTemp = (e) => {     
        dispatch(filterTemps(e.target.value))
    }

    const handleName = (e) => {     
        dispatch(orderName(e.target.value))
    }

    const handleWeight = (e) => {     
        dispatch(orderWeight(e.target.value))
    }


     const classes = useStyles(); 

    return (
        <div className={classes.root}>
           <br></br>
           <Box className={classes.filters} sx={{ minWidth: 150 }}>
            <FormControl >
                <InputLabel id="demo-simple-select-label">Origin</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={'all'}
                label="Origin"
                onChange={handleOrigin}
                >
                <MenuItem value={'database'}>Data Base</MenuItem>
                <MenuItem value={'api'}>Api</MenuItem>
                <MenuItem value={'all'}>All</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="demo-simple-select-label">Temperament</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={'temperament'}
                label="Temperament"
                onChange={filterTemp}
                >
                    <MenuItem value={'all'}>All</MenuItem>
                    {temps?.map(t => {
                        return (

                            <MenuItem value={t.name}>{t.name}</MenuItem>
                            
                        )
                    })}
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="demo-simple-select-label">Alphabetic</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={'alphabetic'}
                label="Alphabetic"
                onChange={handleName}
                >
                
                    <MenuItem value={'a-z'}>A-Z</MenuItem>
                    <MenuItem value={'z-a'}>Z-A</MenuItem>
                    
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="demo-simple-select-label">Weight</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={'weight'}
                label="Weight"
                onChange={handleWeight}
                >
                    
                    <MenuItem value={'heavy'}>Heavy</MenuItem>
                    <MenuItem value={'light'}>Light</MenuItem>
                </Select>
            </FormControl>
            </Box> 
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
