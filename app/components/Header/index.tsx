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
            <div className={styles.logoContainer}>
                <Image src={donorSearchLogo} alt='Logo Selectel'/>
                <Image src={selectelLogo} alt='Logo Selectel'/>
            </div>
            <div className={styles.navContainer}>
                <Link className={styles.headerLink} href='/about'>О сайте</Link>
                <Link className={styles.headerLink} href='/search'>Поиск донора</Link>
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.geolocation}>
                    <Image className={styles.icon} src={geoIcon} alt='Geo location icon'/>
                    Все регионы
                </div>
                <button className={styles.buttonLogin}>Войти</button>
            </div>
        </div>
    )
}