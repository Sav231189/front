import s from './style.module.scss'
import {css} from "lib/customClassName";
import {Button} from "view/components/button";
import {useNavigate, useParams} from "react-router-dom";
import {CategoryItem} from "view/module/categoryItem";
import {useActions, useThunks} from "lib/reduxHook";
import {categoryThunk} from "store/category/thunk/categoryThunk";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {categoryListSelector} from "store/category/selector/getCategoryList";
import {CategoryActions} from "store/category/reducer/CategoryReducer";
import loadGif from '../../assets/images/Load.gif'

export const SelectCategory = () => {
    const {id} = useParams()
    const navigate = useNavigate()

    const categoryList = useSelector(categoryListSelector)

    const {setCategoryListAction} = useActions(CategoryActions)

    const {getList} = useThunks(categoryThunk)

    useEffect(() => {
        if (!id) return
        getList(Number(id))
        return () => {
            setCategoryListAction(null)
        }
    }, [])

    if (!id) return null
    return (
        <div className={css(s.SelectCategory)}>
            <div className={css(s.container)}>
                <div className={css(s.main)} >
                    <Button text={`←    Назад`} click={()=>navigate(`/tournament/${id}`)}/>
                    <div className={css(s.titlePage)}>Выбор категории</div>
                    <div className={css(s.list)}>
                        {categoryList?.map(category => {
                            return <CategoryItem key={category.id} category={category}/>
                        })}
                        {categoryList?.length === 0 && <div>Список категорий пуст</div>}
                        {categoryList === null && <div className={css(s.loadingList)}>
                            <img src={loadGif} alt="load"/>
                            <span>Загрузка...</span>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    );
};
