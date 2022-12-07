import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { GiClawSlashes, GiDogHouse } from "react-icons/gi";
import { FaDog } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getName, getDetail } from "../../Redux/action";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { alpha , makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/core/Icon';
import { Button } from "@material-ui/core";
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/core/Icon';





const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      color: '#eee',
      
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'relative',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
    container: {
      display: "flex",
      justifyContent: 'space-between'
    }
  }));

const Nav = () => {
    const dogs = useSelector(state => state.dogs)
    const dispatch = useDispatch();
    const navigate = useHistory();
    const [input, setInput] = useState('');


    const handleInput = (e) => {
        setInput(e.target.value)
    }

    const handleName = (e) => {
        dispatch(getName(input))
    }

    const findResults = dogs
    .filter((d) => {
      
        return d.name.toLowerCase().includes(input.toLowerCase());
      
    })
    .slice(0, 5);

    function handleClick(id) {
        
        navigate.push(`dogs/${id}`);
        dispatch(getDetail(id));
        setInput("");
      }

    
    
    
      const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">

                           

                <Toolbar className={classes.container}>


                                                    
                            
                              
                            <div className={classes.search}>
                                <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                                value={input} 
                                onChange={handleInput}
                                
                                />
                                                               
                                
                                
                            </div>



                        

                        <Typography variant="h6" color="inherit">
                          <Button className={classes.menuButton} onClick={() => navigate.push('/create')}>NEW DOG! <FaDog /></Button>
                          <Button className={classes.menuButton} onClick={() => dispatch(getDogs())}><GiDogHouse /></Button>
                            
                        </Typography>
                     

                </Toolbar>

                
            </AppBar>

            

            {/* Searchbar result Real Time */}
            
                              <div >
                                {/* {input &&
                                  findResults.map((d) => {
                                    return (
                                      <div
                                        onClick={() => {
                                          handleClick(d.id);
                                        }}

                                      >
                                        <img  src={d.img} alt={d.name} />
                                        <p>{d.name}</p>
                                      </div>
                                    );
                                  })} */}

<div className={classes.root}>
      <ImageList rowHeight={180} className={classes.imageList}>
        {/* <ImageListItem key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">Searching...</ListSubheader>
        </ImageListItem> */}
        {input && findResults.map((item) => (
          <ImageListItem key={item.img}>
            <img src={item.img} alt={item.name} onClick={() => {
                                          handleClick(item.id);
                                        }}/>
            <ImageListItemBar
              title={item.name}
              actionIcon={
                <IconButton aria-label={`info about ${item.name}`} className={classes.icon}>
                  <InfoIcon onClick={() => {
                                          handleClick(item.id);
                                        }}/>
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
                              </div>
                            
        </div>
    )
}

export default Nav;