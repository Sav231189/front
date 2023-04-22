import s from './style.module.scss'
import {css} from "lib/customClassName";
import {Button} from "view/components/button";
import {useNavigate, useParams} from "react-router-dom";

type PropsType = {
    category: {
        id: number,
        name: string,
        description: string,
        price: number
    }
}
export const CategoryItem = (props: PropsType) => {
    const {category} = props

    const {id} = useParams()
    const navigate = useNavigate()

    if (!id) return null
    return (
        <div className={css(s.CategoryItem)}>
            <div className={css(s.name)}>{category.name}</div>
            <div className={css(s.description)}>{category.description}</div>
            <div className={css(s.price)}>Цена: {category.price} Р</div>
            <div className={css(s.bayBtn)}>
                <Button text={`Купить    →`} modes={[`red`, `maxWidth`, `noRadius`]} click={() => navigate(`/tournament/${id}`)}/>
            </div>
        </div>
    );
};
