import React, {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import {useForm} from "react-hook-form";
import ValidateWrapper from "../components/utils/ValidateWrapper";
import {useAppSelector} from "../store";
import {SelectToEndForPhoneInput} from "../helpers/SelectToEndForPhoneInput";
import {useUserAction} from '../store/slices/user/actions'

const Registration = () => {
    const {register, formState: {errors}, handleSubmit, getValues, setValue, setError} = useForm()
    const loginError = useAppSelector(state => state.user.loginError)
    const {registration, login} = useUserAction()
    const navigate = useNavigate()

    useEffect(()=>{
        if(loginError){
            loginError.indexOf('email')!==-1 && setError('email', {message:'Такой email уже занят'})
            login(null)
        }
    }, [loginError])

    const SubmitClick = ({repeatPassword, ...otherData}) => {
        registration(otherData).then(res=>{
            res && navigate('/account/profile')
        })
    }
    return (
        <main>
            <Container>
                <section className='py-4 py-md-5'>
                    <div className="d-flex align-items-baseline justify-content-center">
                        <h1>Регистрация</h1>
                        <span className='fs-20 mx-3'>/</span>
                        <h3><Link to='/login' className='link bb-dot'>Вход</Link></h3>
                    </div>
                    <form action="" className='form-login' onSubmit={handleSubmit(SubmitClick)}>
                        <ValidateWrapper error={errors?.firstName}>
                            <input className='mb-3' type="text" placeholder='Имя'
                                   {...register('firstName', {
                                       required: 'Поле обязательно к заполнению',
                                       minLength: {value: 2, message: 'Минимум 2 символа'},
                                       pattern: {value: /^[A-Za-z-А-Яа-я]+$/i, message: "Для ввода допускаются только буквы"},
                                       maxLength: {value: 50, message: 'Максимум 50 символов',},
                                   })}
                            />
                        </ValidateWrapper>
                        <ValidateWrapper error={errors?.lastName}>
                            <input className='mb-3' type="text" placeholder='Фамилия'
                                   {...register('lastName', {
                                       required: 'Поле обязательно к заполнению',
                                       minLength: {value: 2, message: 'Минимум 2 символа'},
                                       pattern: {value: /^[A-Za-z-А-Яа-я]+$/i, message: "Для ввода допускаются только буквы"},
                                       maxLength: {value: 50, message: 'Максимум 50 символов',},
                                   })}
                            />
                        </ValidateWrapper>
                        <ValidateWrapper error={errors?.email}>
                            <input className='mb-3' type="email" placeholder='email'
                                   {...register('email', {
                                       required: 'Поле обязательно к заполнению',
                                   })}
                            />
                        </ValidateWrapper>

                        <ValidateWrapper error={errors?.phone}>
                            <input className='mb-3' type="tel" placeholder='+7 900 000 00 00'
                                   onClick={(e)=>{
                                       if(!getValues('phone') || getValues('phone').length===0)
                                           setValue('phone', '+7')
                                       SelectToEndForPhoneInput(e)
                                   }}

                                   {...register('phone', {
                                       required: 'Поле обязательно к заполнению',
                                       minLength: {value: 12, message: 'Минимальная длина 12 символов',},
                                       maxLength: {value: 12, message: 'Максимальная длина 12 символов',},
                                       pattern: {value: /\+[7][0-9]{10}/, message: 'Не верный формат',},
                                   })}
                            />
                        </ValidateWrapper>
                        <ValidateWrapper error={errors?.password}>
                            <input className='mb-3' type="password" placeholder='пароль'
                                   {...register('password', {
                                       minLength:{value:8, message:'Минимум 8 символов'},
                                       required: 'Поле обязательно к заполнению',
                                   })}
                            />
                        </ValidateWrapper>
                        <ValidateWrapper error={errors?.repeatPassword}>
                            <input className='mb-3' type="repeatPassword" placeholder='повторите пароль'
                                   {...register('repeatPassword', {
                                       required: 'Поле обязательно к заполнению',
                                       validate: value => value==getValues('password')?true:'пароли не совпадают'
                                   })}

                            />
                        </ValidateWrapper>
                        <input type='submit' className='btn-1 w-100' value={'Зарегистрироваться'}/>
                        <label className='mt-3'>
                            <input type="checkbox" defaultChecked={true}/>
                            <span className='color-main'>Я даю своё согласие на обработку персональных данных</span>
                        </label>
                    </form>
                </section>
            </Container>
        </main>
    );
};

export default Registration;