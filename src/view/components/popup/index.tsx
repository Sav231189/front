import {ReactNode} from 'react';
import {createPortal} from 'react-dom';
import s from './style.module.scss'
import {css} from "lib/customClassName";

interface PropsType {
    children: ReactNode;
    element?: HTMLElement;
    clickCloseBtnCallback?: () => void
}

export const Popup = (props: PropsType) => {
    const {
        children,
        element = document.body,
        clickCloseBtnCallback = () => {}
    } = props;

    return createPortal(
        <div className={css(s.Popup)} >
            <div className={css(s.main)}>
                <div className={css(s.closeBtn)} onClick={()=>clickCloseBtnCallback()}>
                    <svg width='100%' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M29.6335 0.365983C29.3991 0.131644 29.0812 0 28.7497 0C28.4183 0 28.1004 0.131644 27.866 0.365983L14.9997 13.2322L2.13348 0.365983C1.89907 0.131644 1.58119 0 1.24973 0C0.918278 0 0.600393 0.131644 0.365983 0.365983C0.131644 0.600393 0 0.918278 0 1.24973C0 1.58119 0.131644 1.89907 0.365983 2.13348L13.2322 14.9997L0.365983 27.866C0.131644 28.1004 0 28.4183 0 28.7497C0 29.0812 0.131644 29.3991 0.365983 29.6335C0.600393 29.8678 0.918278 29.9995 1.24973 29.9995C1.58119 29.9995 1.89907 29.8678 2.13348 29.6335L14.9997 16.7672L27.866 29.6335C28.1004 29.8678 28.4183 29.9995 28.7497 29.9995C29.0812 29.9995 29.3991 29.8678 29.6335 29.6335C29.8678 29.3991 29.9995 29.0812 29.9995 28.7497C29.9995 28.4183 29.8678 28.1004 29.6335 27.866L16.7672 14.9997L29.6335 2.13348C29.8678 1.89907 29.9995 1.58119 29.9995 1.24973C29.9995 0.918278 29.8678 0.600393 29.6335 0.365983Z' fill='white'/>
                    </svg>
                </div>
                {children}
            </div>
        </div>
        , element)
};
