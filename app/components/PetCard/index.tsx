import styles from './styles.module.css';
import dog from '@images/dogAvatar.png';
import cat from '@images/catAvatar.png';
import Image from 'next/image';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import { IGetVaccination, IUserPets, IVaccination, useDeletePetMutation, useGetVaccinationsQuery } from '@/app/redux/services/api';
import toast from 'react-hot-toast';
import { convertDateFormat } from '@/app/account/[login]/page';

interface IPetCardProps {
    pet: IUserPets;
    isPersonOwner?: boolean;
}

interface ShowMoreModalProps {
    pet: IUserPets;
    vaccinations: IVaccination[];
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

function getFullYears(dateString: string) {
    const birthDate = new Date(dateString);
    const currentDate = new Date();
    const fullYears = currentDate.getFullYear() - birthDate.getFullYear();
    const m = currentDate.getMonth() - birthDate.getMonth();
    if (m <  0 || (m ===  0 && currentDate.getDate() < birthDate.getDate())) {
        return fullYears -  1;
    }
    return fullYears;
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
                <p className='semibold'>{pet.petType.type}</p>
            </div>
            <div className={styles.infoContainer}>
                <p>Кличка</p>
                <p className='semibold'>{pet.name}</p>
            </div>
            <div className={styles.infoContainer}>
                <p>Порода</p>
                <p className='semibold'>{pet.petType.breed}</p>
            </div>
            <div className={styles.infoContainer}>
                <p>Дата рождения</p>
                <p className='semibold'>{convertDateFormat(pet.birthday)}</p>
            </div>
            <div className={styles.infoContainer}>
                <p>Группа крови</p>
                <p className='semibold'>{pet.bloodType.bloodType}</p>
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
                                    <p className='semibold'>{vaccination.vaccinationDate}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </form>
    )
}

export const PetCard: React.FC<IPetCardProps> = ({pet, isPersonOwner = true}) => {
    const [ vaccinations, setVaccinations ] = useState<IGetVaccination[]>([]);
    const [ shareModalVisible, setShareModalVisible ] = useState(false);
    const {data: vaccinationsFromQuery, isLoading: isVaccinationsFromQueryLoading} = useGetVaccinationsQuery(pet.id);
    const [deletePet, {isLoading}] = useDeletePetMutation();
    console.log(pet);

    useEffect(() => {
        if (!isVaccinationsFromQueryLoading && vaccinationsFromQuery){
            setVaccinations(vaccinationsFromQuery);
            console.log(vaccinations);
        }
    },[isVaccinationsFromQueryLoading, vaccinationsFromQuery]);

    const handleDelete = async () => {
        try {
            await deletePet(pet.id).unwrap();

        } catch (error) {
            console.error('Ошибка удаления питомца:', error);
            toast.error('Ошибка удаления питомца. Пожалуйста, попробуйте снова.')
        }
    }

    return (
        <div className={styles.container}>
            { shareModalVisible && <div className={styles.darkness} onClick={() => setShareModalVisible(false)}/> }
            { shareModalVisible && <ShowMoreModal pet={pet} vaccinations={vaccinations}/> }
            <div className={styles.avatar}>
                <Image src={pet.petType.type === 'cat' ? cat : dog} alt='Pet photo'/>
            </div>
            <h1 className={styles.name}>{pet.name}</h1>
            {!isPersonOwner && (
                <div className={styles.petInfo}>
                    <p>{pet.petType.breed}</p>
                    <p>{formatAge(getFullYears(pet.birthday))}</p>
                </div>
            )}
            <div className={styles.buttonContainer}>
                <button className={cn('linkBlue', styles.button, isPersonOwner && styles.displayNone )} onClick={() => setShareModalVisible(true)}>Подробнее</button>
                <button className={cn('linkPink', styles.button, !isPersonOwner && styles.displayNone )}>Редактировать</button>
                <button className={cn('linkBlue', styles.button, !isPersonOwner && styles.displayNone )} onClick={handleDelete}>Удалить</button>
            </div>
        </div>
    )
}
