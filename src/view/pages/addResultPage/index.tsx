import s from './style.module.scss'
import {css} from "lib/customClassName";
import {useNavigate, useParams} from "react-router-dom";
import {Button} from "view/components/button";
import {taskThunk} from "store/task/thunk/taskThunk";
import {useThunks} from "lib/reduxHook";
import {useEffect} from "react";
import {getTaskListSelector} from "store/task/selector/getTaskList";
import {useSelector} from "react-redux";
import {TaskItem} from "view/components/taskItem";

export const AddResultPage = () => {
    const {id} = useParams()
    const navigate = useNavigate()

    const taskList = useSelector(getTaskListSelector)

    const {getList} = useThunks(taskThunk)
    useEffect(() => {
        getList(Number(id))
    },[])

    if (!id) return null
    return (
        <div className={css(s.AddResultPage)}>
            <div className={css(s.container)}>
                <div className={css(s.main)} >
                    <Button text={`←    Назад`} click={()=>navigate(`/tournament/${id}`)}/>
                    <div className={css(s.titlePage)}>ЗАНЕСЕНИЕ РЕЗУЛЬТАТОВ</div>
                    <div className={css(s.list)}>
                        {taskList?.map(task =>
                            <TaskItem key={task.id} task={task}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
