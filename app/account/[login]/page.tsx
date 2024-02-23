'use client'
import styles from './styles.module.css';
import avatarIcon from '@icons/avatar.svg';
import accountIcon from '@icons/person.svg'
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import cn from 'classnames';
import { PetCard } from '@/app/components/PetCard';

interface IPageProps{
    params: {
        login: string;
    }
}

interface IPet {
    type: 'cat' | 'dog',
    name: string
}

const pets: IPet[] = [
    {
        type: 'cat',
        name: 'Белла'
    },
    {
        type: 'dog',
        name: 'Тузик'
    },
    {
        type: 'cat',
        name: 'Ума'
    },
    {
        type: 'cat',
        name: 'Белла'
    },
    {
        type: 'dog',
        name: 'Тузик'
    },
    {
        type: 'cat',
        name: 'Ума'
    }
]

function Modal() {
    return (
        <form className={styles.modal}>
            <h1>Добавление питомца</h1>
            <div className={styles.inputContainer}>
                <label className={styles.label}>Тип животного</label>
                <select className="input">
                    <option>Кошка</option>
                    <option>Собака</option>
                </select>
            </div>
            <div className={styles.inputContainer}>
                <label className={styles.label}>Аватар</label>
                <button className={cn(styles.avatar, styles.avatarPet)}>
                    <Image src={avatarIcon} alt='Avatar icon'/>
                </button>
            </div>
            <div className={styles.inputContainer}>
                <label className={styles.label}>Группа крови</label>
                <select className="input">
                    <option>1+</option>
                    <option>2-</option>
                </select>
            </div>
            <div className={styles.inputContainer}>
                <label className={styles.label}>Город</label>
                <select className="input">
                    <option>Санкт-Петербург</option>
                    <option>Москва</option>
                </select>
            </div>
            <div className={styles.inputContainer}>
                <label className={styles.label}>Район</label>
                <select className="input">
                    <option>Шушары</option>
                    <option>Нижний Тагил</option>
                </select>
            </div>
            <div className={styles.inputContainer}>
                <label className={styles.label}>Количество крови (мл)</label>
                <input type="number" className="input" placeholder="0"/>
            </div>
            <div className={styles.inputContainer}>
                <label className={styles.label}>Дата окончания поиска</label>
                <input required type="date" className="input"/>
            </div>
            <button className={cn("button", styles.modalButton)} type='submit'>Создать заявку</button>
        </form>
    )
}

export default function Page({ params: { login } }: IPageProps){
    const [ modalVisible, setModalVisible ] = useState(false)
    const [count, setCount] = useState(0);
    const [ isAnyPets, setIsAnyPets ] = useState(true);
    return (<>
        <title>Профиль - petdonor.ru</title>
        <div className={styles.container}>
            { modalVisible && <div className={styles.darkness} onClick={() => setModalVisible(false)}/> }
            { modalVisible && <Modal/> }
            <div className={styles.leftContainer}>
                <h1 className='header'>
                    Личный кабинет
                </h1>
                <div className='divider'></div>
                <div className={styles.userContainer}>
                    <div className={styles.avatar}>
                        <Image src={accountIcon} alt='Account icon'/>
                    </div>
                    <h2 className='subtitle'>Вероника Собачкина</h2>
                    <div className={styles.counter}>{count} донаций</div>
                    <Link className='linkPink' href={`/account/${login}/settings`}>Редактировать</Link>
                </div>
            </div>
            <div className={cn(styles.rightContainer, isAnyPets ? '' : styles.empty)}>
            {isAnyPets ? (
                <div className={styles.petContainer}>
                    {pets.map((pet, key) => {
                        return <PetCard key={key} type={pet.type} name={pet.name}/>
                    })}
                </div>
            ) : (
                <div className={styles.placeholer}>У вас пока нет питомцев</div>
            )}
                <button className={cn('button', styles.button)} onClick={() => setModalVisible(true)}>Добавить питомца</button>
            </div>
            
            
        </div>
    </>)
}
