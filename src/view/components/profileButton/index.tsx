import s from './index.module.scss'
import {css} from "lib/customClassName";
import {UserType} from "types/UserType";
import {ProfilePopup} from "view/module/profilePopup";
import {useEffect, useState} from "react";
import {useClickOutside} from "lib/useClickOutside";
import {useProfile} from "store/auth/hook/useProfile";

type PropsType = {
    user: UserType
}
export const ProfileButton = (props: PropsType) => {
    const {user} = props

    const [showPopup, setShowPopup] = useState(false)

    const profile = useProfile()

    useClickOutside(() => {
        // @ts-ignore
        // document.querySelector('#AppLayout').style.overflowY = 'auto'
        setShowPopup(false)
    }, [`ProfileButton`])

    useEffect(() => {
        if (showPopup && (window.innerWidth < 451)) document.body.style.overflow = 'hidden'
        else document.body.style.overflow = 'visible'
    }, [showPopup])

    const showHandler = () => {
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
        <div id={`ProfileButton`} className={css(s.ProfileButton)}>
            <div className={css(s.btnMain, showPopup && s.showPopup)} >
                <div className={css(s.btn)} onClick={showHandler}>
                    <div className={css(s.name)}>{profile?.firstName}</div>
                    <div className={css(s.iconBox, showPopup && s.open)}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 0C4.53514 0 3.33333 1.2018 3.33333 2.66667C3.33333 4.13153 4.53514 5.33333 6 5.33333C7.46486 5.33333 8.66667 4.13153 8.66667 2.66667C8.66667 1.2018 7.46486 0 6 0ZM6 1.33333C6.74428 1.33333 7.33333 1.92239 7.33333 2.66667C7.33333 3.41094 6.74428 4 6 4C5.25572 4 4.66667 3.41094 4.66667 2.66667C4.66667 1.92239 5.25572 1.33333 6 1.33333ZM6 7.33333C4.8367 7.33333 3.45811 7.60652 2.29948 8.0638C1.72016 8.29244 1.19646 8.56403 0.777344 8.91276C0.358223 9.26149 0 9.73292 0 10.3333V12H12V11.3333V10.3333C12 9.73292 11.6418 9.26149 11.2227 8.91276C10.8035 8.56403 10.2798 8.29244 9.70052 8.0638C8.54189 7.60652 7.1633 7.33333 6 7.33333ZM6 8.66667C6.9427 8.66667 8.2307 8.916 9.21224 9.30339C9.70301 9.49708 10.118 9.72798 10.3698 9.9375C10.6216 10.147 10.6667 10.2897 10.6667 10.3333V10.6667H1.33333V10.3333C1.33333 10.2897 1.37839 10.147 1.63021 9.9375C1.88203 9.72798 2.29699 9.49708 2.78776 9.30339C3.7693 8.916 5.0573 8.66667 6 8.66667Z" fill="#F1F1F1"/>
                        </svg>
                    </div>
                </div>
            </div>
            {showPopup && <div className={css(s.popupBox, showPopup && s.showPopup)}><ProfilePopup closePopup={()=>setShowPopup(false)}/></div>}
        </div>
    );
};
