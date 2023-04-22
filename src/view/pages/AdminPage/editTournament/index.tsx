import s from './style.module.scss'
import {css} from "lib/customClassName";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import loadGif from "view/assets/images/Load.gif";
import {InputText} from "view/components/InputText";
import {Button} from "view/components/button";
import {RadioButton} from "view/components/RadioButton";

export const EditTournament = () => {
    const {id} = useParams()

    const navigate = useNavigate()

    const [isNew, setIsNew] = useState<boolean | null>(null)
    const [tournament, setTournament] = useState<any>(null)

    useEffect(() => {
        if (!id) {
            setTournament({title: `new`})
            setIsNew(true)
        } else {
            setTournament({title: `editable`})
            setIsNew(false)
        }
    }, [])

    if (isNew === null) {
        return <div className={css(s.loadingList)}>
            <img src={loadGif} alt="load"/>
            <span>Загрузка...</span>
        </div>
    }
    return (
        <div className={css(s.EditTournament)}>
            <div className={css(s.head)}>
                {isNew ? 'Создание турнира':'Редактирование турнира'}
            </div>

            <div className={css(s.main)}>
                <div className={css(s.form)}>
                    {!isNew && <Button text={`Редактировать категории    →`} modes={[`maxWidth`, `noRadius`]} click={()=>navigate(`/admin/category-list/${id}`)}/>}
                    <InputText title={`Название турнира`} value={``} placeholder={`Введите текст`} modes={[`maxWidth`]}/>
                    <InputText title={`Описание турнира`} value={``} placeholder={`Введите текст`} modes={[`maxWidth`]}/>
                    <InputText title={`Дата проведения`} value={``} placeholder={`Введите текст`} modes={[`maxWidth`]}/>
                    <RadioButton title={`Тип турнира`} value={``} list={[`Online`,`Offline`]}/>
                    <RadioButton title={`Видимость`} value={``} list={[`Не виден в каталоге турниров`,`Виден в каталоге турниров`]}/>
                    <RadioButton title={`Турнирная таблица`} value={``} list={[`Не доступна`,`Доступна`]}/>
                    <RadioButton title={`Выборка`} value={``} list={[`Сейчас идет`,`Скоро старт`,`Завершен, ждет проверки`,`Завершен`]}/>
                    <InputText title={`Описание турнира`} value={``} placeholder={`Введите текст`} modes={[`maxWidth`]}/>
                    <InputText title={`Призы`} value={``} placeholder={`Введите текст`} modes={[`maxWidth`]}/>
                    <InputText title={`Правила`} value={``} placeholder={`Введите текст`} modes={[`maxWidth`]}/>
                    <div className={css(s.btnBox)}>
                        <Button text={`${isNew ? `Создать`:`Сохранить`}    →`} modes={[`red`, `maxWidth`, `noRadius`]}/>

                    </div>
                </div>
                <div className={css(s.avatar)}>
                    <div className={css(s.imgBox)}></div>
                    <Button text={`редактировать`}/>
                </div>
            </div>
        </div>
    );
};
