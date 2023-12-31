import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {RiSearchEyeLine, RiEdit2Line, RiImageLine} from "react-icons/ri";
import {useAppSelector} from "../store";
import {GetStringFromDate} from "../helpers/GetStringFromDate";

const AccEventPreview = (props) => {
    const {name, role, id, userId, active, _count, startsAt} = props
    const participants = _count?.participants
    const idRegUser = useAppSelector(state => state.user.user.id)
    return (
        <div className='event-preview'>
            <div className='date'><span className='d-xl-none'>Дата: </span>{GetStringFromDate(startsAt)?.slice(0, 6)}</div>
            <div className='title'>{name}</div>
            <div className='role'>
                <span className='d-xl-none'>Статус: </span>
                {role}
            </div>
            <div className='count'><span className='d-xl-none'>Количество участников: </span>{participants}</div>
            <div className="btns">
                <Link to={`${id}`} className={(active && userId==idRegUser && userId!=undefined) ? '' : 'dis'} state={props}><RiEdit2Line/></Link>
                <Link to={`/event/${id}` } state={props}><RiSearchEyeLine/></Link>
            </div>
        </div>
    );
};

export default AccEventPreview;