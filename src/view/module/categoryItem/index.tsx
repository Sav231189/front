import s from './style.module.scss'
import {css} from "lib/customClassName";
import {Button} from "view/components/button";
import {useNavigate, useParams} from "react-router-dom";
import {CategoryType} from "types/CategoryType";
import {LoginButton} from "view/components/loginButton";
import {useAuth} from "store/auth/hook/useAuth";
import {useProfile} from "store/auth/hook/useProfile";
import {useThunks} from "lib/reduxHook";
import {categoryThunk} from "store/category/thunk/categoryThunk";

type PropsType = {
    category: CategoryType
}
export const CategoryItem = (props: PropsType) => {
    const {category} = props

    const {id} = useParams()

    const navigate = useNavigate()

    const user = useAuth()

    const profile = useProfile()

    const {buyCategory} = useThunks(categoryThunk)

    const buyCategoryHandler = () => {
        buyCategory(Number(category.id), () => navigate(`/tournament/${id}`))
    }

    if (!id) return null
    return (
        <div className={css(s.CategoryItem)}>
            <div className={css(s.name)}>
                <span>{category.name}</span>
                {/*<div className={css(s.isOnline)}>*/}
                {/*    {category.isOnline ? <span className={css(s.true)}>ONLINE</span> :*/}
                {/*        <span className={css(s.false)}>OFFLINE</span>}*/}
                {/*</div>*/}
            </div>
            <div className={css(s.description)}>{category.description}</div>
            <div className={css(s.price)}>Цена: {category.price} Р</div>
            <div className={css(s.bayBtn)}>
                {!category.isPadeMe && user && !!user.id && <Button text={`${Number(category.price) === 0 ? `Бесплатно`:`Купить`}    →`} disable={!category.isAccessBuy} modes={[`red`, `maxWidth`, `noRadius`]} click={buyCategoryHandler}/>}
                {!!category.isPadeMe && <Button text={`Подать результаты`} modes={[`maxWidth`, `noRadius`]} click={() => navigate(`/tournament/add/${category.tournamentId}`)}/>}
                {user && !user.id && <LoginButton text={`Войти`}/>}
                {profile && !profile.isFilled && <Button text={'Заполнить профиль'} modes={[`uppercase`, `maxWidth`]} click={() => navigate(`/profile`)}/>}
            </div>
        </div>
    );
};
