import styles from './styles.module.css';
import React from 'react';
import personIcon from '@icons/person.svg';
import catAvatar from '@images/catAvatar.png';
import dogAvatar from '@images/dogAvatar.png';
import Image from 'next/image';
import cn from 'classnames';
import Link from 'next/link';

export const DonorCard = ({data}: any) => {
  let name = `${data.owner.surname || ''} ${data.owner.name || ''} ${data.owner.middleName || ''}`
  if (name.trim().length == 0) name = "Имя не указано"

  return (
    <div className={styles.card}>
      <div className={styles.avatarContainer}>
        <Image src={dogAvatar} alt='Pet icon' className={styles.avatar}/>
      </div>
      <h1 className='subtitle'>{data.name}</h1>
      <p className={styles.city}>{data.petType.type} - Группа крови: {data.bloodType.bloodType == 'default' ? 'Не важна' : data.bloodType.bloodType}</p>
      <div className={styles.petInfo}>
        <img src={data.owner.avatar} alt='Avatar icon' className={styles.avatarPet}/>
        <div className={styles.petTextInfo}>
          <p className={styles.petName}>{name}</p>
          <p className={styles.petDetails}>{data.owner.location ? data.owner.location.city : "Город не указан"}</p>
          <p className={styles.petDetails}>{data.owner.location && data.owner.location.district ? "р-н " + data.owner.location.district  : "Район не указан"}</p>
        </div>  
      </div>
      <Link href={`/account/${data.owner.login}`} className={cn('button', styles.button)}>Перейти в профиль</Link>
    </div>
  );
};
