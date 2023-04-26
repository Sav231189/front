import s from './style.module.scss'
import {css} from "lib/customClassName";
import {Button} from "view/components/button";
import {useState} from "react";
import {Popup} from 'view/components/popup';
import {EditCategoryForm} from "view/module/admin/editCategoryForm";
import {CategoryType} from "types/CategoryType";

type PropsType = {
    categoryItem: CategoryType
}
export const EditCategoryBtn = (props: PropsType) => {
    const {categoryItem} = props

    const [isShowPopup, setIsShowPopup] = useState(false)

    return (
        <>
            <div className={css(s.EditCategoryBtn)}>
                <Button text={`Редактировать`} modes={[`maxWidth`]} click={() => setIsShowPopup(true)}/>
            </div>
            {isShowPopup &&
                <Popup clickCloseBtnCallback={() => setIsShowPopup(false)}>
                    <EditCategoryForm categoryItem={categoryItem} closePopup={()=>setIsShowPopup(false)}/>
                </Popup>
            }
        </>

    );
};
