import s from './index.module.scss'
import {css} from "lib/customClassName";
import {useMemo} from "react";
import loadGif from '../../assets/images/Load.gif'

type PropsType = {
    text: string
    modes?: Array<'maxWidth'|'red'|'grey'|'uppercase'|'mobilSmall'|'noRadius'|'active'|''>
    click?: Function
    disable?: boolean
    isLoading?: boolean
}
export const Button = (props: PropsType) => {
    const {text, modes: modeProps = [''], click = () => {}, disable = false} = props
    let {isLoading}:any = !disable ? props : false

    const modes = useMemo(() => {
        return modeProps.map(el => s[el])
    }, [modeProps])

    const clickHandler = () => {
        click()
    }

    return (
        <button disabled={disable} className={css(s.Button, isLoading && s.isLoading, ...modes)} onClick={clickHandler}>
            <span>{text}</span>
            {isLoading && <img src={loadGif} alt="load"/>}
        </button>
    );
};
