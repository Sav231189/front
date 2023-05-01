import s from './style.module.scss'
import {css} from "lib/customClassName";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import loadGif from "view/assets/images/Load.gif";
import {InputText} from "view/components/InputText";
import {Button} from "view/components/button";
import {RadioButton} from "view/components/RadioButton";
import {TournamentType} from "types/TournamentType";
import {useSelector} from "react-redux";
import {getEditTournamentSelector} from "store/tournament/selector/getEditTournament";
import {useActions, useThunks} from "lib/reduxHook";
import {TournamentActions} from "store/tournament/reducer/tournamentReducer";
import {tournamentThunk} from "store/tournament/thunk/tournamentThunk";
import tournament_item from "view/assets/images/tounamentItem/tournament_item.png";
import {getNewLogoTournamentSelector} from "store/tournament/selector/getNewLogoTournament";
import {onFocus} from "@reduxjs/toolkit/dist/query/core/setupListeners";

export const EditTournament = () => {
    const {id} = useParams()

    const navigate = useNavigate()

    const editTournament = useSelector(getEditTournamentSelector)

    const newLogoTournament = useSelector(getNewLogoTournamentSelector)

    const [isNew, setIsNew] = useState<boolean | null>(null)

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const {setEditTournamentAction, setNewLogoAction} = useActions(TournamentActions)

    const {getAdminTournamentItem, createTournamentItem, updateTournamentItem} = useThunks(tournamentThunk)

    useEffect(() => {
        if (!id) {
            setEditTournamentAction({
                img: '',
                name: '',
                descriptionSmall: '',
                startDate: '',
                isOnline: false,
                isHidden: true,
                isShowTable: false,
                status: 'Скоро старт',
                description: '',
                prize: '',
                rules: '',
                paidMe: [],
            })
            setIsNew(true)
        } else {
            getAdminTournamentItem(Number(id))
            setIsNew(false)
        }
        return () => {
            setEditTournamentAction(null)
        }
    }, [])

    useEffect(() => {
        if (isNew === false && !id) {
            navigate(`/admin/tournament`)
        }
    }, [isNew, id])

    const changeFieldHandler = <T extends keyof TournamentType>(field: T, value: T | string) => {
        if (!editTournament) return;
        switch (field) {
            case 'name':
                setEditTournamentAction({...editTournament, name: value})
                break
            case 'descriptionSmall':
                setEditTournamentAction({...editTournament, descriptionSmall: value})
                break
            case 'startDate':
                setEditTournamentAction({...editTournament, startDate: value})
                break
            case 'isOnline':
                setEditTournamentAction({...editTournament, isOnline: value === `Online`})
                break
            case 'isHidden':
                setEditTournamentAction({...editTournament, isHidden: value === `Не виден в каталоге турниров`})
                break
            case 'isShowTable':
                setEditTournamentAction({...editTournament, isShowTable: value === `Доступна`})
                break
            case 'status':
                setEditTournamentAction({...editTournament, status: value})
                break
            case 'description':
                setEditTournamentAction({...editTournament, description: value})
                break
            case 'prize':
                setEditTournamentAction({...editTournament, prize: value})
                break
            case 'rules':
                setEditTournamentAction({...editTournament, rules: value})
                break
            default:
                return
        }
    }

    const createTournamentHandler = async () => {
        setIsLoading(true)
        await createTournamentItem((id: number) => {
            navigate(`/admin/tournament/edit/${id}`)
            setIsNew(false)
        })
        setIsLoading(false)
    }
    const updateTournamentHandler = async () => {
        setIsLoading(true)
        await updateTournamentItem((id: number) => {

        })
        setIsLoading(false)
    }
    const changeLogoFilesHandler = (e: any) => {
        if (e.target.files && e.target.files[0]) {
            setNewLogoAction(e.target.files[0]);
        }
    }

    if (isNew === null || !editTournament) {
        return <div className={css(s.loadingList)}>
            <img src={loadGif} alt="load"/>
            <span>Загрузка...</span>
        </div>
    }
    return (
        <div className={css(s.EditTournament)}>
            <div className={css(s.head)}>
                {isNew ? 'Создание турнира' : 'Редактирование турнира'}
            </div>
            {!isNew && <div className={css(s.editCategoryBtn)}>
                <Button text={`Редактировать категории    →`} modes={[`maxWidth`, `noRadius`, `grey`]}
                        click={() => navigate(`/admin/tournament/category-list/${id}`)}/>
            </div>}
            <div className={css(s.main)}>
                <div className={css(s.form, isLoading && s.disable)}>
                    <InputText title={`Название турнира`} value={editTournament.name}
                               change={str => changeFieldHandler('name', str)} placeholder={`Введите текст`}
                               modes={[`maxWidth`]}/>
                    <InputText title={`Описание турнира`} value={editTournament.descriptionSmall}
                               change={str => changeFieldHandler('descriptionSmall', str)} placeholder={`Введите текст`}
                               modes={[`maxWidth`]}/>
                    <InputText title={`Дата проведения`} value={editTournament.startDate}
                               change={str => changeFieldHandler('startDate', str)} placeholder={`Введите текст`}
                               modes={[`maxWidth`]}/>
                    <RadioButton title={`Тип турнира`} value={editTournament.isOnline ? `Online` : `Offline`}
                                 change={str => changeFieldHandler('isOnline', str)} list={[`Offline`, `Online`]}/>
                    <RadioButton title={`Видимость`}
                                 value={editTournament.isHidden ? `Не виден в каталоге турниров` : `Виден в каталоге турниров`}
                                 change={str => changeFieldHandler('isHidden', str)}
                                 list={[`Не виден в каталоге турниров`, `Виден в каталоге турниров`]}/>
                    <RadioButton title={`Турнирная таблица`}
                                 value={editTournament.isShowTable ? `Доступна` : `Не доступна`}
                                 change={str => changeFieldHandler('isShowTable', str)}
                                 list={[`Не доступна`, `Доступна`]}/>
                    <RadioButton title={`Выборка`} value={editTournament.status}
                                 change={str => changeFieldHandler('status', str)}
                                 list={[`Скоро старт`, `Сейчас идет`, `Завершен, ждет проверки`, `Завершен`]}/>
                    <InputText title={`Описание турнира`} value={editTournament.description}
                               change={str => changeFieldHandler('description', str)} placeholder={`Введите текст`}
                               modes={[`maxWidth`]}/>
                    <InputText title={`Призы`} value={editTournament.prize}
                               change={str => changeFieldHandler('prize', str)} placeholder={`Введите текст`}
                               modes={[`maxWidth`]}/>
                    <InputText title={`Правила`} value={editTournament.rules}
                               change={str => changeFieldHandler('rules', str)} placeholder={`Введите текст`}
                               modes={[`maxWidth`]}/>
                    <div className={css(s.btnBox)}>
                        {!isNew && <Button text={`Сохранить    →`} isLoading={isLoading} modes={[`red`, `maxWidth`, `noRadius`]}
                                           click={updateTournamentHandler}/>}
                        {isNew && <Button text={`Создать    →`} isLoading={isLoading} modes={[`red`, `maxWidth`, `noRadius`]}
                                          click={createTournamentHandler}/>}
                    </div>
                </div>
                <div className={css(s.avatar)}>
                    <div className={css(s.imgBox)}>
                        {newLogoTournament === null && editTournament.img === '' &&
                            <img src={tournament_item} alt="tournament_item"/>}
                        {newLogoTournament === null && editTournament.img !== '' &&
                            <img src={`http://localhost:7000/upload/` + editTournament.img} alt="tournament_item"/>}
                        {newLogoTournament !== null && <img src={`${newLogoTournament}`} alt="tournament_item"/>}
                    </div>
                    <label className={css(s.changeFile, isLoading && s.disable)}>
                        <div className={css(s.fileName)}> редактировать</div>
                        <input className={css(s.inputLogo)} type="file" accept={'.png'} multiple={false}
                               onChange={changeLogoFilesHandler}/>
                    </label>
                    {/*<Button text={`редактировать`}/>*/}
                </div>
            </div>
        </div>
    );
};
