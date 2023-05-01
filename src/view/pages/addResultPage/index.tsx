import s from './style.module.scss'
import {css} from "lib/customClassName";
import {useNavigate, useParams} from "react-router-dom";
import {Button} from "view/components/button";
import {useThunks} from "lib/reduxHook";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {TaskItem} from "view/components/taskItem";
import {categoryThunk} from "store/category/thunk/categoryThunk";
import {categoryListSelector} from "store/category/selector/getCategoryList";
import loadGif from "view/assets/images/Load.gif";

export const AddResultPage = () => {
    const {id} = useParams()
    const navigate = useNavigate()

    const categoryList = useSelector(categoryListSelector)

    const {getListWithTask} = useThunks(categoryThunk)

    useEffect(() => {
        getListWithTask(Number(id))
    },[])

    if (!id) return null
    return (
        <div className={css(s.AddResultPage)}>
            <div className={css(s.container)}>
                <div className={css(s.main)} >
                    <Button text={`←    Назад`} click={()=>navigate(`/tournament/${id}`)}/>
                    <div className={css(s.titlePage)}>ЗАНЕСЕНИЕ РЕЗУЛЬТАТОВ</div>
                    {categoryList !== null && categoryList?.map(category =>
                        <div key={category.id} className={css(s.list)}>
                            {category.taskList?.map(task =>
                                <TaskItem key={task.id} task={task}/>
                            )}
                            {category.taskList !== null && !category?.taskList?.length && <div className={css(s.emptyList)}>Нет доступных заданий</div>}
                        </div>
                    )}
                    {categoryList === null && <div className={css(s.loadingList)}>
                        <img src={loadGif} alt="load"/>
                        <span>Загрузка...</span>
                    </div>}
                    {categoryList !== null && !categoryList.length && <div className={css(s.emptyList)}>Нет доступных заданий</div>}
                </div>
            </div>
        </div>
    );
};
