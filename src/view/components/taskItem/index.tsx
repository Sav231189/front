import s from './style.module.scss'
import {css} from "lib/customClassName";
import {TaskType} from "types/TaskType";
import {Button} from "view/components/button";
import {useEffect, useState} from "react";

type PropsType = {
    task: TaskType
}
export const TaskItem = (props: PropsType) => {
    const {task} = props
    const [status, setStatus] = useState(task.result?.status)

    useEffect(()=>{
        setStatus(task.result?.status)
    },[task.result?.status])

    return (
        <div className={css(s.TaskItem, s[`${task.result?.status}`])}>
            <div className={css(s.title)}>
                <div className={css(s.name)}>{task.name}</div>
                <div className={css(s.status)}>
                    {(()=>{
                        switch (status) {
                            case 'await': return 'Ожидает проверки';
                            case 'access': return 'Результат принят';
                            case 'reject': return 'Результат не принят';
                            default: return null
                        }
                    })()}
                </div>
            </div>
            <div className={css(s.moreBtn)}>
                <Button text={'Подробнее'} modes={[`uppercase`,`mobilSmall`]}/>
            </div>
            <div className={css(s.main)}>
                <div className={css(s.resultBox)}>
                    <div className={css(s.link)}>
                        <label >
                            <span>Ссылка на видео (видео выполненного вами комплекса)</span>
                            <input type="text" placeholder={`https://`}/>
                        </label>
                    </div>
                    <div className={css(s.result)}>
                        result
                    </div>
                </div>
                <div className={css(s.btnBox)}>
                    <Button text={`Сохранить    →`} modes={[`red`,'noRadius', `maxWidth`]}/>
                </div>
            </div>
        </div>
    );
};
