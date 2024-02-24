'use client'

import Image from 'next/image';
import cn from 'classnames';
import donorSearchLogo from '@icons/donorSearch.svg';
import selectelLogo from '@icons/selectel.svg'
import styles from './styles.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getLogin } from '@/app/redux/services/api'

//TODO: подсвечивание раздела где мы на данный момент

export const Header = () => {
    const url = usePathname();
    const login = getLogin();
    const isSigned = login !== undefined;

    return (
        <div className={styles.container}>
            <Link className={styles.logoContainer} href="/">
                <Image src={donorSearchLogo} alt='Logo Selectel'/>
                <Image src={selectelLogo} alt='Logo Selectel'/>
            </Link>
            <div className={styles.navContainer}>
                <Link className={cn(styles.headerLink, url === '/' && styles.selected)} href='/'>О проекте</Link>
                {isSigned && <Link className={cn(styles.headerLink, url === '/search' && styles.selected)} href='/search'>Поиск донора</Link>}
                {isSigned && <Link className={cn(styles.headerLink, url === '/applications' && styles.selected)} href='/applications'>Заявки на донацию</Link>}
                {isSigned && <Link className={cn(styles.headerLink, url === '/available-donors' && styles.selected)} href='/available-donors'>Доступные доноры</Link>}
            </div>
            <div className={styles.infoContainer}>
                {!isSigned && <Link href='/signin' className={cn(styles.button, 'button')}>Войти</Link>}
                {isSigned && <Link href={`/account/${login}`} className={cn(styles.button, 'button')}>Профиль</Link>}
            </div>
        </div>
    )
}
