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
    
        checkbox: {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignContent: 'center',
                width: '70vw',
                flexWrap: 'wrap'               
        },
        checkItem: {
            display: 'flex',
            flexDirection: 'row',    
        },
        img: {
                maxHeight: 300,
                maxWidth: 400,
                marginTop: 20,
                float: 'right'
                
        }
      }));

const CreateDog = () => {

        const classes = useStyles();

    const initialState = {
        name: "",
        breed_group: "",
        weight: "",
        height: "",
        life_span: "",
        origin: "",
        temperaments: []
    };

    const dispatch = useDispatch();
    const [input, setInput] = React.useState(initialState);
    const [file, setFile] = React.useState(null);
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
        const formdata = new FormData();
                formdata.append('image', file)
                fetch('http://localhost:3001', {
                        method: 'POST',
                        body: formdata
                }).then(res => res.text())
                console.log(file)
        dispatch(createDog(input));
        setInput(initialState);
        setFile(null)
        alert('Dog succesfully created!')
        navigate.push('/dogs')
    };

    const handleChange = (e) => {
        e.preventDefault();

        setError(validate({...input, [e.target.name] : e.target.value}))
        setInput({...input, [e.target.name] : e.target.value})
        
    };

    const handleImage = (e) => {
        setFile(e.target.files[0])
    }

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
        <div className={classes.main}>
            <Button onClick={() => navigate.push('/dogs')}><BsFillArrowLeftCircleFill /></Button>
            <form encType="multipart/form-data" className={classes.root} onSubmit={(e) => handleOnSubmit(e)}>
            <img src={file ? file : '/media/fila-brasilero.jpg'} className={classes.img} alt={input.name} />
                
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
                        type="file"
                        onChange={handleImage}
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
                <div className={classes.checkbox}>
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
                                        <div className={classes.checkItem}>
                                        <FormLabel component="legend">{temp.name}</FormLabel>
                                        <Checkbox
                                        value={temp.id}
                                        inputProps={{ 'title': temp.name }}
                                        name="temperaments"
                                        onChange={handleTemps}
                                        color="default"
                                      />
                                      </div>
                                )
                        })
                }
                </div>
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