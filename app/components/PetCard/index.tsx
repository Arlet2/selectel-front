import styles from './styles.module.css';
import dog from '@images/dogAvatar.png';
import cat from '@images/catAvatar.png';
import Image from 'next/image';
import cn from 'classnames';

interface IPetCardProps {
    type: 'cat' | 'dog';
    name: string;
    isPersonOwner?: boolean;
    breed?: string;
    age?: number;
}

function formatAge(age: number | undefined) {
    if (!age) return `0 лет`;

    const lastDigit = age %  10;
    const lastTwoDigits = age %  100;

    if (lastDigit ===  1 && lastTwoDigits !==  11) {
        return `${age} год`;
    } else if (lastDigit >=  2 && lastDigit <=  4 && (lastTwoDigits <  10 || lastTwoDigits >=  20)) {
        return `${age} года`;
    } else {
        return `${age} лет`;
    }
}

export const PetCard: React.FC<IPetCardProps> = ({type, name, isPersonOwner = true, breed, age}) => {
    return (
        <div className={styles.container}>
            <div className={styles.avatar}>
                <Image src={type === 'cat' ? cat : dog} alt='Pet photo'/>
            </div>
            <h1 className={styles.name}>{name}</h1>
            {!isPersonOwner && (
                <div className={styles.petInfo}>
                    <p>{breed}</p>
                    <p>{formatAge(age)}</p>
                </div>
            )}
            <div className={styles.buttonContainer}>
                <button className={cn('linkBlue', styles.button, isPersonOwner && styles.displayNone )}>Подробнее</button>
                <button className={cn('linkPink', styles.button, !isPersonOwner && styles.displayNone )}>Редактировать</button>
                <button className={cn('linkBlue', styles.button, !isPersonOwner && styles.displayNone )}>Удалить</button>
            </div>
        </div>
    )
}
