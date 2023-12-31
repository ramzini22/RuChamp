import React, {useEffect, useState} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Select from 'react-select';
import {useController, useForm} from 'react-hook-form'
import {useAppSelector} from "../../store";
import ValidateWrapper from "../../components/utils/ValidateWrapper";
import {SelectToEndForPhoneInput} from "../../helpers/SelectToEndForPhoneInput";
import {useUserAction} from "../../store/slices/user/actions";
import useAnchor from "../../hooks/useAnchor";
import {onImageHandler} from "../../helpers/onImageHandler";
import {useImageViewer} from '../../hooks/imageViewer'
import {checkPhotoPath} from "../../helpers/checkPhotoPath";
import Commands from "../../components/teams";
import {getCountOfUsers, useAppAction} from "../../store/slices/app/Action";
import CountOfUsers from "../../components/CountOFUsers/CountOfUsers";

const sexList = [
    {value: true, label: 'Мужской'},
    {value: false, label: 'Женский'},
];
const daysList = [
    {value: '1', label: '1'},
    {value: '2', label: '2'},
    {value: '3', label: '3'},
];
const monthsList = [
    {value: '1', label: '1'},
    {value: '2', label: '2'},
    {value: '3', label: '3'},
];
const yearsList = [
    {value: '2001', label: '2001'},
    {value: '2002', label: '2002'},
    {value: '2003', label: '2003'},
];

const Profile = () => {
    const isAdmin = useAppSelector(state => state?.app?.isAdmin)
    const {handleSubmit, register, formState: {errors}, setValue, clearErrors, getValues, control} = useForm()
    const {user} = useAppSelector(state => state.user)
    const {editMe} = useUserAction()
    const {field: {value: genderValue, onChange: genderOnChange, ...genderField}} = useController({
        name: 'gender',
        control,
        rules: {required: 'Выберите значение'}
    });
    const [myRef, executeScroll] = useAnchor()

    const [setImageToNull, setSetImageToNull] = useState(false)
    const [avatar, setAvatar] = useState(null)
    let photo = useImageViewer(avatar?.image)

    const SubmitUserClick = ({password, gender, birthDate, ...data}) => {
        let request = {...data, gender: gender?.value, birthDate: birthDate + 'T21:00:00.000Z'}
        const formData = new FormData()
        for (const key in request) {
            formData.append(key, request[key])
        }
        formData.append('image', avatar?.image)
        if (setImageToNull)
            formData.append('setImageToNull', true)
        editMe(formData)
        executeScroll()
    }
    useEffect(() => {
        setValue('firstName', user?.firstName)
        setValue('lastName', user?.lastName)
        setValue('patronymic', user?.patronymic)
        setValue('email', user?.email)
        setValue('phone', user?.phone)
        setValue('address', user?.address)
        setValue('city', user?.city)
        setValue('district', user?.district)
        setValue('region', user?.region)
        setValue('weight', user?.weight)
        setValue('birthDate', user?.birthDate?.slice(0, -14))
        setValue('height', user?.height)
        setValue('isPublicProfile', !user?.isPublicProfile)
        setValue('gender',
            user?.gender !== null ?
                sexList[user?.gender == true ? 0 : 1]
                : null
        )
    }, [user])

    const DelImage = () => {
        setAvatar(null)
        setSetImageToNull(true)
    }

    return (
        <section className='account-box' ref={myRef}>
            {isAdmin &&
                <CountOfUsers />
            }
            <h1>Личные данные</h1>
            <form onSubmit={handleSubmit(SubmitUserClick)}>
                <Row className={'mb-3'}>
                    <Col sm={8} md={6} xl={6}>
                        <img className={'img-profile w-100'}
                             src={avatar ? photo?.data_url : checkPhotoPath(setImageToNull ? '' : user?.image)}/>
                        <div className={'d-flex gap-2 mt-2'}>
                            <div className="file-upload">
                                <button className="btn-4">Загрузить фото</button>
                                <input type="file" onChange={(e) => {
                                    setSetImageToNull(false)
                                    onImageHandler(e, setAvatar, 'image')
                                }}/>
                            </div>
                            {
                                (photo || user?.image)
                                &&
                                <input type={'button'} onClick={DelImage} className={'btn-5'} value={'Удалить фото'}/>
                            }
                        </div>
                    </Col>
                    <Col className={'d-flex justify-content-center align-items-center py-3'}>
                        <div onClick={() => window.open('https://www.alfastrah.ru/individuals/life/protection-family/calc/?tag=ruchamp&utm_source=ruchamp_ru&utm_medium=cpa&utm_campaign=partner_link&utm_content=protection-family')}>
                            <button className="btn-4">Приобрести страховку</button>
                        </div>
                    </Col>
                </Row>
                <Row className='gx-4 gx-xxl-5'>
                    <Col md={6}>
                        <fieldset>
                            <legend className='mb-0'>Основная информация</legend>
                            <Row className='gx-4 gy-2 gy-sm-3 align-items-center'>
                                <Col md={3}>
                                    Имя
                                </Col>
                                <Col md={9}>
                                    <ValidateWrapper error={errors?.firstName}>
                                        <input className='mb-3' type="text" placeholder='Имя'
                                               {...register('firstName', {
                                                   required: 'Поле обязательно к заполнению',
                                                   minLength: {value: 2, message: 'Минимум 2 символа'},
                                                   pattern: {
                                                       value: /^[A-Za-z-А-Яа-я]+$/i,
                                                       message: "Для ввода допускаются только буквы"
                                                   },
                                                   maxLength: {value: 50, message: 'Максимум 50 символов',},
                                               })}
                                        />
                                    </ValidateWrapper>
                                </Col>
                                <Col md={3}>
                                    Фамилия
                                </Col>
                                <Col md={9}>
                                    <ValidateWrapper error={errors?.lastName}>
                                        <input className='mb-3' type="text" placeholder='Фамилия'
                                               {...register('lastName', {
                                                   required: 'Поле обязательно к заполнению',
                                                   minLength: {value: 2, message: 'Минимум 2 символа'},
                                                   pattern: {
                                                       value: /^[A-Za-z-А-Яа-я]+$/i,
                                                       message: "Для ввода допускаются только буквы"
                                                   },
                                                   maxLength: {value: 50, message: 'Максимум 50 символов',},
                                               })}
                                        />
                                    </ValidateWrapper>
                                </Col>
                                <Col md={3}>
                                    Отчество
                                </Col>
                                <Col md={9}>
                                    <ValidateWrapper error={errors?.patronymic}>
                                        <input className='mb-3' type="text" placeholder='Отчество'
                                               {...register('patronymic',
                                                   //     {
                                                   //     required: 'Поле обязательно к заполнению',
                                                   //     minLength: {value: 2, message: 'Минимум 2 символа'},
                                                   //     pattern: {
                                                   //         value: /^[A-Za-z-А-Яа-я]+$/i,
                                                   //         message: "Для ввода допускаются только буквы"
                                                   //     },
                                                   //     maxLength: {value: 50, message: 'Максимум 50 символов',},
                                                   // }
                                               )}
                                        />
                                    </ValidateWrapper>
                                </Col>
                                <Col md={3}>
                                    Пол
                                </Col>
                                <Col md={9}>
                                    <ValidateWrapper error={errors?.gender}>
                                        <Select
                                            name="gender"
                                            placeholder="Пол"
                                            classNamePrefix="simple-select"
                                            className="simple-select-container borderless w-100 validate-select"
                                            value={genderValue}
                                            onChange={option => genderOnChange(option)}
                                            options={sexList}
                                            {...genderField}
                                        />
                                    </ValidateWrapper>
                                </Col>
                            </Row>
                        </fieldset>
                    </Col>
                    <Col md={6}>
                        <fieldset>
                            <legend className='mb-0'>Настройки аккаунта</legend>
                            <Row className='gx-4 gy-2 gy-sm-3 align-items-center'>
                                <Col md={3}>
                                    Email
                                </Col>
                                <Col md={9}>
                                    <input type="email" placeholder='Email'
                                           {...register('email', {
                                               required: 'Выберите значение!',
                                           })}
                                    />
                                </Col>
                                <Col md={3}>
                                    Пароль
                                </Col>
                                <Col md={9}>
                                    <input type="password" placeholder='Пароль' autoComplete="new-password"
                                           {...register('password', {})}
                                    />
                                </Col>
                            </Row>
                            <label className='mt-3'>
                                <input type="checkbox"
                                       {...register('isPublicProfile', {})}
                                />
                                <span>Скрыть профиль</span>
                            </label>
                            <p className='fs-08 achromat-3 mt-2'>Этот параметр скрывает вашу общедоступную страницу
                                профиля, однако ваше имя по-прежнему будет отображаться в списке результатов
                                мероприятий, в которых вы участвовали.</p>
                        </fieldset>
                    </Col>
                    <Col xs={12} xl={6}>
                        <fieldset>
                            <legend className='mb-0'>Ваши параметры</legend>
                            <Row className='gx-4 gy-2 gy-sm-3 align-items-center'>
                                <Col md={3}>
                                    Дата рождения
                                </Col>
                                <Col md={9}>
                                    <ValidateWrapper error={errors?.birthDate}>
                                        <input type="date"
                                               className='mb-3'
                                               placeholder='Дата рождения'
                                               {...register('birthDate',)}
                                        />
                                    </ValidateWrapper>
                                </Col>
                                <Col md={3}>
                                    Рост, см.
                                </Col>
                                <Col md={9}>
                                    <ValidateWrapper error={errors?.height}>
                                        <input type="text" placeholder='Рост'
                                               {...register('height', {
                                                   valueAsNumber: true,
                                                   required: 'Поле обязательно к заполнению'
                                               })}
                                        />
                                    </ValidateWrapper>
                                </Col>
                                <Col md={3}>
                                    Вес, кг.
                                </Col>
                                <Col md={9}>
                                    <ValidateWrapper error={errors?.weight}>
                                        <input type="text" placeholder='Вес'
                                               {...register('weight', {
                                                   required: 'Поле обязательно к заполнению',
                                                   valueAsNumber: true
                                               })}
                                        />
                                    </ValidateWrapper>
                                </Col>
                            </Row>
                        </fieldset>
                    </Col>
                    <Col md={6}>
                        <Commands />
                    </Col>
                    <Col xs={12} xl={6}>
                        <fieldset>
                            <legend className='mb-0'>Контакты</legend>
                            <Row className='gx-4 gy-2 gy-sm-3 align-items-center'>
                                <Col md={3}>
                                    Телефон
                                </Col>
                                <Col md={9}>
                                    <ValidateWrapper error={errors?.phone}>
                                        <input className='mb-3' type="tel" placeholder='+7 900 000 00 00'
                                               onClick={(e) => {
                                                   if (!getValues('phone') || getValues('phone').length === 0)
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
                                </Col>
                                <Col md={3}>
                                    Адрес
                                </Col>
                                <Col md={9}>
                                    <ValidateWrapper error={errors?.address}>
                                        <input type="text" placeholder='Адрес'
                                               {...register('address')}
                                        />
                                    </ValidateWrapper>

                                </Col>
                                <Col md={3}>
                                    Город
                                </Col>
                                <Col md={9}>
                                    <ValidateWrapper error={errors?.city}>
                                        <input type="text" placeholder='Город'
                                               {...register('city')}
                                        />
                                    </ValidateWrapper>
                                </Col>
                                <Col md={3}>
                                    Район
                                </Col>
                                <Col md={9}>
                                    <ValidateWrapper error={errors?.district}>
                                        <input type="text" placeholder='Район'
                                               {...register('district')}
                                        />
                                    </ValidateWrapper>

                                </Col>
                                <Col md={3}>
                                    Регион
                                </Col>
                                <Col md={9}>
                                    <ValidateWrapper error={errors?.region}>
                                        <input type="tel" placeholder='Регион'{...register('region')}/>
                                    </ValidateWrapper>
                                </Col>
                            </Row>
                        </fieldset>
                    </Col>
                </Row>
                <button type='submit' className='btn-1'>Сохранить</button>
            </form>
        </section>
    );
};

export default Profile;