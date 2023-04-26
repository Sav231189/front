import s from './style.module.scss'
import {css} from "lib/customClassName";
import {useState} from "react";
import {Popup} from 'view/components/popup';
import {EditTaskForm} from "view/module/admin/editTaskForm";
import {TaskType} from "types/TaskType";

type PropsType = {
    task: TaskType
}
export const EditTaskBtn = (props: PropsType) => {
    const {task} = props

    const [isShowPopup, setIsShowPopup] = useState(false)

    return (
        <div className={css(s.EditTaskBtn)}>
            <span onClick={()=>setIsShowPopup(true)}>изменить</span>
            {isShowPopup &&
                <Popup clickCloseBtnCallback={()=>setIsShowPopup(false)}>
                    <EditTaskForm closePopup={()=>setIsShowPopup(false)} categoryId={task.category_id} taskItem={task}/>
                </Popup>
            }
        </div>
    );
};
