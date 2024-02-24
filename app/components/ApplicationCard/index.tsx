import styles from './styles.module.css';
import cn from 'classnames';
import * as api from '@/app/redux/services/api';
import { PetTypeSelector, BloodTypeSelector } from '@components/Selector';
import { useState } from "react"
import { useRouter } from 'next/navigation';

interface ApplicationCardProps {
  data: any
  isMe: boolean
}

export const ApplicationCard = ({data, isMe}: ApplicationCardProps) => {
  const [ modalVisible, setModalVisible ] = useState(false)

  return (
    <div className={styles.card}>
      { modalVisible && <div className={styles.darkness} onClick={() => setModalVisible(false)}/> }
      { modalVisible && <EditModal data={data}/> }
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
      {isMe && <div className={cn("linkBlue", styles.button)} onClick={() => setModalVisible(true)}>Редактировать</div>}
      {isMe && <div className={cn("linkPink", styles.button)}>Удалить</div>}
      {!isMe && <div className={cn("linkBlue", styles.button)}>Откликнуться</div>}
    </div> 
  )
}

function EditModal({data}: any) {
    const [ description, setDescription ] = useState(data.description);
    const [ vetAddress, setVetAddress ] = useState(data.vetAddress);
    const [ petType, setPetType ] = useState<api.PetType | undefined>(data.petType);
    const [ bloodType, setBloodType ] = useState<number | undefined>(data.bloodType);
    const [ bloodAmountMl, setBloodAmountMl ] = useState(data.bloodAmountMl);
    const [ availableUntil, setAvailableUntil ] = useState(data.availableUntil.join("-"));

    const [ changeDonorRequest ] = api.useChangeDonorRequestMutation()

    function submit(e: any) {
        e.preventDefault()

        if (!petType || !bloodType) return;

        (async () => {
          await changeDonorRequest({
              id: data.id,
              description,
              vetAddress,
              petTypeID: petType.id,
              bloodTypeID: bloodType,
              bloodAmountMl,
              availableUntil
          })
          window.location.reload();
        })()
    }

    return (
        <form className={styles.modal} onSubmit={submit}>
            <h1>Редактировать заявку</h1>
            <div className={styles.inputContainer}>
                <label className={styles.label}>Причина </label>
                <textarea required className="input textarea" placeholder="..." value={description} onChange={e => setDescription(e.target.value)}/>
            </div>
            <div className={styles.inputContainer}>
                <label className={styles.label}>Тип животного</label>
                <PetTypeSelector value={petType} onChange={(v) => {setPetType(v); setBloodType(0)}}/>
            </div>
            <div className={styles.inputContainer}>
                <label className={styles.label}>Группа крови</label>
                <BloodTypeSelector petType={petType} value={bloodType} onChange={(v) => setBloodType(v)}/>
            </div>
            <div className={styles.inputContainer}>
                <label className={styles.label}>Адрес вет. клиники</label>
                <input required type="text" className="input" placeholder="ул.Пушкина, д.Колотушкина" value={vetAddress} onChange={e => setVetAddress(e.target.value)}/>
            </div>
            <div className={styles.inputContainer}>
                <label className={styles.label}>Количество крови (мл)</label>
                <input required type="number" className="input" placeholder="0" value={bloodAmountMl} onChange={e => setBloodAmountMl(Number(e.target.value)) }/>
            </div>
            <div className={styles.inputContainer}>
                <label className={styles.label}>Дата окончания поиска</label>
                <input required type="date" className="input" value={availableUntil} onChange={e => setAvailableUntil(e.target.value)}/>
            </div>
            <button className={cn("button", styles.modalButton)} type='submit'>Сохранить заявку</button>
        </form>
    )
}
