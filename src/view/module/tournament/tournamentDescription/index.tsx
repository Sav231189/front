import s from './style.module.scss'
import {css} from "lib/customClassName";

type PropsType = {
    text: string
}
export const TournamentDescription = (props: PropsType) => {
    const {text} = props

    return (
        <div className={css(s.TournamentDescription)}>
            <div className={css(s.title)}>
                О ТУРНИРЕ
            </div>
            {!!text.length && <div className={css(s.text)}>{text}</div>}
            {!text.length && <div className={css(s.emptyList)}>Информация о турнире не заполнена</div>}
        </div>
    );
};
