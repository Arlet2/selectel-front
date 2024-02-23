'use client'

import Image from 'next/image';
import cn from 'classnames';
import donorSearchLogo from '@icons/donorSearch.svg';
import selectelLogo from '@icons/selectel.svg'
import styles from './styles.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

//TODO: подсвечивание раздела где мы на данный момент

export const Header = () => {
    const url = usePathname();

    return (
        <div className={styles.container}>
            <Link className={styles.logoContainer} href="/">
                <Image src={donorSearchLogo} alt='Logo Selectel'/>
                <Image src={selectelLogo} alt='Logo Selectel'/>
            </Link>
            <div className={styles.navContainer}>
                <Link className={cn(styles.headerLink, url === '/' && styles.selected)} href='/' onClick={() => setMock(1)}>О проекте</Link>
                <Link className={cn(styles.headerLink, url === '/search' && styles.selected)} href='/search' onClick={() => setMock(2)}>Поиск донора</Link>
                <Link className={cn(styles.headerLink, url === '/applications' && styles.selected)} href='/applications' onClick={() => setMock(3)}>Заявки на донацию</Link>
                <Link className={cn(styles.headerLink, url === '/available-donors' && styles.selected)} href='/available-donors' onClick={() => setMock(4)}>Доступные доноры</Link>
            </div>
            <div className={styles.infoContainer}>
                <Link href='/signin' className={cn(styles.button, 'button')}>Войти</Link>
            </div>
        </div>
    )
}
