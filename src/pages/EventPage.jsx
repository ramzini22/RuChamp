import React, {useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import {Map, Placemark, YMaps} from '@pbe/react-yandex-maps'

import {FiAlertCircle, FiCheckCircle, FiClock, FiHelpCircle, FiMapPin, FiPlayCircle} from "react-icons/fi"
import {IoMail} from "react-icons/io5"
import FormSearch from '../components/FormSearch'
import Participant from '../components/utils/Participant'
import TournamentBracket from '../components/TournamentBracket'
import {useLocation, useParams} from "react-router-dom";
import {GetOneEvent} from "../services/event";
import {useAppAction} from "../store";
import {SlSocialVkontakte} from "react-icons/sl";
import {BsInstagram} from "react-icons/bs";
import {TbBrandTelegram} from "react-icons/tb";
import {AiOutlineWhatsApp} from "react-icons/ai";
import {CiYoutube} from "react-icons/ci";
import {FaTiktok} from "react-icons/fa";
import {GetStringFromDate} from "../helpers/GetStringFromDate";
const EventPage = () => {

    const {state} = useLocation()
    const [event, setEvent] = useState()
    const {id} = useParams()
    const {setNotFound} = useAppAction()
    const [tab, setTab] = useState(1)
    const [show, setShow] = useState(false)

    useEffect(() => {
        GetOneEvent(id).then(res=>{
            if(res)
                setEvent(res)
            else
                setNotFound(true)
        })
    }, [])
    if (!event)
        return <main></main>

    if(event)
        return (
        <main>
            <Container>
                <section className='event-page py-4 py-md-5'>
                    <h1>{event?.name}</h1>
                    <div className="top">
                        <Row className='gx-0'>
                            <Col xs={12} lg={9}>
                                <img src={event?.imgUrl?event?.imgUrl:'../imgs/userDontsFind.jpg'} alt={event?.title}/>
                            </Col>
                            <Col xs={12} lg={3}>
                                <ul className='info'>
                                    <li>
                                        <FiClock className='green'/>
                                        <div>
                                            <p>Ранняя регистрация</p>
                                            <p>
                                                {GetStringFromDate(event?.earlyRegistrationFrom, event?.earlyRegistrationTo)}
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <FiCheckCircle className='yellow'/>
                                        <div>
                                            <p>Стандартная регистрация</p>
                                            <p>{GetStringFromDate(event?.standartRegistrationFrom, event?.standartRegistrationTo)}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <FiAlertCircle className='red'/>
                                        <div>
                                            <p>Поздняя регистрация</p>
                                            <p>{GetStringFromDate(event?.lateRegistrationFrom, event?.lateRegistrationTo)}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <FiPlayCircle className='color-4'/>
                                        <div>
                                            <p>Начало мероприятия</p>
                                            <p>{GetStringFromDate(event?.startsAt)}</p>
                                        </div>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                        <nav>
                            <ul>
                                <li>
                                    <button type='button' onClick={() => setTab(1)}>Информация</button>
                                </li>
                                <li>
                                    <button type='button' onClick={() => setTab(2)}>Участники</button>
                                </li>
                                <li>
                                    <button type='button' onClick={() => setTab(3)}>Турнирная таблица</button>
                                </li>
                                <li>
                                    <button type='button' onClick={() => setTab(4)}>Место проведения</button>
                                </li>
                            </ul>
                            <button type='button' className='btn-3'>
                                Принять участие
                            </button>
                        </nav>
                    </div>

                    {
                        (tab === 1) &&
                        <div className='text'>
                            <Row className='gx-4 gx-xl-5'>
                                <Col md={8}>
                                    <h2>Информация</h2>
                                    {event?.description}
                                </Col>
                                <Col md={4} className='mt-4 mt-md-0'>
                                    <ul className='list-unstyled list-15'>
                                        <li>
                                            <div className="card">
                                                <h5 className='card-title'>
                                                    <FiMapPin/>
                                                    <span>Место проведения</span>
                                                </h5>
                                                <div className='card-body'>
                                                    <address>{event?.venue}</address>
                                                </div>
                                                <YMaps query={{lang:"ru_RU"}}>
                                                    <Map style={{width: '100%', height: '350px'} }
                                                         defaultState={{center:[event?.latitude, event?.longitude], zoom: 13,}}>
                                                        <Placemark  geometry={[event?.latitude, event?.longitude]}
                                                        />
                                                    </Map>
                                                </YMaps>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="card">
                                                <h5 className='card-title'>
                                                    <FiHelpCircle/>
                                                    <span>Контакты</span>
                                                </h5>
                                                <div className='card-body'>
                                                    <ul className='list-unstyled list-10'>
                                                        {event?.emailLink &&
                                                            <li>
                                                                <a href={event?.emailLink} className='link'>
                                                                    <IoMail className='fs-12 me-2'/>
                                                                    <span>{event?.emailLink}</span>
                                                                </a>
                                                            </li>
                                                        }
                                                        {event?.vkLink &&
                                                            <li>
                                                                <a href={event?.vkLink} className='link'>
                                                                    <SlSocialVkontakte className='fs-12 me-2'/>
                                                                    <span>{event?.vkLink}</span>
                                                                </a>
                                                            </li>
                                                        }
                                                        {event?.youtubeLink &&
                                                            <li>
                                                                <a href={event?.youtubeLink} className='link'>
                                                                    <CiYoutube className='fs-12 me-2'/>
                                                                    <span>{event?.youtubeLink}</span>
                                                                </a>
                                                            </li>
                                                        }
                                                        {event?.instaLink &&
                                                            <li>
                                                                <a href={event?.instaLink} className='link'>
                                                                    <BsInstagram className='fs-12 me-2'/>
                                                                    <span>{event?.instaLink}</span>
                                                                </a>
                                                            </li>
                                                        }
                                                        {event?.telegramLink &&
                                                            <li>
                                                                <a href={event?.telegramLink} className='link'>
                                                                    <TbBrandTelegram className='fs-12 me-2'/>
                                                                    <span>{event?.telegramLink}</span>
                                                                </a>
                                                            </li>
                                                        }
                                                        {event?.whatsAppLink &&
                                                            <li>
                                                                <a href={event?.whatsAppLink} className='link'>
                                                                    <AiOutlineWhatsApp className='fs-12 me-2'/>
                                                                    <span>{event?.whatsAppLink}</span>
                                                                </a>
                                                            </li>
                                                        }
                                                        {event?.tictokLink &&
                                                            <li>
                                                                <a href={event?.tictokLink} className='link'>
                                                                    <FaTiktok className='fs-12 me-2'/>
                                                                    <span>{event?.tictokLink}</span>
                                                                </a>
                                                            </li>
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </Col>
                            </Row>
                        </div>
                    }
                    {
                        (tab === 2) &&
                        <div className='text'>
                            <h2>Участники</h2>
                            <FormSearch/>
                            <ul className='list-unstyled list-30 mt-5'>
                                <li>
                                    <h3>Категория 1</h3>
                                    <div className='participant head'>
                                        <div className='name'>Участник</div>
                                        <div className="birth">Год рождения</div>
                                        <ul className="params">
                                            <li>
                                                Название параметра
                                            </li>
                                            <li>
                                                Название параметра
                                            </li>
                                            <li>
                                                Название параметра
                                            </li>
                                            <li>
                                                Название параметра
                                            </li>
                                        </ul>
                                    </div>
                                    <ul className='list-unstyled row row-cols-1 row-cols-sm-2 row-cols-lg-1 g-2 g-sm-3 g-md-4 g-lg-2'>
                                        <li>
                                            <Participant
                                                approved={true}
                                                name={'Имя'}
                                                surname={'Фамилия'}
                                                town={'Город'}
                                                birth={'01.01.2001'}/>
                                        </li>
                                        <li>
                                            <Participant
                                                approved={true}
                                                name={'Имя'}
                                                surname={'Фамилия'}
                                                town={'Город'}
                                                birth={'01.01.2001'}/>
                                        </li>
                                        <li>
                                            <Participant
                                                approved={true}
                                                name={'Имя'}
                                                surname={'Фамилия'}
                                                town={'Город'}
                                                birth={'01.01.2001'}/>
                                        </li>
                                        <li>
                                            <Participant
                                                approved={true}
                                                name={'Имя'}
                                                surname={'Фамилия'}
                                                town={'Город'}
                                                birth={'01.01.2001'}/>
                                        </li>
                                        {
                                            (show) &&
                                            <li>
                                                <Participant
                                                    approved={false}
                                                    name={'Имя'}
                                                    surname={'Фамилия'}
                                                    town={'Город'}
                                                    birth={'01.01.2001'}/>
                                            </li>
                                        }
                                    </ul>
                                    <p>Подтвержденных регистраций: 4</p>
                                    <button type='button' className="link"
                                            onClick={() => setShow((show) ? false : true)}>{(show) ? 'Скрыть' : 'Показать'} неподтвержденные
                                        регистрации (1)
                                    </button>
                                </li>
                                <li>
                                    <h3>Категория 2</h3>
                                    <div className='participant head'>
                                        <div className='name'>Участник</div>
                                        <div className="birth">Год рождения</div>
                                        <ul className="params">
                                            <li>
                                                Название параметра
                                            </li>
                                            <li>
                                                Название параметра
                                            </li>
                                            <li>
                                                Название параметра
                                            </li>
                                            <li>
                                                Название параметра
                                            </li>
                                        </ul>
                                    </div>
                                    <ul className='list-unstyled row row-cols-1 row-cols-sm-2 row-cols-lg-1 g-2 g-sm-3 g-md-4 g-lg-2'>
                                        <li>
                                            <Participant
                                                approved={true}
                                                name={'Имя'}
                                                surname={'Фамилия'}
                                                town={'Город'}
                                                birth={'01.01.2001'}/>
                                        </li>
                                        <li>
                                            <Participant
                                                approved={true}
                                                name={'Имя'}
                                                surname={'Фамилия'}
                                                town={'Город'}
                                                birth={'01.01.2001'}/>
                                        </li>
                                        <li>
                                            <Participant
                                                approved={true}
                                                name={'Имя'}
                                                surname={'Фамилия'}
                                                town={'Город'}
                                                birth={'01.01.2001'}/>
                                        </li>
                                        <li>
                                            <Participant
                                                approved={true}
                                                name={'Имя'}
                                                surname={'Фамилия'}
                                                town={'Город'}
                                                birth={'01.01.2001'}/>
                                        </li>
                                    </ul>
                                    <p>Подтвержденных регистраций: 4</p>
                                    <button type='button' className="link">Показать неподтвержденные регистрации (1)
                                    </button>
                                </li>
                            </ul>
                        </div>
                    }
                    {
                        (tab === 3) &&
                        <div className='text'>
                            <h2>Турнирная таблица</h2>
                            <TournamentBracket/>
                        </div>
                    }
                    {
                        (tab === 4) &&
                        <div className='text'>
                            <h2>Место проведения</h2>
                            <address className='fs-15 mb-3'>{event?.venue}</address>
                            <YMaps>
                                <Map style={{width: '100%', height: '350px'}}
                                     defaultState={{center:[event?.latitude, event?.longitude], zoom: 13,}}>
                                    <Placemark  geometry={[event?.latitude, event?.longitude]} />
                                </Map>
                            </YMaps>
                        </div>
                    }
                </section>

            </Container>

        </main>
    )
}

export default EventPage