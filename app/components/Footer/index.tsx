import styles from './styles.module.css';
import gifFooter from '../../../public/gifs/dog.gif';
import Image from 'next/image';

export const Footer = () => {
    return (
        <div className={styles.container}>
                Добряки © 2024 <br /> Сделано для Selectel Hack 2024
            <Image className={styles.footerGif} src={gifFooter} alt="GIF description" layout="fixed" />
        </div>
    )
}
