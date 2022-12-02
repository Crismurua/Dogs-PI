import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiDogHouse } from "react-icons/gi";
import { BiDownArrow } from "react-icons/bi";
import { FaDog } from "react-icons/fa";
import "./Nav.css";
import { useDispatch } from "react-redux";
import { getDogs, getName } from "../../Redux/action";


const Nav = () => {

    const dispatch = useDispatch();
    const [input, setInput] = useState('');

    const handleInput = (e) => {
        setInput(e.target.value)
    }

    const handleName = (e) => {
        dispatch(getName(input))
    }

    return (
        <div className="nav-container">
            <button className="btn-home" onClick={() => dispatch(getDogs())}><GiDogHouse /></button>
                <div className="searchbar">
                <form className="parent" onSubmit={(e)=> {
                    e.preventDefault();
                    if(!input) alert('Name...?')
                    else{
                        handleName();
                        setInput('');
                        

                    }
                }}>
                    <input className="bar" value={input} onChange={handleInput} type="text" placeholder="Search Name..."/>
                    <input className="search" type="submit" value="Go!" />
                </form>
                <button><BiDownArrow /></button>
                </div>
            <Link to='/create'>NEW DOG! <FaDog /></Link>
        </div>
    )
}

export default Nav;