'use client'

import { useDispatch, useSelector } from "react-redux";
import { ApplicationCard } from "@components/ApplicationCard"
import styles from "./page.module.css";
import cn from 'classnames';
import { useState } from 'react';
import * as api from '@/app/redux/services/api';

export default function Applications() {
  const [ isMe, setIsMe ] = useState(true)
  const { data } = api.useGetDonorRequestsQuery({ me: isMe });

  return (<>
    <title>Заявки на донацию - petdonor.ru</title>
    <main className={styles.main}>
      <h1 className='header'>Заявки на донацию</h1>
      <div className={styles.selector}>
        <div className={cn(isMe && styles.selected, styles.selectorItem)} onClick={() => setIsMe(true)}>Мои заявки</div>
        <div className={cn(!isMe && styles.selected, styles.selectorItem)} onClick={() => setIsMe(false)}>Все заявки</div>
      </div>
      <h2 className={styles.filtersHeader}>Фильтры</h2>
      <div className={styles.filters}>
        <div className={styles.inputContainer}>
            <label className={styles.label}>Тип животного</label>
            <select className="input">
                <option>Любой</option>
                <option>Кошка</option>
                <option>Собака</option>
            </select>
        </div>
        <div className={styles.inputContainer}>
            <label className={styles.label}>Группа крови</label>
            <select className="input">
                <option>Любая</option>
                <option>112312</option>
                <option>5643tdca</option>
            </select>
        </div>
        <div className={styles.inputContainer}>
            <label className={styles.label}>Город</label>
            <select className="input">
                <option>Любой</option>
                <option>Санкт-Петербург</option>
                <option>Москва</option>
            </select>
        </div>
        <div className={styles.inputContainer}>
            <label className={styles.label}>Район</label>
            <select className="input">
                <option>Любой</option>
                <option>Санкт-Петербург</option>
                <option>Москва</option>
            </select>
        </div>
      </div>
      <div className={styles.grid}>
        {data && data.map((v, i) => <ApplicationCard key={i} isMe={isMe} data={v}/>)}
      </div>
    </main>
  </>);
}
