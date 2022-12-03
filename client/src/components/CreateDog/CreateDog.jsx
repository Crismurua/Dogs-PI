import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDog, getTemperaments } from "../../Redux/action";
import { useHistory } from "react-router-dom";
import {BsFillArrowLeftCircleFill} from 'react-icons/bs';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";
import {Checkbox} from "@material-ui/core";
import {FormLabel} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
        root: {
          '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
            display: 'flex',
            flexDirection: 'row', 
          },
        },
        checkbox: {
                display: 'flex',
                marginLeft: 0,
                
                float:"right",
                maxWidth: 300,
                flexDirection: 'row',
                alignItems: 'center'   
        },
        btn: {
                
                flexDirection: 'row'

        }
      }));

const CreateDog = () => {

        const classes = useStyles();

    const initialState = {
        name: "",
        img: "",
        breed_group: "",
        weight: "",
        height: "",
        life_span: "",
        origin: "",
        temperaments: []
    };

    const dispatch = useDispatch();
    const [input, setInput] = React.useState(initialState);
    const temperaments = useSelector(state => state.temperaments);
    const navigate = useHistory();
    
    const [error, setError] = React.useState({});

     React.useEffect(() => { 
        dispatch(getTemperaments())    
     }, [dispatch]);


    
    React.useEffect(() => {
        setInput(prev => ({ ...prev, [input.name]: input.value}))
    }, [input.name, input.value]);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(createDog(input));
        setInput(initialState);
        alert('Dog succesfully created!')
        navigate.push('/dogs')
    };

    const handleChange = (e) => {
        e.preventDefault();
        setError(validate({...input, [e.target.name] : e.target.value}))
        setInput({...input, [e.target.name] : e.target.value})
    };

    const handleTemps = (e) => {
                
        if(!input.temperaments.includes(e.target.value)){
                setInput({...input, temperaments: [...input.temperaments, e.target.value]})
                
        }
        else{
                input.temperaments = input.temperaments.filter(temp => temp !== e.target.value)
                setInput({...input, temperaments: input.temperaments})
        }
       
        console.warn(e.target.value)
}


    return (
        <div>
            <button onClick={() => navigate.push('/dogs')}><BsFillArrowLeftCircleFill /></button>

            <form enctype="multipart/form-data" className={classes.root} onSubmit={(e) => handleOnSubmit(e)}>
                
                
                <TextField 
                        required id="standard-required" 
                        label="Name"
                        name="name"
                        value={input.name}
                        onChange={handleChange}
                        />
                
                <TextField 
                        label="Image"
                        type="file"
                        name="img"
                        value={input.img}
                        onChange={handleChange}
                        />
                
                <TextField 
                        required id="standard-required" 
                        label="Breed Group"
                        name="breed_group"
                        value={input.breed_group}
                        onChange={handleChange}
                        />
                
                
                <TextField 
                        required id="standard-required" 
                        label="Origin"
                        name="origin"
                        value={input.origin}
                        onChange={handleChange}
                        />

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
                
                <br></br>
                {
                        temperaments?.map(temp => {
                                return  (
                                        // <div className="temps-container">
                                        // <label className="form-temps">{temp.name}</label>
                                        // <input className="type-box" 
                                        //       type="checkbox"
                                        //       name="temperaments"
                                        //       value={temp.id}
                                        //       onChange={handleTemps}
                                        //       />  
                                        // </div>
                                        <div className={classes.checkbox}>
                                        <FormLabel component="legend">{temp.name}</FormLabel>
                                        <Checkbox
                                        value={temp.id}
                                        inputProps={{ 'title': temp.name }}
                                        name="temperaments"
                                        onChange={handleTemps}
                                      />
                                      </div>
                                )
                        })
                }
                
                { error.name && (<span className="danger">{error.name}</span>)}
                { error.temperaments && (<span className="danger">{error.types}</span>)}

                <Button type="submit" className={classes.btn} disabled={!input.name || !input.height || !input.weight || !input.temperaments.length ? true : false}>Create Dog!</Button>        
            </form>
        </div>
    )
};

const validate = input => {
    let error = {};
    if(!/^[A-Za-z\s]*$/.test(input.name))  error.name = "Name invalid!";
    if(!input.temperaments.length || input.temperaments.length>6) error.types = "Your Dog should have one temperament at least and six at most"
    return error
}

export default CreateDog;