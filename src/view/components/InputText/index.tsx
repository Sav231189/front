import s from './index.module.scss'
import {css} from "lib/customClassName";
import React, {HTMLAttributes, InputHTMLAttributes, useMemo} from "react";

interface PropsType extends InputHTMLAttributes<HTMLInputElement> {
    title: string
    value: string
    modes?: Array<'maxWidth'|'center'>
    change?: Function
}
export const InputText = (props: PropsType) => {
    const {title, placeholder = '', value, modes: modeProps = [''], change = (str: string) => {}, ...other} = props

    const modes = useMemo(() => {
        return modeProps.map(el => s[el])
    }, [modeProps])

    const changeHandler = (e:any) => {
        change(e.target.value)
    }

    return (
        <div className={css(s.InputText)}>
            <div className={css(s.title)}>{title}</div>
            <input placeholder={placeholder} type="text" value={value} className={css(s.input, ...modes)} onChange={changeHandler} {...other}/>
        </div>

    );
};
