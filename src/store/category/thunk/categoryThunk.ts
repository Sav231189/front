import {AppDispatch, RootState} from "store/ReduxStore";
import {CategoryActions} from "store/category/reducer/CategoryReducer";
import {authFetch} from "lib/authFetch";
import {authThunk} from "store/auth/thunk/authThunk";
import {serverHttp} from "config/api/api";

export const categoryThunk = {

    getList: (id: number) => async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
        try {
            await new Promise((resolve) => {
                setTimeout(resolve, 1000)
            })

            // tournamentId,

            const response = await authFetch(() => dispatch(authThunk.checkAuth()))
            (`${serverHttp}/api/category/list/${id}`, {
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

            dispatch(CategoryActions.setCategoryListAction(data.rows))

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

            // tournamentId,

            const response = await authFetch(() => dispatch(authThunk.checkAuth()))
            (`${serverHttp}/api/category/admin-list/${id}`, {
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

            dispatch(CategoryActions.setCategoryListAction(data.rows.map(el => ({...el, taskList: el.taskList ?? null}))))

        } catch (error: any) {
            console.log('error client', error)
        } finally {
            // dispatch(FetchingActions.setIsLoadingUserListAction(false))
        }
    },
    create: (accessCallback: Function) => async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
        try {
            const newCategory = getState().CategoryReducer.editCategory
            if (!newCategory) return

            await new Promise((resolve) => {
                setTimeout(resolve, 1000)
            })

            let formData = new FormData();

            for (let field in newCategory) {
                formData.append(`${field}`, newCategory[field])
            }

            // @ts-ignore
            // for(let [name, value] of formData) {
            // console.log(`${name} = ${value}`) // key1=value1, потом key2=value2
            // }

            const response = await authFetch(() => dispatch(authThunk.checkAuth()))
            (`${serverHttp}/api/category/create`, {
                method: `POST`,
                body: formData
            })
            const data = await response.json()
            if (data.error) {
                console.log(data.message)
                return
            }

            accessCallback(data.id)

            dispatch(CategoryActions.addEditCategoryAction({...data, taskList: data.taskList ?? []}))

        } catch (error: any) {
            console.log('error client', error)
        } finally {
            // dispatch(FetchingActions.setIsLoadingUserListAction(false))
        }
    },
    update: (accessCallback: Function) => async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
        try {
            const newCategory = getState().CategoryReducer.editCategory
            if (!newCategory) return

            await new Promise((resolve) => {
                setTimeout(resolve, 1000)
            })

            let formData = new FormData();

            for (let field in newCategory) {
                formData.append(`${field}`, newCategory[field])
            }

            // @ts-ignore
            // for(let [name, value] of formData) {
            // console.log(`${name} = ${value}`) // key1=value1, потом key2=value2
            // }

            const response = await authFetch(() => dispatch(authThunk.checkAuth()))
            (`${serverHttp}/api/category/update`, {
                method: `PUT`,
                body: formData
            })
            const data = await response.json()
            if (data.error) {
                console.log(data.message)
                return
            }

            accessCallback(data.id)

            dispatch(CategoryActions.updateCategoryItemAction({...data, taskList: data.taskList ?? []}))

        } catch (error: any) {
            console.log('error client', error)
        } finally {
            // dispatch(FetchingActions.setIsLoadingUserListAction(false))
        }
    },

}
