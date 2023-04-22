import s from './style.module.scss'
import {css} from "lib/customClassName";

type PropsType = {
    title: string
}
export const PositionBtn = (props: PropsType) => {
    const {title} = props

    return (
        <div className={css(s.PositionBtn)}>
            <div className={css(s.title)}>{title}</div>
            <div className={css(s.btnBox)}>
                <div className={css(s.prevBtn)}>←</div>
                <div className={css(s.nextBtn)}>→</div>
            </div>
        </div>
    );
};
