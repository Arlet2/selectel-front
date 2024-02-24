'use client'

import { useDispatch, useSelector } from "react-redux";
import styles from "./page.module.css";
import { Skeleton } from "@components/Skeleton";
import { useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react'
import { vkLogin } from '@/app/redux/services/api';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

function VkRedirectInner() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const payload = searchParams.get('payload')

  useEffect(() => {
    (async () => {
        try {
            const token = await vkLogin(payload || "{}");
            localStorage.setItem("accessToken", token.accessToken);
            localStorage.setItem("refreshToken", token.refreshToken);
            localStorage.setItem("login", token.login || "no");
            router.push(`/`);
        } catch (e) {
            toast.error(e as string);
        }
    })()
  }, [router, payload])

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
