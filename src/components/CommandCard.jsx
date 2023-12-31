import React from 'react';
import {Link} from "react-router-dom";
import {checkPhotoPath} from "../helpers/checkPhotoPath";

const CommandCard = (state) => {
    const {id, image, name, _count:{participants}} = state
    return (
        <figure className='event'>
            <Link to={`/commands/${id}`} state={state}>
                <img
                    src={checkPhotoPath(image)} alt={name}
                />
            </Link>
            <figcaption>
                <h4><Link to={`/commands/${id}`} state={state}>{name}</Link></h4>
                <div className="time">
                    <div>Кол-во участников: {participants || '0'}</div>
                </div>
            </figcaption>
        </figure>
    );
};

export default CommandCard;