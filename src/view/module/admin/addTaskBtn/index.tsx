import s from 'view/module/admin/addTaskBtn/style.module.scss'
import {css} from "lib/customClassName";
import {Button} from "view/components/button";
import {useState} from "react";
import {Popup} from 'view/components/popup';
import {EditTaskForm} from "view/module/admin/editTaskForm";

type PropsType = {
    categoryId: number
}
export const AddTaskBtn = (props: PropsType) => {
    const {categoryId} = props

    const [isShowPopup, setIsShowPopup] = useState(false)

    return (
        <div className={css(s.AddTaskBtn)}>
            <Button text={`Добавить задание`} modes={[`maxWidth`]} click={()=>setIsShowPopup(true)}/>
            {isShowPopup &&
                <Popup clickCloseBtnCallback={()=>setIsShowPopup(false)}>
                    <EditTaskForm closePopup={()=>setIsShowPopup(false)} categoryId={categoryId}/>
                </Popup>
            }
        </div>
    );
};
