'use client'

import { useDispatch, useSelector } from "react-redux";
import styles from "./page.module.css";
import { useGetSomethingByNameQuery } from "@redux/services/api";
import { setId } from "@redux/someData/reducer";
import { someDataSelector } from "@redux/someData/selector";
import { Skeleton } from "@components/Skeleton";

export default function VkRedirect() {
  return (
    <main className={styles.main}>
      алё гараж
    </main>
  );
}
