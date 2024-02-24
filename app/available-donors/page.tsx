'use client'

import { DonorCard } from "@components/DonorCard";
import { CitySelector, DistrictSelector, PetTypeSelector, BloodTypeSelector } from '@components/Selector';
import styles from "./page.module.css";
import cn from 'classnames';
import { useState } from 'react';
import * as api from '@/app/redux/services/api';
import { useDispatch, useSelector } from "react-redux";

export default function Applications() {
  const [ petType, setPetType ] = useState<api.PetType | undefined>();
  const [ bloodType, setBloodType ] = useState<number | undefined>();
  const [city, setCity] = useState<api.City | undefined>();
  const [district, setDistrict] = useState<api.District | undefined>();

  const { data } = api.useGetPetsQuery({
    bloodTypeId: bloodType ? bloodType : undefined,
    petTypeId: petType ? petType.id : undefined,
    city: city ? city.city : undefined,
    locationId: district ? district.id : undefined,
  })

  return (<>
    <title>Доступные доноры - petdonor.ru</title>
    <main className={styles.main}>
      <h1 className='header'>Доступные доноры</h1>
      <h2 className={styles.filtersHeader}>Фильтры</h2>
      <div className={styles.filters}>
        <div className={styles.inputContainer}>
            <label className={styles.label}>Тип животного</label>
            <PetTypeSelector optional value={petType} onChange={(v) => {setPetType(v); setBloodType(undefined)}}/>
        </div>
        <div className={styles.inputContainer}>
            <label className={styles.label}>Группа крови</label>
            <BloodTypeSelector optional petType={petType} value={bloodType} onChange={(v) => setBloodType(v)}/>
        </div>
        <div className={styles.inputContainer}>
            <label className={styles.label}>Город</label>
            <CitySelector optional value={city} onChange={(v) => {setCity(v); setDistrict(undefined)}}/>
        </div>
        <div className={styles.inputContainer}>
            <label className={styles.label}>Район</label>
            <DistrictSelector optional value={district} city={city} onChange={(v) => setDistrict(v)}/>
        </div>
      </div>
      <div className={styles.grid}>
        {data && data.map((v, i) => <DonorCard key={i} data={v}/>)}
        {!data || data.length == 0 && <div className={styles.unluck}>На данный момент доноров нет. Котики спят.</div>}
      </div>
    </main>
  </>);
}
