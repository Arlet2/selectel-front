'use client'
import styles from './styles.module.css';
import accountIcon from '@icons/avatar.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import cn from 'classnames';

interface IPageProps{
    params: {
        login: string;
    }
}

export default function Page({ params: { login } }: IPageProps){
    const [count, setCount] = useState(0);
    const [ isAnyPets, setIsAnyPets ] = useState(false);
    return (<>
        <title>Профиль - petdonor.ru</title>
        <div className={styles.container}>
            <div className={styles.leftContainer}>
                <h1 className='header'>
                    Личный кабинет
                </h1>
                <div className='divider'></div>
                <div className={styles.userContainer}>
                    <div className={styles.avatar}>
                        <Image src={accountIcon} alt='Account icon'/>
                    </div>
                    <h2 className='subtitle'>Вероника Собачкина</h2>
                    <div className={styles.counter}>{count} донаций</div>
                    <Link className='linkPink' href={`/account/${login}/settings`}>Редактировать</Link>
                </div>
            </div>
            {isAnyPets ? (
                <div></div>
            ) : (
                <div className={styles.rightContainerEmpty}>
                    <div className={styles.placeholer}>У вас пока нет питомцев</div>
                    <button className={cn('button', styles.button)}>Добавить питомца</button>
                </div>
            )}
            
        </div>
    </>)
}
