import s from './index.module.scss'
import {css} from "lib/customClassName";
import {useMemo} from "react";

type PropsType = {
    text: string
    modes?: Array<'maxWidth'|'red'|'grey'|'uppercase'|'mobilSmall'|'noRadius'>
    click?: Function
}
export const Button = (props: PropsType) => {
    const {text, modes: modeProps = [''], click = () => {}} = props

    const modes = useMemo(() => {
        return modeProps.map(el => s[el])
    }, [modeProps])

    const clickHandler = () => {
        click()
    }

    return (
        <button className={css(s.Button, ...modes)} onClick={clickHandler}>
            <span>{text}</span>
        </button>
    );
};
