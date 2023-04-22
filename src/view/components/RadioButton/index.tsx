import s from './style.module.scss'
import {css} from "lib/customClassName";
import {useMemo} from "react";

type PropsType = {
    title: string
    value: string
    list: Array<string>
    modes?: Array<'maxWidth'>
    change?: Function
}
export const RadioButton = (props: PropsType) => {
    const {title, value, modes: modeProps = [''], list, change = (str: string) => {}} = props

    const modes = useMemo(() => {
        return modeProps.map(el => s[el])
    }, [modeProps])

    const changeHandler = (str: string) => {
        change(str)
    }

    return (
        <div className={css(s.RadioButton, ...modes)}>
            <div className={css(s.title)}>{title}</div>
            <div className={css(s.list)}>
                {list.map((el, index) =>
                    <div className={css(s.element)} key={index} onClick={() => changeHandler(el)}>
                        <span className={css(value === el && s.active)}/>
                        {el}
                    </div>
                )}
            </div>
        </div>
    );
};
