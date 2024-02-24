'use client'

import { useDispatch, useSelector } from "react-redux";
import { ApplicationCard } from "@components/ApplicationCard"
import { CitySelector, DistrictSelector, PetTypeSelector, BloodTypeSelector } from '@components/Selector';
import styles from "./page.module.css";
import cn from 'classnames';
import { useState } from 'react';
import * as api from '@/app/redux/services/api';

export default function Applications() {
  const [ isMe, setIsMe ] = useState(true)

  const [ petType, setPetType ] = useState<api.PetType | undefined>();
  const [ bloodType, setBloodType ] = useState<any | undefined>();
  const [city, setCity] = useState<api.City | undefined>();
  const [district, setDistrict] = useState<api.District | undefined>();
  const [dateBefore, setDateBefore] = useState("");
  const [dateAfter, setDateAfter] = useState("");

  const { data } = api.useGetDonorRequestsQuery({
    me: isMe,
    blood_type_id: bloodType ? bloodType.id : undefined,
    pet_type_id: petType ? petType.id : undefined,
    city: city ? city.city : undefined,
    location_id: district ? district.id : undefined,
    date_after: dateAfter.trim().length > 0 ? dateAfter : undefined,
    date_before: dateBefore.trim().length > 0 ? dateBefore : undefined,
  });

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
            <PetTypeSelector optional value={petType} onChange={(v) => {setPetType(v); setBloodType(undefined)}}/>
        </div>
        <div className={styles.inputContainer}>
            <label className={styles.label}>Группа крови</label>
            <BloodTypeSelector optional petType={petType} value={bloodType as any} onChange={(v: any) => setBloodType(v)}/>
        </div>
        <div className={styles.inputContainer}>
            <label className={styles.label}>Город</label>
            <CitySelector optional value={city} onChange={(v) => {setCity(v); setDistrict(undefined)}}/>
        </div>
        <div className={styles.inputContainer}>
            <label className={styles.label}>Район</label>
            <DistrictSelector optional value={district} city={city} onChange={(v) => setDistrict(v)}/>
        </div>
        <div className={styles.inputContainer}>
            <label className={styles.label}>Начальная дата</label>
            <input type="date" className="input" value={dateAfter} onChange={(e) => setDateAfter(e.target.value)}/>
        </div>
        <div className={styles.inputContainer}>
            <label className={styles.label}>Конечная дата</label>
            <input type="date" className="input" value={dateBefore} onChange={(e) => setDateBefore(e.target.value)}/>
        </div>
      </div>
      <div className={styles.grid}>
        {data && data.map((v, i) => <ApplicationCard key={i} isMe={isMe} data={v}/>)}
        {!data || data.length == 0 && <div className={styles.unluck}>На данный момент заявок нет. Котики спят.</div>}
      </div>
    </main>
  </>);
}
