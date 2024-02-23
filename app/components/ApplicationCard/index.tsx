import styles from './styles.module.css';

export const ApplicationCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.row}>
        <div className={styles.label}>Тип животного</div>
        <div className={styles.value}>Кошка</div>
      </div>
      <div className={styles.row}>
        <div className={styles.label}>Группа крови</div>
        <div className={styles.value}>15432</div>
      </div>
      <div className={styles.row}>
        <div className={styles.label}>Город</div>
        <div className={styles.value}>Омск</div>
      </div>
      <div className={styles.row}>
        <div className={styles.label}>Район</div>
        <div className={styles.value}>из которого не возвращаются</div>
      </div>
      <div className={styles.row}>
        <div className={styles.label}>Кол-во крови</div>
        <div className={styles.value}>1847 мл</div>
      </div>
      <div className={styles.row}>
        <div className={styles.label}>Актуально до</div>
        <div className={styles.value}>27.03.2004</div>
      </div>
      <div className={styles.button}>Редактировать</div>
      <div className={styles.button}>Удалить</div>
    </div> 
  )
}
