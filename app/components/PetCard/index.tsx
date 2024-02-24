import styles from './styles.module.css';
import dog from '@images/dogAvatar.png';
import cat from '@images/catAvatar.png';
import Image from 'next/image';
import cn from 'classnames';
import avatarIcon from '@icons/avatar.svg';
import { useEffect, useState } from 'react';
import { IGetVaccination, IVaccination, useDeletePetMutation, useGetVaccinationsQuery } from '@/app/redux/services/api';
import toast from 'react-hot-toast';
import { convertDateFormat } from '@/app/utils/convertDate';
import { useEditPetMutation, IAddedPet, useGetUserInfoQuery, useGetPetsForUserQuery, IUserPets, useAddVaccinationMutation, useGetUnavailableDatesQuery, IUnavailableDates } from '@/app/redux/services/api';
import { PetTypeSelector, BloodTypeSelector, BreedTypeSelector } from '@components/Selector';

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
    const [ editModalVisible, setEditModalVisible ] = useState(false);
    const {data: vaccinationsFromQuery, isLoading: isVaccinationsFromQueryLoading} = useGetVaccinationsQuery(pet.id);
    const [deletePet, {isLoading}] = useDeletePetMutation();

    useEffect(() => {
        if (!isVaccinationsFromQueryLoading && vaccinationsFromQuery){
            setVaccinations(vaccinationsFromQuery);
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
            { editModalVisible && <div className={styles.darkness} onClick={() => setEditModalVisible(false)}/> }
            { editModalVisible && <EditModal pet={pet} vaccinations={vaccinations} onClose={() => setEditModalVisible(false)}/> }
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
                <button className={cn('linkPink', styles.button, !isPersonOwner && styles.displayNone )} onClick={() => setEditModalVisible(true)}>Редактировать</button>
                <button className={cn('linkBlue', styles.button, !isPersonOwner && styles.displayNone )} onClick={handleDelete}>Удалить</button>
            </div>
        </div>
    )
}

function EditModal({onClose, pet, vaccinations: vaccinationsInit}: any) {
    const [ petType, setPetType ] = useState(pet.petType);
    const [ bloodType, setBloodType ] = useState<any>(pet.bloodType);
    const [name, setName] = useState(pet.name);
    const [breed, setBreed] = useState<any>(pet.petType);
    const [birthday, setBirthday] = useState(pet.birthday);
    const [weight, setWeight] = useState<number | undefined>(pet.weight)
    const [vaccinations, setVaccinations] = useState<any>(vaccinationsInit);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
    const handleBreedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBreed(e.target.value);
    };
    const handleBirthdayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBirthday(e.target.value);
    };
    const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.trim().length > 0) {
            setWeight(Number(e.target.value));
        } else {
            setWeight(undefined)
        }
    };

    const [editPetInfo, { isLoading }] = useEditPetMutation();
    const [addVaccinationMutation] = useAddVaccinationMutation();

    const handleSave = async (e: any) => {
        e.preventDefault()

        if (!weight) return;
        
        const petInfo: IAddedPet = {
            id: pet.id,
            name,
            description: "Нет описания",
            petTypeId: breed.id,
            bloodTypeId: bloodType.id,
            birthday,
            weight
        };

        try {
            const result: any = await editPetInfo(petInfo);
            let idPet = 1;
            if ('data' in result) {
                const { id } = result.data;
                idPet = id;
            }
            // vaccinations.map(async (item) => {
            //     await addVaccinationMutation({id: idPet, vaccination: {name: item.name, vaccinationDate: item.date}});
            //     toast.success('Вакцинация успешно добавлена.');
            // })
            toast.success('Питомец успешно добавлен.')
            onClose()
        } catch (error) {
            console.error('Ошибка добавления питомца:', error);
            toast.error('Ошибка добавления питомца. Пожалуйста, попробуйте снова.')
        }
    };
    
    const addVaccination = () => {
        setVaccinations([...vaccinations, { name: '', date: '' }]);
    };

    const updateVaccination = (index: number, field: string, value: string) => {
        const newVaccinations = [...vaccinations];
        newVaccinations[index][field] = value;
        setVaccinations(newVaccinations);
    };

    const handleDeleteVaccination = (index: number) => {
        const updatedVaccinations = vaccinations.filter((_: any, i: any) => i !== index);
        setVaccinations(updatedVaccinations);
    }

    return (
        <form className={cn(styles.modal, styles.widemodal)}onSubmit={handleSave}>
            <h1>Редактирование питомца</h1>
            <div className={styles.inputContainerModal}>
                <div className={styles.leftContainerModal}>
                    <div className={styles.inputContainer}>
                        <label className={styles.label}>Аватар</label>
                        <button className={cn(styles.avatar, styles.avatarPet)}>
                            <Image src={avatarIcon} alt='Avatar icon'/>
                        </button>
                    </div>
                    <div className={styles.inputContainer}>
                        <label className={styles.label}>Тип животного</label>
                        <PetTypeSelector value={petType} onChange={(v) => {setPetType(v as any); setBloodType(undefined); setBreed(undefined)}}/>
                    </div>
                    <div className={styles.inputContainer}>
                        <label className={styles.label}>Кличка</label>
                        <input required type="text" className="input" placeholder="Умка" value={name} onChange={handleNameChange}/>
                    </div>
                    <div className={styles.inputContainer}>
                        <label className={styles.label}>Порода</label>
                        <BreedTypeSelector petType={petType} value={breed} onChange={(v) => setBreed(v)}/>
                    </div>
                </div>
                <div className={styles.rightContainerModal}>
                    <div className={styles.inputContainer}>
                        <label className={styles.label}>Дата рождения</label>
                        <input required type="date" className="input" value={birthday} onChange={handleBirthdayChange}/>
                    </div>
                    <div className={styles.inputContainer}>
                        <label className={styles.label}>Группа крови</label>
                        <BloodTypeSelector petType={petType} value={bloodType} onChange={(v: any) => setBloodType(v as number)}/>
                    </div>
                    <div className={styles.inputContainer}>
                        <label className={styles.label}>Вес (кг)</label>
                        <input required type="number" step="any" className="input" placeholder="0" value={weight} onChange={handleWeightChange}/>
                    </div>
                </div>
            </div>
            <button className={cn("button", styles.modalButton)} type='submit'>Сохранить питомца</button>
        </form>
    )
}
