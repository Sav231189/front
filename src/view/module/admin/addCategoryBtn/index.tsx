import s from './style.module.scss'
import {css} from "lib/customClassName";
import {Button} from "view/components/button";
import {useState} from "react";
import {Popup} from 'view/components/popup';
import {EditCategoryForm} from "view/module/admin/editCategoryForm";

type PropsType = {

}
export const AddCategoryBtn = (props: PropsType) => {
    const {} = props

    const [isShowPopup, setIsShowPopup] = useState(false)

    return (
        <>
            <div className={css(s.AddCategoryBtn)}>
                <Button text={`Добавить +`} modes={[`maxWidth`, `red`]} click={() => setIsShowPopup(true)}/>
            </div>
            {isShowPopup &&
                <Popup clickCloseBtnCallback={() => setIsShowPopup(false)}>
                    <EditCategoryForm closePopup={()=>setIsShowPopup(false)}/>
                </Popup>
            }
        </>

    );
};
