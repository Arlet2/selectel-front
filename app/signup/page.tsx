'use client';

import Image from 'next/image';
import cn from 'classnames';
import tgIcon from '@icons/tg.svg';
import vkIcon from '@icons/vk.svg';
import arrowIcon from '@icons/arrow.svg';
import dogImage from '@images/dog.png';
import styles from './styles.module.css';
import Link from 'next/link';
import * as VKID from '@vkid/sdk';

export default function Page() {
    function useVK() {
        VKID.Auth.login()       
    }

    return (
        <div className={styles.container}>
            <div className={styles.signupContainer}>
                <div className={styles.headerContainer}>
                    <h1 className={styles.header}>Регистрация</h1>
                    <div className={styles.subtitleContainer}>
                        <div className={styles.divider}></div>
                        <h2 className={styles.subtitle}>Войти с помощью</h2>
                    </div>
                    <div className={styles.socialMediaContainer}>
                        <button className={styles.socialMediaButton} onClick={useVK}>
                            <Image className={styles.icon} src={vkIcon} alt='VK icon'/>
                            Продолжить с ВКонтакте
                        </button>
                        <button className={styles.socialMediaButton}>
                            <Image className={styles.icon} src={tgIcon} alt='Telegram icon'/>
                            Продолжить с TG
                        </button>
                    </div>
                </div>
                <div className={styles.placeholder}>или</div>
                <form className={styles.formContainer}>
                    <div className={styles.topContainer}>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>Логин</label>
                            <input className='input' type='text' placeholder='Ваш логин'/>
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>Почта</label>
                            <input className='input' type='email' placeholder='mymail@mail.ru'/>
                        </div>
                    </div>
                    <div className={styles.bottomContainer}>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>Пароль</label>
                            <input className={cn(styles.inputPassword, 'input')} type='password' placeholder='********'/>
                        </div>
                    </div>
                    <div className={styles.checkboxContainer}>
                        <input className={styles.checkbox} type='checkbox'/>
                        <label className={styles.labelCheckbox}>Я прочитал политику конфиденциальности и со всем согласен :)</label>
                    </div> 
                    <button className={cn(styles.submit, 'submitButton')} type='submit'>
                        <Image className={styles.icon} src={arrowIcon} alt='Arrow icon'/>
                    </button>
                    <div className={styles.loginContainer}>
                        Уже есть аккаунт?
                        <Link href='/login' className='linkBlue'>Войти</Link>
                    </div>
                </form>
            </div>
            <div className={styles.backgroundContainer}>
                <Image className={styles.backgroundImage} src={dogImage} alt='Dog image'/>
            </div>
        </div>
    )
}
