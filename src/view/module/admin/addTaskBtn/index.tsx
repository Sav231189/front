import s from 'view/module/admin/addTaskBtn/style.module.scss'
import {css} from "lib/customClassName";
import {Button} from "view/components/button";
import {useState} from "react";
import {Popup} from 'view/components/popup';

export const AddTaskBtn = () => {
    const [isShowPopup, setIsShowPopup] = useState(false)

    return (
        <div className={css(s.AddTaskBtn)}>
            <Button text={`Добавить задачу`} modes={[`maxWidth`]} click={()=>setIsShowPopup(true)}/>
            {isShowPopup &&
                <Popup clickCloseBtnCallback={()=>setIsShowPopup(false)}>
                    <AddForm/>
                </Popup>
            }
        </div>
    );
};

const AddForm = () => {

    return (
        <div className={css(s.AddForm)}>
            AddForm
        </div>
    );
};
