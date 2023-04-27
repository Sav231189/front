import s from './style.module.scss'
import {css} from "lib/customClassName";
import {ResultType} from "types/ResultType";
import {ConfirmResultPopup} from "view/module/confirmResultPopup";
import {useState} from "react";

type PropsType = {
    result: ResultType
}
export const AdminResultItem = (props: PropsType) => {
    const {result} = props

    const [showPopup, setShowPopup] = useState({
        confirm: false
    })

    return (
        <div className={css(s.AdminResultItem)}>
            <div className={css(s.userName)}>
                <span>{result?.user?.profile?.firstName ?? `Имя не заполнено`}</span>
            </div>
            <div className={css(s.youtubeLink)}>
                {result.youtube}
            </div>
            <div className={css(s.status)}>
                {(() => {
                    switch (result?.status) {
                        case 'new':
                            return 'Ожидает заполнения';
                        case 'await':
                            return 'Ожидает проверки';
                        case 'access':
                            return 'Результат принят';
                        case 'reject':
                            return 'Результат не принят';
                        default:
                            return null
                    }
                })()}
                <svg className={css(s.icon, s[result?.status])} width="20" height="20" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.9 21.9L23.475 11.325L21.375 9.225L12.9 17.7L8.625 13.425L6.525 15.525L12.9 21.9ZM15 30C12.925 30 10.975 29.606 9.15 28.818C7.325 28.03 5.7375 26.9615 4.3875 25.6125C3.0375 24.2625 1.969 22.675 1.182 20.85C0.395 19.025 0.001 17.075 0 15C0 12.925 0.394 10.975 1.182 9.15C1.97 7.325 3.0385 5.7375 4.3875 4.3875C5.7375 3.0375 7.325 1.969 9.15 1.182C10.975 0.395 12.925 0.001 15 0C17.075 0 19.025 0.394 20.85 1.182C22.675 1.97 24.2625 3.0385 25.6125 4.3875C26.9625 5.7375 28.0315 7.325 28.8195 9.15C29.6075 10.975 30.001 12.925 30 15C30 17.075 29.606 19.025 28.818 20.85C28.03 22.675 26.9615 24.2625 25.6125 25.6125C24.2625 26.9625 22.675 28.0315 20.85 28.8195C19.025 29.6075 17.075 30.001 15 30Z"/>
                </svg>
            </div>
            <div className={css(s.change)} onClick={()=>setShowPopup(prev => ({...prev, confirm: true}))}>
                <svg width="21" height="20" viewBox="0 0 21 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.3 20L6.9 16.8C6.68333 16.7167 6.479 16.6167 6.287 16.5C6.095 16.3833 5.90767 16.2583 5.725 16.125L2.75 17.375L0 12.625L2.575 10.675C2.55833 10.5583 2.55 10.4457 2.55 10.337V9.663C2.55 9.55433 2.55833 9.44167 2.575 9.325L0 7.375L2.75 2.625L5.725 3.875C5.90833 3.74167 6.1 3.61667 6.3 3.5C6.5 3.38333 6.7 3.28333 6.9 3.2L7.3 0H12.8L13.2 3.2C13.4167 3.28333 13.621 3.38333 13.813 3.5C14.005 3.61667 14.1923 3.74167 14.375 3.875L17.35 2.625L20.1 7.375L17.525 9.325C17.5417 9.44167 17.55 9.55433 17.55 9.663V10.337C17.55 10.4457 17.5333 10.5583 17.5 10.675L20.075 12.625L17.325 17.375L14.375 16.125C14.1917 16.2583 14 16.3833 13.8 16.5C13.6 16.6167 13.4 16.7167 13.2 16.8L12.8 20H7.3ZM10.05 14C10.3333 14 10.571 13.904 10.763 13.712C10.955 13.52 11.0507 13.2827 11.05 13C11.05 12.7167 10.954 12.479 10.762 12.287C10.57 12.095 10.3327 11.9993 10.05 12C9.76667 12 9.529 12.096 9.337 12.288C9.145 12.48 9.04933 12.7173 9.05 13C9.05 13.2833 9.146 13.521 9.338 13.713C9.53 13.905 9.76733 14.0007 10.05 14ZM9.05 11H11.05V6H9.05V11Z"/>
                </svg>
            </div>
            {showPopup.confirm && <ConfirmResultPopup result={result} close={()=>setShowPopup(prev => ({...prev, confirm: false}))}/>}
        </div>
    );
};
