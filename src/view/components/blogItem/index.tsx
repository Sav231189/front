import s from './index.module.scss'
import {css} from "lib/customClassName";

type PropsType = {
    item: any
}
export const BlogItem = (props: PropsType) => {
    const {item} = props

    return (
        <div className={css(s.BlogItem)}>
            <img src={item.img} alt="image"/>
            <div className={css(s.title)}>{item.title}</div>
            <div className={css(s.bottom)}>
                <div>{item.category}</div>
            </div>
        </div>
    );
};
