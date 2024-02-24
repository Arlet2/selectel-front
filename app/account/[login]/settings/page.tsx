'use client'

import { useId, useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Image from 'next/image';
import Tooltip from '@mui/material/Tooltip';
import QuestionIcon from '@mui/icons-material/QuestionMark';
import IconButton from '@mui/material/IconButton';
import avatarIcon from '@icons/avatar.svg';
import dogImage from '@images/dog.png';
import styles from './styles.module.css';
import cn from 'classnames';
import { IUpdateUser, useUpdateUserInfoMutation, City, District, useGetUserInfoQuery, useGetUnavailableDatesQuery, useAddUnavailableDatesMutation, IUnavailableDates } from '@/app/redux/services/api';
import { CitySelector, DistrictSelector } from '@/app/components/Selector';
import * as api from '@/app/redux/services/api';

interface IPageProps{
    params: {
        login: string;
    }
}

function Modal() {
    const [ oldPassword, setOldPassword ] = useState("");
    const [ newPassword, setNewPassword ] = useState("");

    const [ changePassword, result ] = api.useChangePasswordMutation();

    async function submit(e: any) {
        e.preventDefault()

        if (oldPassword == "" || newPassword == "") return;

        changePassword({
            oldPassword,
            newPassword
        })
        try {
            await changePassword({
                oldPassword,
                newPassword
            });
            toast.success('Пароль обновлен')
        } catch (error) {
            console.error('Ошибка обновления паролия:', error);
            toast.error('Старый пароль неверный.')
        }
    }

    return (
        <form className={styles.modal} onSubmit={submit}>
            <h1>Изменение пароля</h1>
            <div className={styles.inputContainerModal}>
                    <div className={styles.inputContainer}>
                        <div className={styles.inputContainer}>
                            <label className={styles.modaLabel}>Старый пароль</label>
                            <input className='input' type='password' required placeholder='*****' value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className={styles.inputContainer}>
                        <div className={styles.inputContainer}>
                            <label className={styles.modaLabel}>Новый пароль</label>
                            <input className='input' type='password' required placeholder='*****' value={newPassword} onChange={e => setNewPassword(e.target.value)}/>
                        </div>
                    </div>
            </div>
            <button className={cn("button", styles.modalButton)} type='submit'>Сохранить</button>
        </form>
    )
}

export default function Page({ params: { login } }: IPageProps) {
    const [ modalVisible, setModalVisible ] = useState(false)
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [showEmail, setShowEmail] = useState(false);
    const [showPhone, setShowPhone] = useState(false);
    const [vk, setVk] = useState('');
    const [tg, setTg] = useState('');
    const [city, setCity] = useState<City>();
    const [district, setDistrict] = useState<District>();
    const [avatarSrc, setAvatarSrc] = useState<any>();

    const { data: userInfo, isLoading: isUserInfoLoading } = useGetUserInfoQuery(login);
    const { data: unavailableDatesInfo, isLoading: isUnavailableDatesLoading } = useGetUnavailableDatesQuery();
    const [updateUserInfo, { isLoading }] = useUpdateUserInfoMutation();
    const [addUnavailableDates] = useAddUnavailableDatesMutation();
    const [addAvatar] = api.useAddAvatarMutation();

    const avatarId = useId()    
    const imageRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        if (!isUserInfoLoading && userInfo) {
            setPhone(userInfo.phone);
            setName(userInfo.name);
            setSurname(userInfo.surname);
            setLastName(userInfo.middleName);
            setVk(userInfo.vkUserName);
            setTg(userInfo.tgUserName);
            setShowEmail(userInfo.emailVisibility);
            setShowPhone(userInfo.phoneVisibility);
            setEmail(userInfo.email);
            setAvatarSrc(userInfo.avatar);
            if (userInfo.location) {
                setCity({ id: userInfo.location.id, city: userInfo.location.city })
                setDistrict(userInfo.location)
            }
        }
    }, [isUserInfoLoading, userInfo]);

    useEffect(() => {
        if (!isUnavailableDatesLoading && unavailableDatesInfo){
            setStartDate(unavailableDatesInfo.startDate);
            setEndDate(unavailableDatesInfo.endDate);
            console.log(unavailableDatesInfo);
        }
    }, [unavailableDatesInfo, isUnavailableDatesLoading]);

    const updateEndDate = (newEndDate: string) => {
        if (newEndDate >= startDate) {
            setEndDate(newEndDate);
        } else {
            toast.error("Конец периода не может быть раньше начала периода.")
        }
    };

    const handleSave = async () => {
        if (imageRef && imageRef.current && (imageRef.current as any).files[0]) {
            let file = (imageRef.current as any).files[0];
            addAvatar(file)
        }

        const userInfo: Partial<IUpdateUser> = {
            email,
            phone,
            surname,
            name,
            lastName,
            locationId: district?.id,
            emailVisibility: showEmail,
            phoneVisibility: showPhone,
            tgUserName: tg,
            vkUserName: vk,
        };

        const unavailableDatesFromUser: IUnavailableDates = {
            startDate,
            endDate
        }

        try {
            await updateUserInfo(userInfo).unwrap();
            try {
                await addUnavailableDates(unavailableDatesFromUser).unwrap();
                toast.success('Информация дат недоступности обновлена!')
            }
            catch (error) {
                console.error('Ошибка обновления дат недоступности:', error);
                toast.error('Ошибка обновления дат недоступности. Пожалуйста, попробуйте снова.')
            }
            toast.success('Информация обновлена успешно!')
        } catch (error) {
            console.error('Ошибка обновления информации:', error);
            toast.error('Ошибка обновления информации. Пожалуйста, попробуйте снова.')
        }
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
    const handleSurnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSurname(e.target.value);
    };
    const handleMiddlenameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
    };
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value);
    };
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const handleVkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVk(e.target.value);
    };
    const handleTgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTg(e.target.value);
    };

    function onImageChange(e: any) {
        let reader = new FileReader();
        reader.onload = (ee: any) => {
            setAvatarSrc(ee.target.result);
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    return (<>
        <title>Настройки профиля - petdonor.ru</title>
        <div className={styles.container}>
            { modalVisible && <div className={styles.darkness} onClick={() => setModalVisible(false)}/> }
            { modalVisible && <Modal/> }
            <div className={styles.settingsContainer}>
                <div className={styles.headerContainer}>
                    <h1 className='header'>Настройка профиля</h1>
                    <div className={styles.subtitleContainer}>
                        <div className='divider'></div>
                    </div>
                </div>
                <form className={styles.formContainer}>
                    <div className={styles.topContainer}>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>Почта</label>
                            <input className='input' type='email' placeholder='mymail@mail.ru' value={email} onChange={handleEmailChange}/>
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>Номер телефона</label>
                            <input className='input' type='tel' placeholder='+7-(9xx)-xxx-xx-xx' value={phone} onChange={handlePhoneChange}/>
                        </div>
                    </div>
                    <div className={styles.checkboxContainer}>
                        <input className={styles.checkbox} type='checkbox' checked={showEmail} onChange={() => setShowEmail(!showEmail)}/>
                        <label className={styles.labelCheckbox} onClick={() => setShowEmail(!showEmail)}>Показывать почту в профиле</label>
                    </div>
                    <div className={styles.checkboxContainer}>
                        <input className={styles.checkbox} type='checkbox' checked={showPhone} onChange={() => setShowPhone(!showPhone)}/>
                        <label className={styles.labelCheckbox} onClick={() => setShowPhone(!showPhone)}>Показывать телефон в профиле</label>
                    </div>
                    <button
                        type='button'
                        className={cn('linkPink', styles.linkPink)}
                        onClick={(e) => {
                            e.preventDefault();
                            setModalVisible(true);
                        }}
                    >
                        Сменить пароль
                    </button>
                    <div className='dividerThin'></div>
                    <div className={styles.topContainer}>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>Аватар</label>
                            <label htmlFor={avatarId}>
                                <button className={styles.avatar}>
                                    {!avatarSrc && <Image src={avatarIcon} alt='Avatar icon'/>}
                                    {avatarSrc && <img src={avatarSrc}/>}
                                </button>
                                <input className={styles.fileInput} type="file" id={avatarId} accept=".jpg, .jpeg, .png" ref={imageRef} onChange={onImageChange} />
                            </label>
                        </div>
                    </div>
                    <div className={styles.topContainer}>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>Имя</label>
                            <input className='input' type='text' placeholder='Иван' value={name} onChange={handleNameChange}/>
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>Фамилия</label>
                            <input className='input' type='text' placeholder='Иванов' value={surname} onChange={handleSurnameChange}/>
                        </div>
                    </div>
                    <div className={styles.topContainer}>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>Отчество</label>
                            <input className='input' type='email' placeholder='Иванович' value={lastName} onChange={handleMiddlenameChange}/>
                        </div>
                    </div>
                    <div className='dividerThin'></div>
                    <div className={styles.bottomContainer}>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>Город</label>
                            <CitySelector value={city} onChange={(v) => setCity(v)}/>
                        </div>
                    </div>
                    <div className={styles.bottomContainer}>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>Район</label>
                            <DistrictSelector value={district} city={city} onChange={(v) => setDistrict(v)}/>
                        </div>
                    </div>
                    <div className='dividerThin'></div>
                    <label className={styles.label}>Социальные сети</label>
                    <div className={styles.topContainer}>
                        <div className={styles.inputContainer}>
                            <input className='input' type='text' placeholder='Телеграм' value={tg} onChange={handleTgChange}/>
                        </div>
                        <div className={styles.inputContainer}>
                            <input className='input' type='text' placeholder='Ссылка на ВКонтакте' value={vk} onChange={handleVkChange}/>
                        </div>
                    </div>
                    <div className='dividerThin'></div>
                    <div className={styles.labelContainer}>
                        <label className={styles.label}><strong>Период недоступности</strong></label>  
                        <Tooltip title="Если вы будете недоступны (например, уезжаете в отпуск). Добавьте период, когда вас не беспокоить">
                            <IconButton className={styles.questionMarkBackground}>
                                <QuestionIcon className={styles.questionMark} />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div className={styles.topContainer}>
                        <div className={styles.inputContainer}>
                        <label className={styles.label}>Начало</label>
                        <input
                            className='input'
                            type='date'
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.label}>Конец</label>
                            <input
                                className='input'
                                type='date'
                                value={endDate}
                                onChange={(e) => updateEndDate(e.target.value)}
                            />
                        </div>
                    </div>
                    <button className={cn(styles.submit, 'submitButton')} type='submit' onClick={handleSave} disabled={isLoading}>Сохранить</button>
                </form>
            </div>
            <div className={styles.backgroundContainer}>
                <Image className={styles.backgroundImage} src={dogImage} alt='Dog image'/>
            </div>
        </div>
    </>)
}
