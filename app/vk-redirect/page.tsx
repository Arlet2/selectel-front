'use client'

import { useDispatch, useSelector } from "react-redux";
import styles from "./page.module.css";
import { useGetSomethingByNameQuery } from "@redux/services/api";
import { setId } from "@redux/someData/reducer";
import { someDataSelector } from "@redux/someData/selector";
import { Skeleton } from "@components/Skeleton";
import { useSearchParams } from 'next/navigation';

export default function VkRedirect() {
  const searchParams = useSearchParams()
  const payload = searchParams.get('payload')

  console.log(payload);

  return (
    <main className={styles.main}>
      алё гараж
    </main>
  );
}
