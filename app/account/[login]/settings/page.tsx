'use client'

import { useState } from 'react';
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
                            <label className={styles.label}>Новый пароль</label>
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
    const [ state, setState ] = useState();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const updateEndDate = (newEndDate) => {
        if (newEndDate >= startDate) {
            setEndDate(newEndDate);
        } else {
            alert('Конец периода не может быть раньше начала периода.');
        }
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
                            <input className='input' type='email' placeholder='mymail@mail.ru'/>
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>Номер телефона</label>
                            <input className='input' type='tel' placeholder='+7-(9xx)-xxx-xx-xx'/>
                        </div>
                    </div>
                    <div className={styles.checkboxContainer}>
                        <input className={styles.checkbox} type='checkbox'/>
                        <label className={styles.labelCheckbox}>Показывать почту в профиле</label>
                    </div>
                    <div className={styles.checkboxContainer}>
                        <input className={styles.checkbox} type='checkbox'/>
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
                            <input className='input' type='text' placeholder='Иван'/>
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>Фамилия</label>
                            <input className='input' type='text' placeholder='Иванов'/>
                        </div>
                    </div>
                    <div className={styles.topContainer}>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>Отчество</label>
                            <input className='input' type='email' placeholder='Иванович'/>
                        </div>
                    </div>
                    <div className={styles.checkboxContainer}>
                        <input className={styles.checkbox} type='checkbox'/>
                        <label className={styles.labelCheckbox}>Отчество отсутствует</label>
                    </div>
                    <div className='dividerThin'></div>
                    <div className={styles.bottomContainer}>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>Регион</label>
                            <StateSelect
                                countryid={COUNTRY_ID}
                                onChange={(e: any) => {
                                    setState(e.id);
                                }}
                                placeHolder="Выберите из списка"
                            />
                        </div>
                    </div>
                    <div className={styles.bottomContainer}>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>Город</label>
                            <CitySelect 
                                className={styles.select}
                                countryid={182}
                                stateid={state}
                                placeholder="Выберите из списка"
                            />
                        </div>
                    </div>
                    <div className='dividerThin'></div>
                    <label className={styles.label}>Социальные сети</label>
                    <div className={styles.topContainer}>
                        <div className={styles.inputContainer}>
                            <input className='input' type='text' placeholder='Телеграм'/>
                        </div>
                        <div className={styles.inputContainer}>
                            <input className='input' type='text' placeholder='Ссылка на ВКонтакте'/>
                        </div>
                    </div>
                    <div className={styles.checkboxContainer}>
                        <input className={styles.checkbox} type='checkbox'/>
                        <label className={styles.labelCheckbox}>Показывать соц. сети в профиле</label>
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
                        <button className={cn(styles.submit, 'submitButton')} type='submit'>Сохранить</button>
                    </Link> 
                </form>
            </div>
            <div className={styles.backgroundContainer}>
                <Image className={styles.backgroundImage} src={dogImage} alt='Dog image'/>
            </div>
        </div>
    </>)
}
