'use client'

import { useDispatch, useSelector } from "react-redux";
import { DonorCard } from "@components/DonorCard";
import styles from "./page.module.css";
import cn from 'classnames';

export default function Applications() {
  const userInfo = {
    username: 'Вероника Собачкина',
    city: 'Санкт-Петербург',
    pet: {
      name: 'Тузик',
      breed: 'вислоухий той',
      age: 5,
    },
    additionalPetsCount: 3,
  };

  return (<>
    <title>Доступные доноры - petdonor.ru</title>
    <main className={styles.main}>
      <h1 className='header'>Доступные доноры</h1>
      <h2 className={styles.filtersHeader}>Фильтры</h2>
      <div className={styles.filters}>
        <div className={styles.inputContainer}>
            <label className={styles.label}>Тип питомца</label>
            <select className="input">
                <option>Любой</option>
                <option>Кот</option>
                <option>Пес</option>
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
            <label className={styles.label}>Доступный с</label>
            <input className='input' type='date' />
        </div>
        <div className={styles.inputContainer}>
            <label className={styles.label}>по</label>
            <input className='input' type='date' />
        </div>
      </div>
      <div className={styles.grid}>
      <DonorCard/>
      <DonorCard/>
      <DonorCard/>
      <DonorCard/>
      <DonorCard/>
      <DonorCard/>
      <DonorCard/>
      <DonorCard/>
      </div>
    </main>
  </>);
}
