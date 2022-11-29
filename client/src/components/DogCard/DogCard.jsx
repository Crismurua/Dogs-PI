import React from "react";

const DogCard = (props) => {
    return (
        <div className="dogcard" key={props.id}>
            {props.id <= 264 ? <span className="id">#{props.id}</span> : <span className="id">#DB</span>}
            <img key={props.id} src={props.img} className="img" alt={props.name} />
            <h4 className="name">{props.name}</h4>
            <h5>{props.weight} Kg</h5>
            <div className="temperaments">
                {Array.isArray(props.temperaments)  ? props.temperaments?.map(t => {return <span className="temps">{t.name}</span>}) : () => <span>{props.temperaments}</span>}
            </div>
        </div>
    )
};

export default DogCard;