'use client'

import { use, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Tooltip from '@mui/material/Tooltip';
import QuestionIcon from '@mui/icons-material/QuestionMark';
import IconButton from '@mui/material/IconButton';
import arrowIcon from '@icons/arrow.svg';
import avatarIcon from '@icons/avatar.svg';
import vkIcon from '@icons/vk.svg';
import dogImage from '@images/dog.png';
import styles from './styles.module.css';
import cn from 'classnames';
import { IUser, useUpdateUserInfoMutation } from '@/app/redux/services/api';

const {
    CitySelect,
    CountrySelect,
    StateSelect,
} = require('react-country-state-city');

interface IPageProps{
    params: {
        login: string;
    }
}

const COUNTRY_ID = 182;

function Modal() {
    return (
        <form className={styles.modal}>
            <h1>Изменение пароля</h1>
            <div className={styles.inputContainerModal}>
                    <div className={styles.inputContainer}>
                        <div className={styles.inputContainer}>
                            <label className={styles.modaLabel}>Старый пароль</label>
                            <input className='input' type='password' required placeholder='***'/>
                        </div>
                    </div>
                    <div className={styles.inputContainer}>
                        <div className={styles.inputContainer}>
                            <label className={styles.modaLabel}>Новый пароль</label>
                            <input className='input' type='password' required placeholder='***'/>
                        </div>
                    </div>
            </div>
            <button className={cn("button", styles.modalButton)} type='submit'>Сохранить</button>
        </form>
    )
}

export default function Page({ params: { login } }: IPageProps) {
    const [ modalVisible, setModalVisible ] = useState(false)
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [showEmail, setShowEmail] = useState(false);
    const [showPhone, setShowPhone] = useState(false);
    const [vk, setVk] = useState('');
    const [tg, setTg] = useState('');

    const updateEndDate = (newEndDate: string) => {
        if (newEndDate >= startDate) {
            setEndDate(newEndDate);
        } else {
            alert('Конец периода не может быть раньше начала периода.');
        }
    };

    const [updateUserInfo, { isLoading }] = useUpdateUserInfoMutation();

    const handleSave = async () => {
        const userInfo: Partial<IUser> = {
            email,
            phone,
            emailVisibility: showEmail,
            phoneVisibility: showPhone,
            surname,
            name,
            middleName,
            tgUserName: tg,
            vkUserName: vk,
        };
        console.log(userInfo);

        try {
            await updateUserInfo(userInfo).unwrap();
            alert('Информация обновлена успешно!');
        } catch (error) {
            console.error('Ошибка обновления информации:', error);
            alert('Ошибка обновления информации. Пожалуйста, попробуйте снова.');
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
    const handleSurnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSurname(e.target.value);
    };
    const handleMiddlenameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMiddleName(e.target.value);
    };
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value);
    };
    const handleVkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVk(e.target.value);
    };
    const handleTgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTg(e.target.value);
    };

    return (<>
        <title>Настройки профиля - petdonor.ru</title>
        <div className={styles.container}>
            { modalVisible && <div className={styles.darkness} onClick={() => setModalVisible(false)}/> }
            { modalVisible && <Modal/> }
            <div className={styles.settingsContainer}>
                <div className={styles.headerContainer}>
                    <h1 className='header'>Настройка профиля</h1>
                    <div className={styles.subtitleContainer}>
                        <div className='divider'></div>
                    </div>
                </div>
                <form className={styles.formContainer}>
                    <div className={styles.topContainer}>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>Почта</label>
                            <input className='input' type='email' placeholder='mymail@mail.ru' value={email} onChange={handleEmailChange}/>
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>Номер телефона</label>
                            <input className='input' type='tel' placeholder='+7-(9xx)-xxx-xx-xx' value={phone} onChange={handlePhoneChange}/>
                        </div>
                    </div>
                    <div className={styles.checkboxContainer}>
                        <input className={styles.checkbox} type='checkbox' checked={showEmail} onChange={() => setShowEmail(!showEmail)}/>
                        <label className={styles.labelCheckbox}>Показывать почту в профиле</label>
                    </div>
                    <div className={styles.checkboxContainer}>
                        <input className={styles.checkbox} type='checkbox' checked={showPhone} onChange={() => setShowPhone(!showPhone)}/>
                        <label className={styles.labelCheckbox}>Показывать телефон в профиле</label>
                    </div>
                    <button
                        type='button'
                        className={cn('linkPink', styles.linkPink)}
                        onClick={(e) => {
                            e.preventDefault();
                            setModalVisible(true);
                        }}
                    >
                        Сменить пароль
                    </button>
                    <div className='dividerThin'></div>
                    <div className={styles.topContainer}>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>Аватар</label>
                            <button className={styles.avatar}>
                                <Image src={avatarIcon} alt='Avatar icon'/>
                            </button>
                        </div>
                    </div>
                    <div className={styles.topContainer}>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>Имя</label>
                            <input className='input' type='text' placeholder='Иван' value={name} onChange={handleNameChange}/>
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>Фамилия</label>
                            <input className='input' type='text' placeholder='Иванов' value={surname} onChange={handleSurnameChange}/>
                        </div>
                    </div>
                    <div className={styles.topContainer}>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>Отчество</label>
                            <input className='input' type='email' placeholder='Иванович' value={middleName} onChange={handleMiddlenameChange}/>
                        </div>
                    </div>
                    <div className='dividerThin'></div>
                    <div className={styles.bottomContainer}>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>Регион</label>
                            
                        </div>
                    </div>
                    <div className={styles.bottomContainer}>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>Город</label>

                        </div>
                    </div>
                    <div className='dividerThin'></div>
                    <label className={styles.label}>Социальные сети</label>
                    <div className={styles.topContainer}>
                        <div className={styles.inputContainer}>
                            <input className='input' type='text' placeholder='Телеграм' value={tg} onChange={handleTgChange}/>
                        </div>
                        <div className={styles.inputContainer}>
                            <input className='input' type='text' placeholder='Ссылка на ВКонтакте' value={vk} onChange={handleVkChange}/>
                        </div>
                    </div>
                    <div className='dividerThin'></div>
                    <div className={styles.labelContainer}>
                        <label className={styles.label}><strong>Период недоступности</strong></label>  
                        <Tooltip title="Если вы будете недоступны (например, уезжаете в отпуск). Добавьте период, когда вас не беспокоить">
                            <IconButton className={styles.questionMark}>
                                <QuestionIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div className={styles.topContainer}>
                        <div className={styles.inputContainer}>
                        <label className={styles.label}>Начало</label>
                        <input
                            className='input'
                            type='date'
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>Конец</label>
                            <input
                                className='input'
                                type='date'
                                value={endDate}
                                onChange={(e) => updateEndDate(e.target.value)}
                            />
                        </div>
                    </div>
                    <Link href={`/account/${login}`}>
                        <button className={cn(styles.submit, 'submitButton')} type='submit' onClick={handleSave} disabled={isLoading}>Сохранить</button>
                    </Link> 
                </form>
            </div>
            <div className={styles.backgroundContainer}>
                <Image className={styles.backgroundImage} src={dogImage} alt='Dog image'/>
            </div>
        </div>
    </>)
}
