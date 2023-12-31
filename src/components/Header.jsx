import React, {useState} from 'react'
import {Link, NavLink} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Offcanvas from 'react-bootstrap/Offcanvas'
import logo from '../assets/imgs/logo-colored.png'
import {RiCloseLine, RiMenuLine} from "react-icons/ri"
import FormSearch from './FormSearch'
import {useAppSelector} from "../store";

const Header = () => {
    const [show, setShow] = useState(false)
    const {auth} = useAppSelector(state => state.user)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    return (
        <>
            <header>
                <Container>
                    <Link to='/'><img src={logo} alt="logo" className='logo'/></Link>

                    <FormSearch className={'d-none d-md-flex'}/>

                    <Offcanvas show={show} onHide={handleClose} responsive="lg">
                        <button type='button' className='close d-lg-none' onClick={handleClose}>
                            <RiCloseLine/>
                        </button>
                        <Offcanvas.Body>
                            <nav className='mobile-menu' onClick={handleClose}>
                                <ul>
                                    <li>
                                        <NavLink to="/">Главная</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/commands">Команды</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/about" className={'text-nowrap'}>О нас</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/all-news">Блог</NavLink>
                                    </li>
                                    <li>
                                        <a onClick={(e) => e.preventDefault()}>
                                            <div
                                                style={{fontSize:'1em'}}
                                                onClick={() => window.open('https://www.alfastrah.ru/individuals/life/protection-family/calc/?tag=ruchamp&utm_source=ruchamp_ru&utm_medium=cpa&utm_campaign=partner_link&utm_content=protection-family')}>
                                                Страхование
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <NavLink to={`${auth ? '/account/profile' : '/login'}`}>Личный кабинет</NavLink>
                                    </li>
                                </ul>
                            </nav>
                        </Offcanvas.Body>
                    </Offcanvas>

                    <button type='button' onClick={handleShow} className='fs-20 color-main d-lg-none'>
                        <RiMenuLine/>
                    </button>
                </Container>
            </header>
        </>
    );
};

export default Header