'use client'

import Image from 'next/image';
import cn from 'classnames';
import donorSearchLogo from '@icons/donorSearch.svg';
import selectelLogo from '@icons/selectel.svg'
import styles from './styles.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const Header = () => {
    const [url, setUrl] = useState(window.location.pathname);
    const [ mock, setMock ] = useState('');

    useEffect(() => {
        setUrl(window.location.pathname);
    }, [window.location.pathname, mock]);

    return (
        <div className={styles.container}>
            <Link className={styles.logoContainer} href="/">
                <Image src={donorSearchLogo} alt='Logo Selectel'/>
                <Image src={selectelLogo} alt='Logo Selectel'/>
            </Link>
            <div className={styles.navContainer}>
                <Link className={cn(styles.headerLink, url === '/' && styles.selected)} href='/'>О сайте</Link>
                <Link className={cn(styles.headerLink, url === '/search' && styles.selected)} href='/search'>Поиск донора</Link>
                <Link className={cn(styles.headerLink, url === '/applications' && styles.selected)} href='/applications'>Заявки на донацию</Link>
                <Link className={cn(styles.headerLink, url === '/available-donors' && styles.selected)} href='/available-donors'>Доступные доноры</Link>
            </div>
            <div className={styles.infoContainer}>
                <Link href='/signin' className={cn(styles.button, 'buttonLogin')}>Войти</Link>
            </div>
        </div>
    )
}