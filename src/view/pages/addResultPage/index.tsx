import s from './style.module.scss'
import {css} from "lib/customClassName";
import {useNavigate, useParams} from "react-router-dom";
import {Button} from "view/components/button";
import {taskThunk} from "store/task/thunk/taskThunk";
import {useThunks} from "lib/reduxHook";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {TaskItem} from "view/components/taskItem";
import {categoryThunk} from "store/category/thunk/categoryThunk";
import {categoryListSelector} from "store/category/selector/getCategoryList";

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
                    {(categoryList?.length ?? 0) > 1 && <div>

                    </div>}
                    {categoryList?.map(category =>
                        <div key={category.id} className={css(s.list)}>
                            {category.taskList?.map(task =>
                                <TaskItem key={task.id} task={task}/>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
