import styles from './styles.module.css';
import dog from '@images/dogAvatar.png';
import cat from '@images/catAvatar.png';
import Image from 'next/image';
import cn from 'classnames';

interface IPetCardProps {
    type: 'cat' | 'dog';
    name: string;
}

export const PetCard: React.FC<IPetCardProps> = ({type, name}) => {
    return (
        <div className={styles.container}>
            <div className={styles.avatar}>
                <Image src={type === 'cat' ? cat : dog} alt='Pet photo'/>
            </div>
            <h1 className={styles.name}>{name}</h1>
            <div className={styles.buttonContainer}>
                <button className={cn('linkPink', styles.button)}>Редактировать</button>
                <button className={cn('linkBlue', styles.button)}>Удалить</button>
            </div>
        </div>
    )
}