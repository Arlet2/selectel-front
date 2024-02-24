import styles from './styles.module.css';
import React from 'react';
import personIcon from '@icons/person.svg';
import catAvatar from '@images/catAvatar.png';
import dogAvatar from '@images/dogAvatar.png';
import Image from 'next/image';
import cn from 'classnames';


export const DonorCard = ({data}: any) => {
  return (
    <div className={styles.card}>
      <div className={styles.avatarContainer}>
        <Image src={dogAvatar} alt='Pet icon' className={styles.avatarPet}/>
      </div>
      <h1 className='subtitle'>{data.name}</h1>
      <p className={styles.city}>{data.owner.location.city}</p>
      <div className={styles.petInfo}>
        <Image src={personIcon} alt='Avatar icon' className={styles.avatar}/>
        <div className={styles.petTextInfo}>
          <p className={styles.petName}>Тузик</p>
          <p className={styles.petDetails}>вислоухий той<br/>5 лет</p>
        </div>  
      </div>
      <p className={styles.additionalPets}>еще 3 питомца</p>
      <button className={cn('button', styles.button)}>Перейти в профиль</button>
    </div>
  );
};
