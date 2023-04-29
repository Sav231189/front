import {AppDispatch, RootState} from "store/ReduxStore";
import {authFetch} from "lib/authFetch";
import {authThunk} from "store/auth/thunk/authThunk";
import {serverHttp} from "config/api/api";
import {ResultActions} from "store/result/reducer/ResultReducer";

export const resultThunk = {
    getAdminList: () => async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
        try {
            await new Promise((resolve) => {
                setTimeout(resolve, 1000)
            })

            // tournamentId,

            const response = await authFetch(() => dispatch(authThunk.checkAuth()))
            (`${serverHttp}/api/result/admin-list`, {
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

            dispatch(ResultActions.setAdminResultListAction(data.rows))

        } catch (error: any) {
            console.log('error client', error)
        } finally {
            // dispatch(FetchingActions.setIsLoadingUserListAction(false))
        }
    },
    addResultItems: (id: number) => async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
        try {
            await new Promise((resolve) => {
                setTimeout(resolve, 1000)
            })

            // tournamentId,

            const response = await authFetch(() => dispatch(authThunk.checkAuth()))
            (`${serverHttp}/api/result/${id}`, {
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

            dispatch(ResultActions.addResultItemsAction(data))

        } catch (error: any) {
            console.log('error client', error)
        } finally {
            // dispatch(FetchingActions.setIsLoadingUserListAction(false))
        }
    },
    create: (taskId: number) => async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
        try {
            await new Promise((resolve) => {
                setTimeout(resolve, 1000)
            })
            const result = getState().ResultReducer.resultItems[`${taskId}`]

            if (!result) return

            const response = await authFetch(() => dispatch(authThunk.checkAuth()))
            (`${serverHttp}/api/result/create`, {
                method: `POST`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    taskId: result.taskId,
                    value: result.value,
                    youtube: result.youtube,
                })
            })

            const data = await response.json()

            if (data.error) {
                console.log(data.message)
                return
            }

            dispatch(ResultActions.changeResultByIdAction(data))

        } catch (error: any) {
            console.log('error client', error)
        } finally {
            // dispatch(FetchingActions.setIsLoadingUserListAction(false))
        }
    },
    update: (taskId: number) => async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
        try {
            await new Promise((resolve) => {
                setTimeout(resolve, 1000)
            })
            const result = getState().ResultReducer.resultItems[`${taskId}`]

            if (!result) return

            const response = await authFetch(() => dispatch(authThunk.checkAuth()))
            (`${serverHttp}/api/result/update`, {
                method: `PUT`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: result.id,
                    taskId: result.taskId,
                    value: result.value,
                    youtube: result.youtube,
                })
            })

            const data = await response.json()

            if (data.error) {
                console.log(data.message)
                return
            }

            dispatch(ResultActions.changeResultByIdAction(data))

        } catch (error: any) {
            console.log('error client', error)
        } finally {
            // dispatch(FetchingActions.setIsLoadingUserListAction(false))
        }
    },
    updateAdmin: (status: string) => async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
        try {
            await new Promise((resolve) => {
                setTimeout(resolve, 1000)
            })
            const result = getState().ResultReducer.confirmResult

            if (!result) return

            const response = await authFetch(() => dispatch(authThunk.checkAuth()))
            (`${serverHttp}/api/result/update-admin`, {
                method: `PUT`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: result.id,
                    status: status,
                    processedValue: result.value,
                    adminComment: result.adminComment,
                })
            })

            const data = await response.json()

            if (data.error) {
                console.log(data.message)
                return
            }

            // в зависимости от фильтра изменить или удалить... Пока толлько изменить

            dispatch(ResultActions.changeAdminResultByIdAction(data))

        } catch (error: any) {
            console.log('error client', error)
        } finally {
            // dispatch(FetchingActions.setIsLoadingUserListAction(false))
        }
    },
}
