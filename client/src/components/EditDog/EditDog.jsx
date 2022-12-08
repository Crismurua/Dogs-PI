import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {BsFillArrowLeftCircleFill, BsFillTrashFill} from 'react-icons/bs';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { getTemperaments } from "../../Redux/action";

const useStyles = makeStyles((theme) => ({
    main: {
            height:'100vh',
            width: '100vw',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'no-wrap' 
           
    },
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '20vw',
        display: 'flex',
        flexDirection: 'row'

      },
    },


    img: {
            maxHeight: 300,
            maxWidth: 400,
            marginTop: 20,
            float: 'right'
            
    },
    btn: {
            background: '#4070ff',
            maxHeight:60,
            marginLeft: 350,
            fontSize: 60,
            color: '#fff',
            
    },
    back: {
            maxHeight:60,
            marginLeft: -50,
            fontSize: 60,
            color: '#888'
    },
    temps: {
            position: 'relative'
    }
  }));


const EditDog = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const detail = useSelector(state => state.dogDetail);
    const [input, setInput] = React.useState(detail);
    const temperaments = useSelector(state => state.temperaments)
    const navigate = useHistory();
    const [alert, setAlert] = React.useState(false);

    React.useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])

    React.useEffect(() => {
        setInput(prev => ({ ...prev, [input.name]: input.value}))
    }, [input.name, input.value]);



    const handleChange = (e) => {
        e.preventDefault();
        setInput({...input, [e.target.name] : e.target.value})
        
    };

    const verifyImage = (url) => {
        new Promise((resolve) => {
            const image = new Image();
            image.src = url;
            image.onload = () => resolve(setInput({ ...input, img: url }));
            image.onerror = () => resolve(delete input.img);
        });
    }

    function handleSelectTemperament(option) {
        setInput({
            ...input,
            temperaments: input.temperaments.includes(option)
                ? input.temperaments
                : [...input.temperaments, option],
        });
        console.log(input)
    }
    function handleDeleteTemperament(id) {
        setInput({
            ...input,
            temperaments: input.temperaments.filter((t) => t.id !== parseInt(id)),
        });
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        fetch(`https://dogs-pi-production-c755.up.railway.app/dogs/${detail.id}`,{
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
               },
            body: JSON.stringify(input)
        }).then(r=> {
            setInput(input);
        })        
        window.alert('Dog succesfully updated!')
        navigate.push('/dogs')
    };

    return (
        <div className={classes.main}>
            <Button className={classes.back} onClick={() => navigate.push('/dogs')}><BsFillArrowLeftCircleFill /></Button>
            <form encType="multipart/form-data" className={classes.root} onSubmit={(e) => handleOnSubmit(e)}>
            <img src={detail.img ? detail.img : input.img} className={classes.img} alt={input.name} />
            

                <div className={classes.input}>
                        <TextField 
                        required id="standard-required" 
                        label="Name"
                        name="name"
                        value={input.name}
                        onChange={handleChange}
                        />
                </div>
                
                <div className={classes.input}>
                        <TextField 
                        label="Image"
                        placeholder="https://url.com/image.jpg"
                        value={input.img}
                        required
                        onChange={(e) => {
                            verifyImage(e.target.value);
                        }}
                        type="text"
                        />
                </div>

                <div className={classes.input}>
                        <TextField 
                        required id="standard-required" 
                        label="Breed Group"
                        name="breed_group"
                        value={input.breed_group}
                        onChange={handleChange}
                        />
                </div>
                
                <div className={classes.input}>
                        <TextField 
                        required id="standard-required" 
                        label="Origin"
                        name="origin"
                        value={input.origin}
                        onChange={handleChange}
                        />
                </div>

                <div className={classes.input}>
                        <TextField
                        id="filled-number"
                        label="Life Span"
                        type="number"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        variant="filled"
                        name="life_span"
                        value={input.life_span}
                        onChange={handleChange}
                        
                        />
                </div>

                <div className={classes.input}>
                        <TextField
                        id="filled-number"
                        label="height"
                        type="number"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        variant="filled"
                        name="height"
                        value={input.height}
                        onChange={handleChange}
                        
                        />
                </div>
                                
                <div className={classes.input}>
                        <TextField
                        id="filled-number"
                        label="Weight"
                        type="number"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        variant="filled"
                        name="weight"
                        value={input.weight}
                        onChange={handleChange}
                        
                        />


                </div>
                
                <br></br>
                
                                        <FormControl>
                                                <InputLabel id="demo-simple-select-label">Temperament</InputLabel>
                                                <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={input.temperaments}
                                                label="Temperament"
                                                onChange={(e) => {
                                                        handleSelectTemperament(e.target.value);
                                                        
                                                    }}
                                                >
                                                    
                                                    {temperaments?.map(t => {
                                                        return (

                                                        <MenuItem value={t.id}>{t.name}</MenuItem>
                            
                                                         )
                                                        })}
                                                </Select>
                                        </FormControl>

                <ul className={classes.temps}>
                {input.temperaments && input.temperaments.map(temp => {
                        return (<li key={temp.id}>
                                <button onClick={() => {
                                handleDeleteTemperament(temp.id)
                            }}>
                            <BsFillTrashFill />
                            </button>
                                {temp.name}
                      </li>)
                })}
                </ul>      


                <Button type="submit" className={classes.btn} disabled={!input.name || !input.height || !input.weight || !input.temperaments.length ? true : false}>Update Dog!</Button>        
            </form>
        </div>
    )
};

export default EditDog;
