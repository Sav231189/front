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
import {TaskType} from "types/TaskType";
import {TaskActions} from "store/task/reducer/TaskReducer";
import {getEditTaskSelector} from "store/task/selector/getEditTask";
import {taskThunk} from "store/task/thunk/taskThunk";

type PropsType = {
    closePopup: () => void
    taskItem?: TaskType,
    categoryId: number
}
export const EditTaskForm = (props: PropsType) => {
    const {closePopup, taskItem, categoryId} = props

    const [isNew, setIsNew] = useState<boolean | null>(null)

    const editTask = useSelector(getEditTaskSelector)

    const {setEditTaskAction} = useActions(TaskActions)

    const {create, update} = useThunks(taskThunk)

    useEffect(() => {

        if (!taskItem) {
            setEditTaskAction({
                category_id: Number(categoryId),
                name: '',
                description: '',
                isOpen: false,
                isHidden: true,
                taskTypeId: 1,

            })
            setTimeout(() => setIsNew(true), 1000)

        } else {
            setEditTaskAction(taskItem)
            setTimeout(() => setIsNew(false), 1000)
        }

        return () => {
            setEditTaskAction(null)
        }
    }, [])

    const changeFieldHandler = <T extends keyof TaskType>(field: T, value: T | string) => {
        if (!editTask) return;
        switch (field) {
            case 'name':
                setEditTaskAction({...editTask, name: value})
                break
            case 'description':
                setEditTaskAction({...editTask, description: value})
                break
            case 'isOpen':
                setEditTaskAction({...editTask, isOpen: value === `Открыта`})
                break
            case 'isHidden':
                setEditTaskAction({...editTask, isHidden: value !== `Виден участникам`})
                break
            case 'taskTypeId':
                setEditTaskAction({...editTask, taskTypeId: Number(value)})
                break
        }
    }
    const createTaskHandler = () => {
        setIsNew(null)
        create(() => {
            setIsNew(false)
            closePopup()
        })
    }
    const updateTaskHandler = () => {
        setIsNew(null)
        update((id:number) => {
            setIsNew(false)
            closePopup()
        })
    }

    return (
        <div className={css(s.EditTaskForm)}>
            <div className={css(s.head)}>
                {isNew === null ? `...` : isNew ? `Создание задания`:`Редактирование`}
            </div>
            <div className={css(s.main)}>
                <div className={css(s.form)}>
                    <InputText title={`Название задания`} value={editTask?.name ?? ''} change={str => changeFieldHandler('name', str)} placeholder={`Введите текст`} modes={[`maxWidth`]}/>
                    <InputText title={`Описание задания`} value={editTask?.description ?? ''} change={str => changeFieldHandler('description', str)} placeholder={`Введите текст`} modes={[`maxWidth`]}/>
                    <RadioButton title={`Подача результатов`} value={editTask?.isOpen ? `Открыта`:`Закрыта`} change={str => changeFieldHandler('isOpen', str)} list={[`Открыта`,`Закрыта`]}/>
                    <RadioButton title={`Не виден участникам`} value={editTask?.isHidden ? `Не виден участникам`:`Виден участникам`} change={str => changeFieldHandler('isHidden', str)} list={[`Не виден участникам`, `Виден участникам`]}/>
                    <div className={css(s.btnBox)}>
                        {isNew === null && <Button text={` `} modes={[`red`, `maxWidth`, `noRadius`]} />}
                        {isNew === false && <Button text={`Сохранить    →`} modes={[`red`, `maxWidth`, `noRadius`]} click={updateTaskHandler}/>}
                        {isNew === true && <Button text={`Создать    →`} modes={[`red`, `maxWidth`, `noRadius`]} click={createTaskHandler}/>}
                    </div>
                </div>
            </div>
            {isNew === null && <Skeleton mods={[`grey`]}/>}
        </div>
    );
};
