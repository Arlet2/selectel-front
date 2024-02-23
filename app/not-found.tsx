import Link from 'next/link'
import styles from './page.module.css';

export default function NotFound(){
  return (
    <>
      <title>Страница не найдена - petdonor.ru</title>
      <div className={styles.notfound}>
      <h2 className="header">Не найдено</h2>
      <p>Котик потерялся?</p>
        <Link href="/">
          <a className="linkBlue">Вернуть котика домой</a> {}
        </Link>
      </div>
    </>
  )
}