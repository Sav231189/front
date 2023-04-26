import s from './style.module.scss'
import {css} from "lib/customClassName";
import {Button} from "view/components/button";
import {useNavigate, useParams} from "react-router-dom";
import {categoryListSelector} from "store/category/selector/getCategoryList";
import {useSelector} from "react-redux";
import {AdminCategoryItem} from "view/module/admin/adminCategoryItem";
import {useEffect} from "react";
import {useActions, useThunks} from "lib/reduxHook";
import {categoryThunk} from "store/category/thunk/categoryThunk";
import {AddCategoryBtn} from "view/module/admin/addCategoryBtn";
import {CategoryActions} from "store/category/reducer/CategoryReducer";
import loadGif from "view/assets/images/Load.gif";

export const CategoryList = () => {
    const {id} = useParams()
    const navigate = useNavigate()

    const categoryList = useSelector(categoryListSelector)

    const {setCategoryListAction} = useActions(CategoryActions)

    const {getAdminList} = useThunks(categoryThunk)

    useEffect(() => {
        if (!id) return
        getAdminList(Number(id))
        return () => {
            setCategoryListAction(null)
        }
    }, [])

    if (!id) {
        navigate(`/`)
    }
    return (
        <div className={css(s.CategoryList)}>

            <div className={css(s.container)}>
                <Button text={`←    Перейти к турниру`} click={()=>navigate(`/admin/tournament/edit/${id}`)}/>
                <div className={css(s.head)}>
                    <div className={css(s.headTitle)}>
                        Управление категориями
                    </div>
                    <AddCategoryBtn />
                </div>
                <div className={css(s.list)}>
                    {categoryList?.map(category =><AdminCategoryItem key={category.id} category={category}/>)}
                    {categoryList === null && <div className={css(s.loadingList)}>
                        <img src={loadGif} alt="load"/>
                        <span>Загрузка...</span>
                    </div>}
                </div>
            </div>
        </div>
    );
};
