'use client'

import { useDispatch, useSelector } from "react-redux";
import styles from "./page.module.css";
import { useGetSomethingByNameQuery } from "@redux/services/api";
import { Skeleton } from "@components/Skeleton";

/* главная страница, которая будет открываться по / */

export default function Home() {

  return (<>
    <title>О проекте - petdonor.ru</title>
    <div className={styles.container}>
        <div className={styles.textContainer}>
            <h1 className='header'>О проекте</h1>
            <div className='divider'></div>
            <p className={styles.text}>
            Наш сервис представляет собой уникальную платформу, призванную <strong>спасать жизни наших четвероногих друзей</strong> , предоставляя возможность оперативно находить доноров крови для домашних животных. Разработанная с любовью и заботой, наша платформа становится мостом между владельцами питомцев, которым требуется помощь, и добровольцами, готовыми поделиться жизненно важным ресурсом своих любимцев.            </p>
            <h2 className='subtitle'>Как это работает?</h2>
            <div className={styles.listContainer}>
              <p className={styles.text}>
                  <strong>1. Регистрация: </strong> Простая регистрация через соцсети или электронную почту. Укажите основные данные и настройте приватность контактов.
              </p>
              <p className={styles.text}>
              <strong> 2. Профиль питомца: </strong> Создайте карточку для вашего животного с важной информацией: вид, порода, группа крови и прививки.
              </p>
              <p className={styles.text}>
              <strong>3. Поиск донора: </strong> Подайте запрос на поиск донора, указав необходимые детали: причина, место, объем крови и срок.            
              </p>
              <p className={styles.text}>
              <strong>4. Фильтры поиска: </strong> Используйте удобные фильтры для поиска актуальных запросов на донорство по городу и типу животного
              </p>
            </div>
            <h2 className='subtitle'>
              Для чего этот сервис?
            </h2>
            <p className={styles.text}>
            Наш сервис создан для упрощения поиска доноров крови для домашних животных, обеспечивая быструю помощь в критических ситуациях и спасая жизни питомцев.             </p>
            <p className={styles.text}>
            <strong> Мы стремимся к созданию сильного сообщества взаимопомощи, где каждый может внести свой вклад.  </strong>
            </p>
        </div>  
    </div>
</>)
}
