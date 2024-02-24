import styles from './styles.module.css';

interface ApplicationCardProps {
  data: object
}

export const ApplicationCard = ({data}: ApplicationCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.row}>
        <div className={styles.label}>Тип животного</div>
        <div className={styles.value}>{data.petType.type}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.label}>Группа крови</div>
        <div className={styles.value}>{data.bloodType.bloodType == 'default' ? 'Не важна' : data.bloodType.bloodType}</div>
      </div>
      {data.location && <div className={styles.row}>
        <div className={styles.label}>Город</div>
        <div className={styles.value}>{data.location.city}</div>
      </div>}
      {data.location && data.location.district && <div className={styles.row}>
        <div className={styles.label}>Район</div>
        <div className={styles.value}>{data.location.district}</div>
      </div>}
      <div className={styles.row}>
        <div className={styles.label}>Вет. клиника</div>
        <div className={styles.value}>{data.vetAddress}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.label}>Кол-во крови</div>
        <div className={styles.value}>{data.bloodAmountMl} мл</div>
      </div>
      <div className={styles.row}>
        <div className={styles.label}>Актуально до</div>
        <div className={styles.value}>{data.availableUntil.join("-")}</div>
      </div>
      <div className={styles.button}>Редактировать</div>
      <div className={styles.button}>Удалить</div>
    </div> 
  )
}
