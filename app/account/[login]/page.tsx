'use client'
import styles from './styles.module.css';
import avatarIcon from '@icons/avatar.svg';
import accountIcon from '@icons/person.svg';
import deleteIcon from '@icons/delete.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import cn from 'classnames';
import { PetCard } from '@/app/components/PetCard';
import * as api from '@/app/redux/services/api';
import { useRouter } from 'next/navigation';
import { PetTypeSelector, BloodTypeSelector } from '@components/Selector';

interface IPageProps{
    params: {
        login: string;
    }
}

interface IPet {
    type: 'cat' | 'dog';
    name: string;
    breed?: string;
    age?: number;
}

const pets: IPet[] = [
    {
        type: 'cat',
        name: 'Белла',
        breed: 'Сиамский',
        age: 5
    },
    {
        type: 'dog',
        name: 'Тузик',
        breed: 'Бульдог',
        age: 45
    },
    {
        type: 'cat',
        name: 'Ума',
        breed: 'Сфинкс',
        age: 1

    },
    {
        type: 'cat',
        name: 'Белла',
        breed: 'Вислоухий',        
        age: 0.5
    },
    {
        type: 'dog',
        name: 'Тузик',
        breed: 'Такса',
        age: 23

    },
    {
        type: 'cat',
        name: 'Ума',
        breed: 'Сфинкс',
        age: 5
    }
]

interface IVaccination{
    name: string;
    date: string;
    [key: string]: string;
}

function Modal() {
    const [ petType, setPetType ] = useState({id: 0, type: "Кошка"});
    const [ bloodType, setBloodType ] = useState(0);

    const [vaccinations, setVaccinations] = useState<IVaccination[]>([]);

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
        <form className={styles.modal}>
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
                        <PetTypeSelector value={petType} onChange={(v) => setPetType(v)}/>
                    </div>
                    <div className={styles.inputContainer}>
                        <label className={styles.label}>Кличка</label>
                        <input type="text" className="input" placeholder="Умка"/>
                    </div>
                    <div className={styles.inputContainer}>
                        <label className={styles.label}>Порода</label>
                        <input type="text" className="input" placeholder="Чихуахуа"/>
                    </div>
                </div>
                <div className={styles.rightContainerModal}>
                    <div className={styles.inputContainer}>
                        <label className={styles.label}>Дата рождения</label>
                        <input required type="date" className="input"/>
                    </div>
                    <div className={styles.inputContainer}>
                        <label className={styles.label}>Группа крови</label>
                        <BloodTypeSelector petType={petType} value={bloodType} onChange={(v) => setBloodType(v)}/>
                    </div>
                    <div className={styles.inputContainer}>
                        <label className={styles.label}>Вес (кг)</label>
                        <input type="number" className="input" placeholder="0"/>
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
            <button className={cn("linkPink", styles.pinkLinkButton)} onClick={addVaccination}>Добавить прививки</button>
            <button className={cn("button", styles.modalButton)} type='submit'>Создать заявку</button>
        </form>
    )
}

export default function Page({ params: { login } }: IPageProps){
    const isPersonLogged = api.getLogin() === login;
    const [ modalVisible, setModalVisible ] = useState(false)
    const [count, setCount] = useState(0);
    const [ isAnyPets, setIsAnyPets ] = useState(true);
    const router = useRouter();

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
            { modalVisible && <Modal/> }
            <div className={styles.leftContainer}>
                <h1 className='header'>
                    {isPersonLogged ? 'Личный кабинет' : 'Профиль донора'}
                </h1>
                <div className='divider'></div>
                <div className={styles.userContainer}>
                    <div className={styles.avatar}>
                        <Image src={accountIcon} alt='Account icon'/>
                    </div>
                    <h2 className='subtitle'>Вероника Собачкина</h2>
                    <div className={styles.counter}>{count} донаций</div>
                    <Link className={cn('linkPink', !isPersonLogged && styles.displayNone)} href={`/account/${login}/settings`}>Редактировать</Link>
                    <div className={cn('linkBlue', !isPersonLogged && styles.displayNone)} onClick={logout}>Выход</div>
                </div>
            </div>
            <div className={cn(styles.rightContainer, isAnyPets ? '' : styles.empty)}>
                <div className={styles.contactInformation}>
                    <h2 className={styles.title}>Контактная информация</h2>
                    <div className={styles.contactContainer}>
                        <p>Город</p>
                        <p className='semibold'>Санкт-Петербург</p>
                    </div>
                    <div className={styles.contactContainer}>
                        <p>Почта</p>
                        <p className='semibold'>test@mail.com</p>
                    </div>
                    <div className={styles.contactContainer}>
                        <p>Номер телефона</p>
                        <p className='semibold'>+7-(913)-887-33-63</p>
                    </div>
                    <div className={styles.socialMediaHeader}>Социальные сети</div>
                    <div className={styles.contactContainer}>
                        <p>Вконтакте</p>
                        <p className='semibold'>vk.com/iwishyoujoy</p>
                    </div>
                    <div className={styles.contactContainer}>
                        <p>Телеграм</p>
                        <p className='semibold'>@iwishyoujoy</p>
                    </div>
                </div>
                <div className={cn(styles.petsContainer, isAnyPets ? '' : styles.empty)}>
                    <h2 className={styles.title}>Питомцы</h2>
                    {isAnyPets ? (
                        <div className={styles.petContainer}>
                            {pets.map((pet, key) => {
                                return <PetCard key={key} type={pet.type} name={pet.name} isPersonOwner={isPersonLogged} breed={pet.breed} age={pet.age}/>
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
