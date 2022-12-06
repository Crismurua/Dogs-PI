import React from "react";
import { Link, useHistory } from "react-router-dom";



const Landing = () => {
    const navigate = useHistory();
    return (
        <div className="landing">
            <button  className="enter" onClick={()=> navigate.push('/dogs')}>WELCOME</button>
            {/* <img src="media/pokemon-logo.png" className="land-logo" alt="logo" />
            <img src="media/landing.png" className="wall" alt="pokeball" /> */}

        </div>
    )
}
export default Landing;