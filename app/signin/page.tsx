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
import { useState } from 'react';
import { useRouter } from 'next/navigation';

//TODO: добавить проброс логина в урл

export default function Page() {
    const router = useRouter();
    const [ login, setLogin ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value);
    }
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleSubmitClick = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.push(`/account/${login}/settings`);
    }

    function useVK() {
        VKID.Config.set({
            app: Number(process.env.NEXT_PUBLIC_VK_APP_ID),
            redirectUrl: process.env.NEXT_PUBLIC_VK_REDIRECT_URL,
        });
        VKID.Auth.login()
    }

    return (<>
        <title>Вход - petdonor.ru</title>
        <div className={styles.container}>
            <div className={styles.signupContainer}>
                <div className={styles.headerContainer}>
                    <h1 className='header'>Вход</h1>
                    <div className={styles.loginContainer}>
                        Нет аккаунта?
                        <Link href='/signup' className='linkPink'>Зарегистрироваться</Link>
                    </div>
                    <div className={styles.subtitleContainer}>
                        <div className='divider'></div>
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
                <form className={styles.formContainer} onSubmit={handleSubmitClick}>
                    <div className={styles.topContainer}>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>Логин/почта</label>
                            <input className={cn('inputLong', 'input')} type='text' placeholder='Ваш логин или почта' value={login} onChange={handleLoginChange}/>
                        </div>
                    </div>
                    <div className={styles.bottomContainer}>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>Пароль</label>
                            <input className={cn('inputLong', 'input')} type='password' value={password} placeholder='********' onChange={handlePasswordChange}/>
                        </div>
                    </div>
                    <button className={cn(styles.submit, 'submitButton')} type='submit'>
                        <Image className={styles.icon} src={arrowIcon} alt='Arrow icon'/>
                    </button>
                </form>
            </div>
            <div className={styles.backgroundContainer}>
                <Image className={styles.backgroundImage} src={dogImage} alt='Dog image'/>
            </div>
        </div>
    </>)
}
