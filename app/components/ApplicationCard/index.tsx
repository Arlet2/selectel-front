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
  const [ respondModalVisible, setRespondModalVisible ] = useState(false)
  const [ deleteDonorRequest ] = api.useDeleteDonorRequestMutation()

  function handleDelete() {
    deleteDonorRequest(data.id)
  }

  return (
    <div className={styles.card}>
      { modalVisible && <div className={styles.darkness} onClick={() => setModalVisible(false)}/> }
      { modalVisible && <EditModal data={data}/> }
      { respondModalVisible && <div className={styles.darkness} onClick={() => setRespondModalVisible(false)}/> }
      { respondModalVisible && <RespondModal onClose={() => setRespondModalVisible(false)} data={data}/> }
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
        <div className={styles.value}>{data.availableUntil}</div>
      </div>
      <div className={styles.stretcher}></div>
      {isMe && <div className={cn("linkBlue", styles.button)} onClick={() => setModalVisible(true)}>Редактировать</div>}
      {isMe && <div className={cn("linkPink", styles.button)} onClick={() => handleDelete()}>Удалить</div>}
      {!isMe && <div className={cn("linkBlue", styles.button)} onClick={() => setRespondModalVisible(true)}>Откликнуться</div>}
    </div> 
  )
}

function EditModal({data}: any) {
    const [ description, setDescription ] = useState(data.description);
    const [ vetAddress, setVetAddress ] = useState(data.vetAddress);
    const [ petType, setPetType ] = useState<api.PetType | undefined>(data.petType);
    const [ bloodType, setBloodType ] = useState<number | undefined>(data.bloodType);
    const [ bloodAmountMl, setBloodAmountMl ] = useState(data.bloodAmountMl);
    const [ availableUntil, setAvailableUntil ] = useState(data.availableUntil);

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


function RespondModal({data, onClose}: any) {
    const { data: userData } = api.useGetUserInfoQuery(data.userLogin)

    return (
        <div className={styles.modal}>
            <h1>Откликнуться на заявку</h1>
            <div className={styles.message}>Можешь связаться с владельцем по одному из следующих контактов:</div>
            {userData && <div>
              {userData.name && <div className={styles.infoRow}>
                <div className={styles.infoLabel}>Имя</div>
                <div className={styles.infoValue}>{userData.name}</div>
              </div>}
              {userData.surname && <div className={styles.infoRow}>
                <div className={styles.infoLabel}>Фамилия</div>
                <div className={styles.infoValue}>{userData.surname}</div>
              </div>}
              {userData.middleName && <div className={styles.infoRow}>
                <div className={styles.infoLabel}>Отчество</div>
                <div className={styles.infoValue}>{userData.middleName}</div>
              </div>}
              {userData.email && <div className={styles.infoRow}>
                <div className={styles.infoLabel}>E-mail</div>
                <div className={styles.infoValue}>{userData.email}</div>
              </div>}
              {userData.phone && <div className={styles.infoRow}>
                <div className={styles.infoLabel}>Телефон</div>
                <div className={styles.infoValue}>{userData.phone}</div>
              </div>}
              {userData.vkUserName && <div className={styles.infoRow}>
                <div className={styles.infoLabel}>VK</div>
                <a href={`https://${userData.vkUserName}`} target="_blank" rel="noopener noreferrer">
                  {userData.vkUserName}
                </a>
              </div>}
              {userData.tgUserName && <div className={styles.infoRow}>
                <div className={styles.infoLabel}>Telegram</div>
                <div className={styles.infoValue}>
                <a href={`tg://resolve?domain=${userData.tgUserName}`} target="_blank" rel="noopener noreferrer">
                  {userData.tgUserName}
                </a>
              </div>
              </div>}
            </div>}
            <button onClick={() => onClose()} className={cn("button", styles.modalButton)} type='submit'>ОК</button>
        </div>
    )
}


