import s from './index.module.scss'
import {css} from "lib/customClassName";
import {UserType} from "types/UserType";
import {useEffect, useState} from "react";
import {useClickOutside} from "lib/useClickOutside";
import {BurgerPopup} from "view/module/burgerPopup";

type PropsType = {
    user: UserType
}
export const BurgerButton = (props: PropsType) => {
    const {user} = props

    const [showPopup, setShowPopup] = useState(false)

    useClickOutside(() => {
        // @ts-ignore
        // document.querySelector('#AppLayout').style.overflowY = 'auto'
        setShowPopup(false)
    }, [`BurgerButton`])

    useEffect(() => {
        if (showPopup && (window.innerWidth < 451)) document.body.style.overflow = 'hidden'
        else document.body.style.overflow = 'visible'
    }, [showPopup])

    const showHandler = () => {
        console.log(123)
        setShowPopup(prev => {
            // if (!prev) {
            //     // @ts-ignore
            //     if (window.innerWidth < 451) document.querySelector('#AppLayout').style.overflowY = 'hidden'
            // } else {
            //     // @ts-ignore
            //     document.querySelector('#AppLayout').style.overflowY = 'auto'
            // }
            return !prev
        })
    }

    return (
        <div id={`BurgerButton`} className={css(s.ProfileButton)}>
            <div className={css(s.btnMain, showPopup && s.showPopup)}>
                <div className={css(s.burger)} onClick={showHandler}>
                    <div/>
                    <div/>
                    <div/>
                </div>
            </div>
            {showPopup && <div className={css(s.popupBox, showPopup && s.showPopup)}><BurgerPopup/></div>}
        </div>
    );
};
