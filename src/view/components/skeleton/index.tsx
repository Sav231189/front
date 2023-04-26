import React, {HTMLAttributes, useMemo} from 'react';
import s from './index.module.scss'
import {css} from "lib/customClassName";


interface propsType extends HTMLAttributes<HTMLElement>{
    mods?:Array<'red'|'white'|'grey'|'low'|'medium'|'fast'>,
}
export const Skeleton = (props:propsType) => {
    const {mods = [],...anyProps} = props

    const classes = useMemo(() => {
        return mods.map(el => s[el])
    }, [mods])

    return (
        <div className={css(s.Skeleton, ...classes)} {...anyProps}/>
    )
}
