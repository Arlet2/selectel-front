import styles from './styles.module.css';
import dog from '@images/dogAvatar.png';
import cat from '@images/catAvatar.png';
import Image from 'next/image';
import cn from 'classnames';
import { useState } from 'react';
import { IPet, IVaccination } from '@/app/account/[login]/page';
import { IUserPets } from '@/app/redux/services/api';

interface IPetCardProps {
    pet: IUserPets;
    isPersonOwner?: boolean;
}

// interface ShowMoreModalProps {
//     pet: IPet;
//     vaccinations: IVaccination[];
// }

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


function ShowMoreModal({ pet, vaccinations }: ShowMoreModalProps) {
    
    return (
        <form className={styles.modal}>
            <h1>Подробнее о питомце</h1>
            <div className={cn(styles.avatar, styles.avatarPet)}>
                <Image src={dog} alt='Avatar icon'/>
            </div>
            <div className={styles.infoContainer}>
                <p>Тип животного</p>
                <p className='semibold'>{pet.type}</p>
            </div>
            <div className={styles.infoContainer}>
                <p>Кличка</p>
                <p className='semibold'>{pet.name}</p>
            </div>
            <div className={styles.infoContainer}>
                <p>Порода</p>
                <p className='semibold'>{pet.breed}</p>
            </div>
            <div className={styles.infoContainer}>
                <p>Дата рождения</p>
                <p className='semibold'>{pet.birthday}</p>
            </div>
            <div className={styles.infoContainer}>
                <p>Группа крови</p>
                <p className='semibold'>{pet.bloodType}</p>
            </div>
            <div className={styles.infoContainer}>
                <p>Вес (кг)</p>
                <p className='semibold'>{pet.weight}</p>
            </div>
            {vaccinations.length > 0 && <div className={styles.blueHeader}>Прививки</div>}
            <div className={styles.vaccinationsScroll}>
                {vaccinations.map((vaccination, index) => {
                    return (
                        <div className={styles.vaccinationList} key={index}>
                            <p className={styles.vaccinationNumber}>#{index+1}</p>
                            <div className={styles.vaccinationItem}>
                                <div className={styles.infoContainer}>
                                    <p>Название</p>
                                    <p className='semibold'>{vaccination.name}</p>
                                </div>
                                <div className={styles.infoContainer}>
                                    <p>Дата вакцинации</p>
                                    <p className='semibold'>{vaccination.date}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </form>
    )
}

const myVaccinations: IVaccination[] = [
    {
        name: 'Прививка от кори',
        date: '2024-05-03'
    },
    {
        name: 'Прививка от кори',
        date: '2024-05-03'
    },
    {
        name: 'Прививка от кори',
        date: '2024-05-03'
    }
]

export const PetCard: React.FC<IPetCardProps> = ({pet, isPersonOwner = true}) => {
    const [ modalVisible, setModalVisible ] = useState(false);

    const handleDelete = () => {
        
    }

    return (
        <div className={styles.container}>
            {/* { modalVisible && <div className={styles.darkness} onClick={() => setModalVisible(false)}/> } */}
            {/* { modalVisible && <ShowMoreModal pet={pet} vaccinations={myVaccinations}/> } */}
            <div className={styles.avatar}>
                <Image src={pet.petType.type === 'cat' ? cat : dog} alt='Pet photo'/>
            </div>
            <h1 className={styles.name}>{pet.name}</h1>
            {!isPersonOwner && (
                <div className={styles.petInfo}>
                    <p>{pet.petType.breed}</p>
                    <p>{pet.birthday}</p>
                </div>
            )}
            <div className={styles.buttonContainer}>
                <button className={cn('linkBlue', styles.button, isPersonOwner && styles.displayNone )} onClick={() => setModalVisible(true)}>Подробнее</button>
                <button className={cn('linkPink', styles.button, !isPersonOwner && styles.displayNone )}>Редактировать</button>
                <button className={cn('linkBlue', styles.button, !isPersonOwner && styles.displayNone )}>Удалить</button>
            </div>
        </div>
    )
}
