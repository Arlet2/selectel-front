'use client'

import styles from "./page.module.css";
import cn from 'classnames';

/* главная страница, которая будет открываться по / */

export default function Home() {

  return (<>
    <title>О проекте - petdonor.ru</title>
    <div className={styles.container}>
        <div className={styles.textContainer}>
            <h1 className='header'>О проекте</h1>
            <div className='divider'></div>
            <p className={styles.textDefault}>
            Наш сервис представляет собой уникальную платформу, призванную <strong>спасать жизни наших четвероногих друзей</strong> , предоставляя возможность оперативно находить доноров крови для домашних животных.</p>
            <h2 className={styles.subtitle}>Как это работает?</h2>
            <div className={styles.allStepsContainer}>
              <div className={styles.stepContainerLower}>
                <div className={styles.blueNumber}>1</div>
                <div className={styles.content}>
                  <p className={styles.description}>Простая регистрация через соцсети или электронную почту. Укажите основные данные и настройте приватность контактов</p>
                  <h2 className={styles.blueTitle}>регистрация</h2>
                </div>
              </div>
              <div className={styles.stepContainerUpper}>
                <div className={styles.pinkNumber}>2</div>
                <div className={styles.content}>
                <h2 className={styles.pinkTitle}>профиль питомца</h2>
                  <p className={styles.description}>Создайте карточку для вашего животного с важной информацией: вид, порода, группа крови и прививки</p>
                </div>
              </div>
              <div className={styles.stepContainerUpper}>
                <div className={styles.content}>
                <h2 className={cn(styles.pinkTitle, styles.rightAlign)}>поиск донора</h2>
                  <p className={cn(styles.description, styles.selfRightAlign, styles.rightAlign)}>Подайте запрос на поиск донора, указав необходимые детали: причина, место, объем крови и срок</p>
                </div>
                <div className={styles.pinkNumber}>3</div>
              </div>
              <div className={styles.stepContainerLower}>
                <div className={styles.content}>
                  <p className={cn(styles.description, styles.selfRightAlign, styles.rightAlign)}>Подайте запрос на поиск донора, указав необходимые детали: причина, место, объем крови и срок</p>
                  <h2 className={cn(styles.blueTitle, styles.rightAlign)}>поиск донора</h2>
                </div>
                <div className={styles.blueNumber}>4</div>
              </div>
            </div>
            <h2 className={styles.subtitle}>
              Для чего этот сервис?
            </h2>
            <p className={styles.textDefault}>
            Наш сервис создан для упрощения поиска доноров крови для домашних животных, обеспечивая быструю помощь в критических ситуациях и спасая жизни питомцев.             </p>
            <p className={styles.textAccent}>
            <strong> Мы стремимся к созданию сильного сообщества взаимопомощи, где каждый может внести свой вклад!</strong>
            </p>
        </div>  
    </div>
</>)
}
