import React, { useState } from 'react'
import useIsMobile from '../../hooks/isMobile'
import { FiChevronsDown } from "react-icons/fi"
import {checkPhotoPath} from "../../helpers/checkPhotoPath";
import Medals from "../Medals/Medals";

const Participant = (props) => {
  const {firstName, lastName, birthDate:birthDateFromServer, city, gender, weight, image, approved, silver, bronze, gold} = props
  const birthDate=
      birthDateFromServer?
          birthDateFromServer?.slice(8, 10)+'.'+birthDateFromServer?.slice(5, 7)+'.'+birthDateFromServer?.slice(0, 4)
          :''
  const {isMobile} = useIsMobile('991px')
  const [showParams, setShowParams] = useState(!isMobile)

  return (
    <div className={(approved)?'participant':'participant unapproved'}>
      <div className='name'>
        <img src={checkPhotoPath(image)} alt="replace" />
        <div>
          <h6>{firstName + ' ' + lastName}</h6>
          <div>{city}</div>
        </div>
      </div>
      <div className="birth">
        <span>{birthDate}</span>
        {
          (isMobile) &&
          <button type='button' className='d-flex fs-15 color-main' onClick={() => setShowParams((showParams)?false:true)}>
            <FiChevronsDown/>
          </button>
        }
      </div>
      <ul className={(showParams || !isMobile)?'params':'params closed'}>
        <li>
          <strong>Пол: </strong>
          <span>{gender?'мужской':'женский'}</span>
        </li>
        <li>
          <strong>Вес: </strong>
          {weight &&
              <span>{weight}</span>
          }
        </li>
        <li className={'d-flex align-items-center gap-1'}>
          <Medals {...{gold, silver, bronze}}>
            <strong>Медали: </strong>
          </Medals>
        </li>
      </ul>
    </div>
  )
}

export default Participant