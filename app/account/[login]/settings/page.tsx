'use client'

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import arrowIcon from '@icons/arrow.svg';
import avatarIcon from '@icons/avatar.svg';
import vkIcon from '@icons/vk.svg';
import tgIcon from '@icons/tg.svg';
import dogImage from '@images/dog.png';
import styles from './styles.module.css';
import cn from 'classnames';

import {
    CitySelect,
    CountrySelect,
    StateSelect,
} from 'react-country-state-city';


interface IPageProps{
    params: {
        login: string;
    }
}

const COUNTRY_ID = 182;

export default function Page({ params: { login } }: IPageProps) {
    
    const [ state, setState ] = useState();

    return (
        <div className={styles.container}>
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
                                onChange={(e) => {
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
                    <div className={styles.socialMediaContainer}>
                        <button className={styles.socialMediaButton}>
                            <Image className={styles.icon} src={vkIcon} alt='VK icon'/>
                            Добавить ВКонтакте
                        </button>
                        <button className={styles.socialMediaButton}>
                            <Image className={styles.icon} src={tgIcon} alt='Telegram icon'/>
                            Добавить TG
                        </button>
                    </div>
                    <div className={styles.checkboxContainer}>
                        <input className={styles.checkbox} type='checkbox'/>
                        <label className={styles.labelCheckbox}>Показывать соц. сети в профиле</label>
                    </div>
                    <Link href={`account/${login}`}>
                        <button className={cn(styles.submit, 'submitButton')} type='submit'>Сохранить</button>
                    </Link> 
                </form>
            </div>
            <div className={styles.backgroundContainer}>
                <Image className={styles.backgroundImage} src={dogImage} alt='Dog image'/>
            </div>
        </div>
    )
}