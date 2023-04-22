import {AppDispatch, RootState} from "store/ReduxStore";
import {TaskActions} from "store/task/reducer/TaskReducer";
import {TaskType} from "types/TaskType";

const taskList: Array<TaskType> = [
    {
        id: 1,
        category_id: 2,
        name: `Задание 1`,
        description: `надо сделать красиво`,
        isOpen: true,
        taskTypeId: 1,
        result: null
    },
    {
        id: 2,
        category_id: 2,
        name: `string`,
        description: `string`,
        isOpen: true,
        taskTypeId: 1,
        result: {
            id: 1,
            status: `reject`
        }
    },
]
export const taskThunk = {

    getList: (id: number) => async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
        try {
            await new Promise((resolve) => {
                setTimeout(resolve, 1000)
            })

            dispatch(TaskActions.setTaskListAction(taskList))

        } catch (error: any) {
            console.log('error client', error)
        } finally {
            // dispatch(FetchingActions.setIsLoadingUserListAction(false))
        }
    },
}
