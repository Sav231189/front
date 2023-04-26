import {AppDispatch, RootState} from "store/ReduxStore";
import {TaskActions} from "store/task/reducer/TaskReducer";
import {authFetch} from "lib/authFetch";
import {authThunk} from "store/auth/thunk/authThunk";
import {serverHttp} from "config/api/api";
import {CategoryActions} from "store/category/reducer/CategoryReducer";

export const taskThunk = {

    getList: (id: number) => async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
        try {
            await new Promise((resolve) => {
                setTimeout(resolve, 1000)
            })

            // tournamentId,

            const response = await authFetch(() => dispatch(authThunk.checkAuth()))
            (`${serverHttp}/api/task/list/${id}`, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const data = await response.json()
            if (data.error) {
                console.log(data.message)
                return
            }

            dispatch(CategoryActions.setTaskListAction({list: data.rows, categoryId: id}))

        } catch (error: any) {
            console.log('error client', error)
        } finally {
            // dispatch(FetchingActions.setIsLoadingUserListAction(false))
        }
    },
    create: (accessCallback: Function) => async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
        try {
            const newTask = getState().TaskReducer.editTask
            if (!newTask) return

            await new Promise((resolve) => {
                setTimeout(resolve, 1000)
            })

            let formData = new FormData();

            for (let field in newTask) {
                formData.append(`${field}`, newTask[field])
            }

            // @ts-ignore
            // for(let [name, value] of formData) {
            // console.log(`${name} = ${value}`) // key1=value1, потом key2=value2
            // }

            const response = await authFetch(() => dispatch(authThunk.checkAuth()))
            (`${serverHttp}/api/task/create`, {
                method: `POST`,
                body: formData
            })
            const data = await response.json()
            if (data.error) {
                console.log(data.message)
                return
            }

            accessCallback(data.id)

            dispatch(CategoryActions.addTaskAction(data))

        } catch (error: any) {
            console.log('error client', error)
        } finally {
            // dispatch(FetchingActions.setIsLoadingUserListAction(false))
        }
    },
    update: (accessCallback: Function) => async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
        try {
            const newTask = getState().TaskReducer.editTask
            if (!newTask) return

            await new Promise((resolve) => {
                setTimeout(resolve, 1000)
            })

            let formData = new FormData();

            for (let field in newTask) {
                formData.append(`${field}`, newTask[field])
            }

            // @ts-ignore
            // for(let [name, value] of formData) {
            // console.log(`${name} = ${value}`) // key1=value1, потом key2=value2
            // }

            const response = await authFetch(() => dispatch(authThunk.checkAuth()))
            (`${serverHttp}/api/task/update`, {
                method: `PUT`,
                body: formData
            })
            const data = await response.json()
            if (data.error) {
                console.log(data.message)
                return
            }

            accessCallback(data.id)

            dispatch(CategoryActions.updateTaskAction(data))

        } catch (error: any) {
            console.log('error client', error)
        } finally {
            // dispatch(FetchingActions.setIsLoadingUserListAction(false))
        }
    },
}
