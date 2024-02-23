import styles from './styles.module.css';
import cn from 'classnames';

export default function Page() {
    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <h1 className='header'>Поиск донора</h1>
                <div className='divider'></div>
                <p className={styles.text}>
                    Прежде чем создать заявку на поиск донора для вашего питомца, внимательно ознакомьтесь с нашими рекомендациями и убедитесь, что поиск донора среди животных действительно необходим в вашей ситуации.
                </p>
                <h2 className='subtitle'>Когда поиск донора для животных оправдан?</h2>
                <p className={styles.text}>
                    – необходимы компоненты крови с ограниченным сроком хранения, такие как тромбоциты или плазма
                </p>
                <p className={styles.text}>
                    – ветеринарный врач выдал вам направление на поиск донора, в котором указаны нужные даты, количество необходимых доноров, тип донации, группа крови, резус-фактор и ветеринарная клиника, куда следует обратиться
                </p>
                <h2 className='subtitle'>
                    Как работает донорство для животных?
                </h2>
                <p className={styles.text}>
                    – в большинстве случаев кровь донора не переливают животному напрямую — после сдачи её разделяют на компоненты: тромбоциты, плазму и эритроциты. Ваш питомец получит тот компонент крови, который ему требуется.
                </p>
                <p className={styles.text}>
                    – в ветеринарных клиниках поддерживается необходимый запас донорских компонентов крови, формирующий так называемый банк крови для животных. Часто, когда речь идёт о поиске донора для конкретного животного, кровь используется для пополнения запасов банка взамен той, что была или будет использована
                </p>
            </div>  
            <div className={styles.buttonContainer}>
                <button className={cn('buttonLogin', styles.button)}>Cоздать заявку</button>
            </div>
        </div>
    )
}