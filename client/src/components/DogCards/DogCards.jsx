import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DogCard from "../DogCard/DogCard";
import { Link } from "react-router-dom";
import { getDogs } from "../../Redux/action/index";

 function DogCards(){
    const dispatch = useDispatch();
    const dogs = useSelector(state => state.dogs)
    
    React.useEffect(() => {
        dispatch(getDogs())
    }, [dispatch]);

    return (
        <div className="cards">
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
                })
            }
        </div>
    )
};

export default DogCards;
