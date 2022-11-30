import React from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { getDetail } from "../../Redux/action";

const DogDetail = (props) => {
    const params = useParams(props);
    const dispatch = useDispatch();
    const detail = useSelector(state => state.dogDetail)

    React.useEffect(() => {
        dispatch(getDetail(params.id))
    }, [params.id, dispatch]);

    return (
        <div className="main-detail" key={detail.id}>
            {detail.id <= 264 ? <span className="id">#{detail.id}</span> : <span className="id">#DB</span>}
            <h2 className="name-detail">{detail.name}</h2>
            <h4>{detail.breed_group}</h4>
            <img className="img-detail" src={detail.img} alt={detail.name}/>
            <div className="stats">
                <ul>
                    <li>height: {detail.height}cm</li>
                    <li>weight: {detail.weight}kg</li>
                    <li>life span: {detail.life_span}</li>
                    <li>origin: {detail.origin}</li>
                </ul>
            </div>
            <div className="temperaments">
                <h5>Temperaments</h5>
                <span>{detail.temperament}</span>
                {detail.temperaments?.map(t => {
                    return <span>{t.name}</span>
                })}
            </div>
        </div>
    )

};

export default DogDetail;