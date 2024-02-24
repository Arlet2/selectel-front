'use client'

import { useDispatch, useSelector } from "react-redux";
import styles from "./page.module.css";
import { Skeleton } from "@components/Skeleton";
import { useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react'

function VkRedirectInner() {
  const searchParams = useSearchParams()
  const payload = searchParams.get('payload')

  useEffect(() => {
    (async () => {
        try {
            const token = await doLogin({ login, password });
            localStorage.setItem("accessToken", token.accessToken);
            localStorage.setItem("refreshToken", token.refreshToken);
            localStorage.setItem("login", login);
            router.push(`/`);
        } catch (e) {
            toast.error(e as string);
        }
    })()
  }, [searchParams])

  api.loginVK()

  return (<>
    <title>Перенаправление - petdonor.ru</title>
    <main className={styles.main}>
      алё гараж
    </main>
  </>);
}

export default function VkRedirect() {
  return (
    <Suspense>
      <VkRedirectInner/>
    </Suspense>
  );
}
