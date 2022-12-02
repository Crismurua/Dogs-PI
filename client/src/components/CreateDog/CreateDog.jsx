import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDog, getTemperaments } from "../../Redux/action";
import { useHistory } from "react-router-dom";
import {BsFillArrowLeftCircleFill} from 'react-icons/bs';

const CreateDog = () => {

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

            <form enctype="multipart/form-data" onSubmit={(e) => handleOnSubmit(e)}>
                <div className="cont-form">
                <label>Name: </label>
                <input type="text"
                        name="name"
                        value={input.name}
                        onChange={handleChange}
                        />
                <label>IMG: </label>
                <input id="img" type="file"
                        name="img"
                        value={input.img}
                        onChange={handleChange}
                        />
                <label>BREED GROUP: </label>
                <input type="number"
                        min="10"
                        max="100"
                        name="hp"
                        value={input.hp}
                        onChange={handleChange}
                        />
                <label>LIFE SPAN: </label>
                <input type="number"
                        min="10"
                        max="100"
                        name="attack"
                        value={input.attack}
                        onChange={handleChange}
                        />
                <label>ORIGIN: </label>
                <input type="number"
                        min="10"
                        max="100"
                        name="defense"
                        value={input.defense}
                        onChange={handleChange}
                        />
                <label>HEIGHT: </label>
                <input type="number"
                        min="10"
                        max="100"
                        name="height"
                        value={input.height}
                        onChange={handleChange}
                        />
                <label>WEIGHT: </label>
                <input type="number"
                        min="10"
                        max="100"
                        name="weight"
                        value={input.weight}
                        onChange={handleChange}
                        />
                <label>TEMPERAMENTS: </label>
                <br></br>
                {
                        temperaments?.map(temp => {
                                return  (
                                        <div className="temps-container">
                                        <label className="form-temps">{temp.name}</label>
                                        <input className="type-box" 
                                              type="checkbox"
                                              name="temperaments"
                                              value={temp.id}
                                              onChange={handleTemps}
                                              />  
                                        </div>
                                )
                        })
                }
                </div>
                { error.name && (<span className="danger">{error.name}</span>)}
                { error.temperaments && (<span className="danger">{error.types}</span>)}

                <button type="submit" className="create-button" disabled={!input.name || !input.height || !input.weight || !input.temperaments.length ? true : false}>Create Dog!</button>        
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