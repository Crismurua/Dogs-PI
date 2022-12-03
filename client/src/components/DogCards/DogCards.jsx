import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DogCard from "../DogCard/DogCard";
import { Link } from "react-router-dom";
import { getDogs } from "../../Redux/action/index";

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/core/Icon';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';



const options = ['ALL', 'DATABASE', 'API'];

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

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
  
    const handleClick = () => {
      console.info(`You clicked ${options[selectedIndex]}`);
    };
    
    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
      };
    
      const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
      };
    
      const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
          return;
        }
    
        setOpen(false);
      };


     const classes = useStyles(); 

    return (
        <div className={classes.root}>
           <br></br> 

            <Grid container direction="column" alignItems="center">
                    <Grid item xs={12}>
                    <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
                        <Button onClick={handleClick}>{options[selectedIndex]}</Button>
                        <Button
                        color="primary"
                        size="small"
                        aria-controls={open ? 'split-button-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-label="select merge strategy"
                        aria-haspopup="menu"
                        onClick={handleToggle}
                    >
                        <ArrowDropDownIcon />
                    </Button>
                    </ButtonGroup>
                    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                        >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                            <MenuList id="split-button-menu">
                                {options.map((option, index) => (
                                <MenuItem
                                    key={option}
                                    disabled={index === 2}
                                    selected={index === selectedIndex}
                                    onClick={(event) => handleMenuItemClick(event, index)}
                                >
                                    {option}
                                </MenuItem>
                                ))}
                            </MenuList>
                            </ClickAwayListener>
                        </Paper>
                        </Grow>
                    )}
                    </Popper>
                </Grid>
                </Grid>
                <br></br>
                 
                <Grid container spacing={1}
                direction="row"
                justifyContent="space-evenly"
                alignItems="stretch"
                
                >
            {
                dogs?.map(d => {
                    return (
                        <Link to={`/dogs/${d.id}`}>
                            <DogCard className="card" key={d.id}
                                id={d.id}
                                name={d.name}
                                img={d.img}
                                weight={d.weight}
                                temperament={d.temperament}
                                temperaments={d.temperaments}
                            />
                        </Link>
                    )
                }).slice(start, end)
            }
                </Grid>
              
                <Button onClick={handlePrev} disabled={page === 1 || !dogs.length ? true : false}>Prev</Button>
                <Button onClick={handleNext} disabled={page === dogs.length/12 || !dogs.length ? true : false}>Next</Button>
                
        </div>
    )
};

export default DogCards;
