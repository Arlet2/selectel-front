import Image from 'next/image';
import donorSearchLogo from '@icons/donorSearch.svg';
import selectelLogo from '@icons/selectel.svg'
import geoIcon from '@icons/geo.svg';
import styles from './styles.module.css';
import Link from 'next/link';

// TODO: прикрутить выбор локации, переход на страницу входа

export const Header = () => {
    return (
        <div className={styles.container}>
            <Link className={styles.logoContainer} href="/">
                <Image src={donorSearchLogo} alt='Logo Selectel'/>
                <Image src={selectelLogo} alt='Logo Selectel'/>
            </Link>
            <div className={styles.navContainer}>
                <Link className={styles.headerLink} href='/about'>О сайте</Link>
                <Link className={styles.headerLink} href='/search'>Поиск донора</Link>
            </div>
            <div className={styles.infoContainer}>
                <Link href='/signin' className={styles.buttonLogin}>Войти</Link>
            </div>
        </div>
    )
}