import s from './style.module.scss'
import {css} from "lib/customClassName";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getEditCategorySelector} from "store/category/selector/getEditCategory";
import {useActions, useThunks} from "lib/reduxHook";
import {CategoryActions} from "store/category/reducer/CategoryReducer";
import {CategoryType} from "types/CategoryType";
import loadGif from "view/assets/images/Load.gif";
import {InputText} from "view/components/InputText";
import {RadioButton} from "view/components/RadioButton";
import {Button} from "view/components/button";
import {categoryThunk} from "store/category/thunk/categoryThunk";
import {Skeleton} from "view/components/skeleton";

type PropsType = {
    closePopup: () => void
    categoryItem?: CategoryType
}
export const EditCategoryForm = (props: PropsType) => {
    const {closePopup, categoryItem} = props

    const {id} = useParams()

    const [isNew, setIsNew] = useState<boolean | null>(null)

    const editCategory = useSelector(getEditCategorySelector)

    const {setEditCategoryAction} = useActions(CategoryActions)

    const {create, update} = useThunks(categoryThunk)

    useEffect(() => {

        if (!categoryItem) {
            setEditCategoryAction({
                tournamentId: Number(id),
                name: '',
                description: '',
                isSubmissionResult: false,
                isAccessBuy: false,
                isHidden: true,
                price: 0,
                taskList: []
            })
            setTimeout(() => setIsNew(true), 1000)

        } else {
            setEditCategoryAction(categoryItem)
            setTimeout(() => setIsNew(false), 1000)
        }

        return () => {
            setEditCategoryAction(null)
        }
    }, [])

    const changeFieldHandler = <T extends keyof CategoryType>(field: T, value: T | string) => {
        if (!editCategory) return;
        switch (field) {
            case 'name':
                setEditCategoryAction({...editCategory, name: value})
                break
            case 'description':
                setEditCategoryAction({...editCategory, description: value})
                break
            case 'isAccessBuy':
                setEditCategoryAction({...editCategory, isAccessBuy: value === `Доступен для покупки`})
                break
            case 'isHidden':
                setEditCategoryAction({...editCategory, isHidden: value === `Не виден в категориях`})
                break
            case 'isSubmissionResult':
                setEditCategoryAction({...editCategory, isSubmissionResult: value === `Открыта`})
                break
        }
    }
    const createCategoryHandler = () => {
        setIsNew(null)
        create(() => {
            setIsNew(false)
            closePopup()
        })
    }
    const updateCategoryHandler = () => {
        setIsNew(null)
        update((id:number) => {
            setIsNew(false)
            closePopup()
        })
    }

    console.log(isNew)

    // if (isNew === null || !editCategory) {
    //     return <div className={css(s.loadingList)}>
    //         <img src={loadGif} alt="load"/>
    //         <span>Загрузка...</span>
    //     </div>
    // }
    return (
        <div className={css(s.EditCategoryForm)}>
            <div className={css(s.head)}>
                {isNew === null ? `...` : isNew ? `Создание категории`:`Редактирование`}
            </div>
            <div className={css(s.main)}>
                <div className={css(s.form)}>
                    <InputText title={`Название категории`} value={editCategory?.name ?? ''} change={str => changeFieldHandler('name', str)} placeholder={`Введите текст`} modes={[`maxWidth`]}/>
                    <InputText title={`Описание категории`} value={editCategory?.description ?? ''} change={str => changeFieldHandler('description', str)} placeholder={`Введите текст`} modes={[`maxWidth`]}/>
                    <RadioButton title={`Покупка`} value={editCategory?.isAccessBuy ? `Доступен для покупки`:`Не доступен для покупки`} change={str => changeFieldHandler('isAccessBuy', str)} list={[`Доступен для покупки`,`Не доступен для покупки`]}/>
                    <RadioButton title={`Видимость`} value={editCategory?.isHidden ? `Не виден в категориях`:`Виден в категориях`} change={str => changeFieldHandler('isHidden', str)} list={[`Не виден в категориях`,`Виден в категориях`]}/>
                    <RadioButton title={`Подача результатов`} value={editCategory?.isSubmissionResult ? `Открыта`:`Закрыта`} change={str => changeFieldHandler('isSubmissionResult', str)} list={[`Открыта`,`Закрыта`]}/>
                    <div className={css(s.btnBox)}>
                        {!isNew && <Button text={`Сохранить    →`} modes={[`red`, `maxWidth`, `noRadius`]} click={updateCategoryHandler}/>}
                        {isNew && <Button text={`Создать    →`} modes={[`red`, `maxWidth`, `noRadius`]} click={createCategoryHandler}/>}
                    </div>
                </div>
            </div>
            {isNew === null && <Skeleton mods={[`grey`]}/>}
        </div>
    );
};
