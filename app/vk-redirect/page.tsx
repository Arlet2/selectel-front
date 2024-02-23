'use client'

import { useDispatch, useSelector } from "react-redux";
import styles from "./page.module.css";
import { useGetSomethingByNameQuery } from "@redux/services/api";
import { setId } from "@redux/someData/reducer";
import { someDataSelector } from "@redux/someData/selector";
import { Skeleton } from "@components/Skeleton";
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react'

function VkRedirectInner() {
  const searchParams = useSearchParams()
  const payload = searchParams.get('payload')

  console.log(payload);

  return (
    <main className={styles.main}>
      алё гараж
    </main>
  );
}

export default function VkRedirect() {
  return (
    <Suspense>
      <VkRedirectInner/>
    </Suspense>
  );
}
