import s from './style.module.scss'
import {css} from "lib/customClassName";
import {CategoryType} from "types/CategoryType";
import {useState} from "react";
import {AddTaskBtn} from "view/module/admin/addTaskBtn";
import {EditCategoryBtn} from "view/module/admin/editCategoryBtn";
import {EditTaskBtn} from "view/module/admin/editTaskBtn";
import {useThunks} from "lib/reduxHook";
import {taskThunk} from "store/task/thunk/taskThunk";
import loadGif from "view/assets/images/Load.gif";
import {TaskType} from "types/TaskType";

type PropsType = {
    category: CategoryType
}
export const AdminCategoryItem = (props: PropsType) => {
    const {category} = props

    const [isShowTaskList, setIsShowTaskList] = useState(false)

    const {getAdminList} = useThunks(taskThunk)

    const showTaskListHandler = () => {
        setIsShowTaskList(prev => !prev)
        if (category.taskList === null) {
            getAdminList(Number(category.id))
        }
    }

    return (
        <div className={css(s.CategoryItem)}>
            <div className={css(s.main)}>
                <div className={css(s.mainTop)}>
                    <span className={css(s.name)}>{category.name}</span>
                    <span className={css(s.changeBtn)}>
                        <EditCategoryBtn categoryItem={category}/>
                    </span>
                </div>
                <div className={css(s.description)}>
                    {category.description}
                </div>
            </div>
            <div className={css(s.taskList)}>
                <div className={css(s.listHeader, isShowTaskList && s.active)}
                     onClick={showTaskListHandler}>
                    Задания
                    <svg width="40" height="40" viewBox="0 0 12 8" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5.59021 7.15047L0.452036 2.0122C0.333101 1.89336 0.267578 1.73471 0.267578 1.56556C0.267578 1.3964 0.333101 1.23776 0.452036 1.11891L0.83034 0.740515C1.07685 0.494289 1.47749 0.494289 1.72363 0.740515L6.03836 5.05525L10.3579 0.735728C10.4768 0.616886 10.6354 0.55127 10.8044 0.55127C10.9737 0.55127 11.1322 0.616886 11.2513 0.735728L11.6295 1.11413C11.7484 1.23306 11.8139 1.39161 11.8139 1.56077C11.8139 1.72993 11.7484 1.88857 11.6295 2.00741L6.48659 7.15047C6.36728 7.26959 6.20798 7.33502 6.03864 7.33464C5.86864 7.33502 5.70943 7.26959 5.59021 7.15047Z"/>
                    </svg>
                </div>
                {isShowTaskList && <div className={css(s.list)}>
                    {category.taskList?.map((task, index) => <TaskItem key={task.id} task={task}/>)}
                    {category.taskList === null && <div className={css(s.loadingList)}>
                        <img src={loadGif} alt="load"/>
                        <span>Загрузка...</span>
                    </div>}
                    {!!category.taskList && !category.taskList.length && <div className={css(s.emptyList)}>
                        <span>Список заданий пуст</span>
                    </div>}
                    <div className={css(s.addBtnBox)}>
                        <AddTaskBtn categoryId={Number(category.id)}/>
                    </div>
                </div>}
            </div>
        </div>
    );
};

type TaskItemPropsType = {
    task: TaskType
}
export const TaskItem = (props: TaskItemPropsType) => {
    const {task} = props

    return (
        <div key={task.id} className={css(s.TaskItem)}>
            <div className={css(s.TaskItemHead)}>
                <span className={css(s.name)}><span>Название:</span>{task.name}</span>
                <div className={css(s.changeBtnBox)}><EditTaskBtn task={task}/></div>
            </div>
            <div className={css(s.TaskItemMain)}>
                <div className={css(s.description)}><span>Описание:</span>{task.description}</div>
            </div>
        </div>
    );
};
