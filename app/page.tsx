'use client'

import { useDispatch, useSelector } from "react-redux";
import styles from "./page.module.css";
import { useGetSomethingByNameQuery } from "@redux/services/api";
import { setId } from "@redux/someData/reducer";
import { someDataSelector } from "@redux/someData/selector";
import { Skeleton } from "@components/Skeleton";

/* главная страница, которая будет открываться по / */

export default function Home() {
  /* пример использования query, возвращает разные индикаторы получения информации, можно добавить скелетоны и обработку ошибок */
  // const {data, isLoading, error} = useGetSomethingByNameQuery("bla");

  /* пример использования селектора */
  const something = useSelector(someDataSelector);

  // if (error){
  // return <div>Oops</div>;
  // }

  // if (isLoading){
  // return <div>some skeleton</div>;
  // }

  /* пример использования сеттера*/
  const dispath = useDispatch();
  dispath(setId(6));

  return (
    <main className={styles.main}>
      first page content here
      <Skeleton view='logo'/>
      <Skeleton view='text'/>
      <Skeleton />
      <Skeleton view='text'/>
      
    </main>
  );
}
