import s from './style.module.scss'
import {css} from "lib/customClassName";
import {Button} from "view/components/button";
import {useNavigate, useParams} from "react-router-dom";
import {categoryListSelector} from "store/category/selector/getCategoryList";
import {useSelector} from "react-redux";
import {CategoryItem} from "view/module/admin/categoryItem";
import {useEffect} from "react";
import {useThunks} from "lib/reduxHook";
import {categoryThunk} from "store/category/thunk/categoryThunk";
import {AddCategoryBtn} from "view/module/admin/addCategoryBtn";

export const CategoryList = () => {
    const {id} = useParams()
    const navigate = useNavigate()

    const categoryList = useSelector(categoryListSelector)

    const {getAdminList} = useThunks(categoryThunk)

    useEffect(() => {
        if (!id) return
        getAdminList(Number(id))
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
                    {categoryList?.map(category =>
                        <CategoryItem key={category.id} category={category}/>
                    )}
                </div>
            </div>
        </div>
    );
};
