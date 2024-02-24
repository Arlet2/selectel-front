'use client'
import styles from './styles.module.css';
import avatarIcon from '@icons/avatar.svg';
import accountIcon from '@icons/person.svg';
import deleteIcon from '@icons/delete.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import { PetCard } from '@/app/components/PetCard';
import * as api from '@/app/redux/services/api';
import { useRouter } from 'next/navigation';
import { PetTypeSelector, BloodTypeSelector, BreedTypeSelector } from '@components/Selector';
import { useAddPetMutation, IAddedPet, useGetUserInfoQuery, useGetPetsForUserQuery, IUserPets, useAddVaccinationMutation, useGetUnavailableDatesQuery, IUnavailableDatesForUser, IUnavailableDates } from '@/app/redux/services/api';
import toast from 'react-hot-toast';

interface IPageProps{
    params: {
        login: string;
    }
}

export interface IVaccinationArrayItem{
    name: string;
    date: string;
    [key: string]: string;
}

function Modal({onClose}: any) {
    const [ petType, setPetType ] = useState({id: 1, type: "Кошка"});
    const [ bloodType, setBloodType ] = useState(11);
    const [name, setName] = useState('');
    const [breed, setBreed] = useState<any>();
    const [birthday, setBirthday] = useState('');
    const [weight, setWeight] = useState<number | undefined>()
    const [vaccinations, setVaccinations] = useState<IVaccinationArrayItem[]>([]);

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

    const [addPetInfo, { isLoading }] = useAddPetMutation();
    const [addVaccinationMutation] = useAddVaccinationMutation();

    const handleSave = async (e: any) => {
        e.preventDefault()

        if (!weight) return;
        
        const petInfo: IAddedPet = {
            name,
            description: "Нет описания",
            petTypeId: breed.id,
            bloodTypeId: bloodType,
            birthday,
            weight
        };

        try {
            const result: any = await addPetInfo(petInfo);
            let idPet = 1;
            if ('data' in result) {
                const { id } = result.data;
                idPet = id;
            }
            vaccinations.map(async (item) => {
                await addVaccinationMutation({id: idPet, vaccination: {name: item.name, vaccinationDate: item.date}});
                toast.success('Вакцинация успешно добавлена.');
            })
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
        const updatedVaccinations = vaccinations.filter((_, i) => i !== index);
        setVaccinations(updatedVaccinations);
    }

    return (
        <form className={styles.modal}onSubmit={handleSave}>
            <h1>Добавление питомца</h1>
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
                        <PetTypeSelector value={petType} onChange={(v) => setPetType(v as api.PetType)}/>
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
                        <BloodTypeSelector petType={petType} value={bloodType} onChange={(v) => setBloodType(v as number)}/>
                    </div>
                    <div className={styles.inputContainer}>
                        <label className={styles.label}>Вес (кг)</label>
                        <input required type="number" step="any" className="input" placeholder="0" value={weight} onChange={handleWeightChange}/>
                    </div>
                </div>
            </div>
            {vaccinations.length > 0 && <div className={styles.pinkHeader}>Прививки</div>}
            <div className={vaccinations.length > 0 ? styles.vaccinationList : styles.displayNone}>
                {vaccinations.map((vaccination, index) => (
                    <div key={index} className={styles.vaccinationContainer}>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>Название прививки #{index + 1}</label>
                            <input
                                type="text"
                                className="input"
                                placeholder="Название прививки"
                                value={vaccination.name}
                                onChange={(e) => updateVaccination(index, 'name', e.target.value)}
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <div className={styles.containerWithDelete}>
                                <label className={styles.label}>Дата вакцинации</label>
                                <button className={styles.deleteButton} onClick={() => handleDeleteVaccination(index)}>
                                    <Image className={styles.deleteIcon} src={deleteIcon} alt='Delete button'/>
                                </button>
                            </div>
                            <input
                                type="date"
                                className="input"
                                value={vaccination.date}
                                onChange={(e) => updateVaccination(index, 'date', e.target.value)}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <button className={cn("linkPink", styles.pinkLinkButton)} onClick={(e) => { e.preventDefault(); addVaccination(); }}>Добавить прививки</button>
            <button className={cn("button", styles.modalButton)} type='submit'>Добавить питомца</button>
        </form>
    )
}

function convertDateFormat(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() +  1; // Месяцы начинаются с  0
    const year = date.getFullYear();
    return `${day}.${month <  10 ? '0' + month : month}.${year}`;
}

export default function Page({ params: { login } }: IPageProps){
    const isPersonLogged = api.getLogin() === login;
    const [ pets, setPets ] = useState<IUserPets[]>([]);
    const [ modalVisible, setModalVisible ] = useState(false)
    const [count, setCount] = useState(5);
    const router = useRouter();

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [showEmail, setShowEmail] = useState(false);
    const [showPhone, setShowPhone] = useState(false);
    const [vk, setVk] = useState('');
    const [tg, setTg] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [unavailableDates, setUnavailableDates] = useState<IUnavailableDates>();

    const { data: userInfo, isLoading: isUserInfoLoading } = useGetUserInfoQuery(login);
    const { data: petsInfo, isLoading: isPetsInfoLoading } = useGetPetsForUserQuery(login);
    const { data: unavailableDatesInfo, isLoading: isUnavailableDatesLoading } = useGetUnavailableDatesQuery();

    let fullName = `${name || ''} ${surname || ''} ${lastName || ''}`
    if (fullName.trim().length == 0) fullName= "Имя не указано"

    useEffect(() => {
        if (!isUserInfoLoading && userInfo) {
            setPhone(userInfo.phone);
            setName(userInfo.name);
            setSurname(userInfo.surname);
            setLastName(userInfo.middleName);
            setVk(userInfo.vkUserName);
            setTg(userInfo.tgUserName);
            setShowEmail(userInfo.emailVisibility);
            setShowPhone(userInfo.phoneVisibility);
            setEmail(userInfo.email);
            if (userInfo.location) {
                setCity(userInfo.location.city);
                setDistrict(userInfo.location.district);
            }
        }
    }, [isUserInfoLoading, userInfo]);

    useEffect(() => {
        if (!isPetsInfoLoading && petsInfo) {
            setPets(petsInfo);
        }
    }, [isPetsInfoLoading, petsInfo]);

    useEffect(() => {
        if (!isUnavailableDatesLoading && unavailableDatesInfo){
            setUnavailableDates(unavailableDatesInfo);
        }
    })

    function logout() {
        api.logout()
        localStorage.removeItem("login")
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        router.push(`/`);
    }

    return (<>
        <title>Профиль - petdonor.ru</title>
        <div className={styles.container}>
            { modalVisible && <div className={styles.darkness} onClick={() => setModalVisible(false)}/> }
            { modalVisible && <Modal onClose={() => setModalVisible(false)}/> }
            <div className={styles.leftContainer}>
                <h1 className='header'>
                    {isPersonLogged ? 'Личный кабинет' : 'Профиль донора'}
                </h1>
                <div className='divider'></div>
                <div className={styles.userContainer}>
                    <div className={styles.avatar}>
                        <img className={styles.avatarIcon} src={userInfo && userInfo.avatar} alt='Account icon'/>
                    </div>
                    <h2 className='subtitle'>{fullName}</h2>
                    <div className={styles.counter}>{count} донаций</div>
                    <Link className={cn('linkPink', !isPersonLogged && styles.displayNone)} href={`/account/${login}/settings`}>Редактировать</Link>
                    <div className={cn('linkBlue', !isPersonLogged && styles.displayNone)} onClick={logout}>Выход</div>
                </div>
            </div>
            <div className={cn(styles.rightContainer, pets.length > 0 ? '' : styles.empty)}>
                <div className={styles.contactInformation}>
                    <h2 className={styles.title}>Контактная информация</h2>
                    <div className={styles.contactContainer}>
                        <p>Город</p>
                        <p className='semibold'>{city ? city : 'Город не указан'}</p>
                    </div>
                    <div className={styles.contactContainer}>
                        <p>Район</p>
                        <p className='semibold'>{district ? district : 'Район не указан'}</p>
                    </div>
                    {showEmail && <div className={styles.contactContainer}>
                        <p>Почта</p>
                        <p className='semibold'>{email ? email : 'Почта не указана'}</p>
                    </div>}
                    {showPhone && <div className={styles.contactContainer}>
                        <p>Номер телефона</p>
                        <p className='semibold'>{phone ? phone : 'Телефон не указан'}</p>
                    </div>}
                    <div className={styles.socialMediaHeader}>Социальные сети</div>
                    <div className={styles.contactContainer}>
                        <p>Вконтакте</p>
                        <p className='semibold'>{vk ? vk : 'не указано'}</p>
                    </div>
                    <div className={styles.contactContainer}>
                        <p>Телеграм</p>
                        <p className='semibold'>{tg ? tg : 'не указано'}</p>
                    </div>
                    {unavailableDates && <div className={cn(styles.contactContainer, styles.unavailableContainer)}>
                        <p className={styles.pinkHeaderContact}>Даты недоступности</p>
                        <p className='semibold'>с {convertDateFormat(unavailableDates.startDate)} по {convertDateFormat(unavailableDates.endDate)}</p>
                    </div>}
                </div>
                <div className={cn(styles.petsContainer, pets.length > 0 ? '' : styles.empty)}>
                    <h2 className={styles.title}>Питомцы</h2>
                    {pets.length > 0 ? (
                        <div className={styles.petContainer}>
                            {pets.map((pet, key) => {
                                return <PetCard key={key} pet={pet} isPersonOwner={false}/>
                            })}
                        </div>
                    ) : (
                        <div className={styles.placeholer}>У вас пока нет питомцев</div>
                    )}
                </div>
                <button className={cn('button', styles.button, !isPersonLogged && styles.displayNone)} onClick={() => setModalVisible(true)}>Добавить питомца</button>
            </div>
        </div>
    </>)
}
