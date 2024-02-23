import Link from 'next/link'
import styles from './page.module.css';

/* страница 404 */
 
export default function NotFound(){
  return (<>
    <title>Страница не найдена - petdonor.ru</title>
    <div className={styles.notfound}>
      <h2 className="header">Не найдено</h2>
      <p>Котик потерялся?</p>
      <Link href="/" className="lingBlue">Вернуть котика домой</Link>
    </div>
  </>)
}
