import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { GiDogHouse } from "react-icons/gi";
import { BiDownArrow } from "react-icons/bi";
import { FaDog } from "react-icons/fa";
import "./Nav.css";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getName, getDetail } from "../../Redux/action";


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
                <div >
                      <div >
                        {input &&
                          findResults.map((d) => {
                            return (
                              <div
                                onClick={() => {
                                  handleClick(d.id);
                                }}
                                
                              >
                                <img  src={d.image} alt="" />
                                <p>{d.name}</p>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                </div>
                <button><BiDownArrow /></button>
            <Link to='/create'>NEW DOG! <FaDog /></Link>
        </div>
    )
}

export default Nav;