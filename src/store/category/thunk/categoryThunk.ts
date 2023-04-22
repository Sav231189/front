import {AppDispatch, RootState} from "store/ReduxStore";
import {CategoryActions} from "store/category/reducer/CategoryReducer";

const categoryList = [
    {
        id: 1,
        name: 'name',
        description: 'description',
        taskList: [
            {
                id: 1,
                name: 'task 1',
            },
            {
                id: 2,
                name: 'task 2',
            },
            {
                id: 3,
                name: 'task 3',
            },
        ]
    },
    {
        id: 2,
        name: 'name',
        description: 'description',
        taskList: [

        ]
    },
]
export const categoryThunk = {

    getList: (id: number) => async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
        try {
            await new Promise((resolve) => {
                setTimeout(resolve, 1000)
            })

            dispatch(CategoryActions.setCategoryListAction(categoryList))

        } catch (error: any) {
            console.log('error client', error)
        } finally {
            // dispatch(FetchingActions.setIsLoadingUserListAction(false))
        }
    },
    getAdminList: (id: number) => async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
        try {
            await new Promise((resolve) => {
                setTimeout(resolve, 1000)
            })

            dispatch(CategoryActions.setCategoryListAction(categoryList))

        } catch (error: any) {
            console.log('error client', error)
        } finally {
            // dispatch(FetchingActions.setIsLoadingUserListAction(false))
        }
    },
}
