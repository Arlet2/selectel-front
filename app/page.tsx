'use client'

import { useDispatch, useSelector } from "react-redux";
import styles from "./page.module.css";
import { useGetSomethingByNameQuery } from "@redux/services/api";
import { Skeleton } from "@components/Skeleton";

/* главная страница, которая будет открываться по / */

export default function Home() {

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
