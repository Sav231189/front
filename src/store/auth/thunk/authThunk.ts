import {AppDispatch, RootState} from "store/ReduxStore";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "config/constants";
import {AuthActions} from "store/auth/reducer/authReducer";
import {serverHttp} from "config/api/api";
import {UserRoleType} from "types/UserType";
import jwt_decode from 'jwt-decode';
import {authFetch} from "lib/authFetch";

export const authThunk = {
    checkAuth: (delay?: number) => async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
        try {
            const accessToken = localStorage.getItem(ACCESS_TOKEN)
            const refreshToken = localStorage.getItem(REFRESH_TOKEN)
            if (!accessToken || !refreshToken) {
                dispatch(AuthActions.setUserAction({role: ['guest'], name: 'Гость'}))
                localStorage.removeItem(REFRESH_TOKEN)
                localStorage.removeItem(ACCESS_TOKEN)
                return
            }

            await new Promise(res => setTimeout(() => res(''), delay ?? 0))

            const response = await fetch(`${serverHttp}/api/auth/refresh`, {
                method: `POST`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({token: refreshToken})
            })
            const data = await response.json()
            if (data.error) {
                console.log(data.message)
                localStorage.removeItem(REFRESH_TOKEN)
                localStorage.removeItem(ACCESS_TOKEN)
                return
            }

            localStorage.setItem(REFRESH_TOKEN, data.refreshToken)
            localStorage.setItem(ACCESS_TOKEN, data.accessToken)
            const user = jwt_decode(data.accessToken) as {
                id: number
                role: UserRoleType
                name: string
            }

            dispatch(AuthActions.setUserAction({
                id: user.id,
                name: user.name,
                role: user.role,
            }))

        } catch (error: any) {
            dispatch(AuthActions.setUserAction({role: ['guest'], name: 'Гость'}))
            console.log('error client', error)
        }
    },
    login: (params: {
        data: { login: string, pswd: string },
        errorCallback: (str: string) => void
    }) => async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
        try {
            const response = await fetch(`${serverHttp}/api/auth/login`, {
                method: `POST`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: params.data.login,
                    password: params.data.pswd,
                })
            })
            const data = await response.json()
            if (data.error) {
                console.log(data.message)
                params.errorCallback(data.message)
                return
            }

            localStorage.setItem(REFRESH_TOKEN, data.refreshToken)
            localStorage.setItem(ACCESS_TOKEN, data.accessToken)
            const user = jwt_decode(data.accessToken) as {
                id: number
                role: UserRoleType
                login: string
            }

            dispatch(AuthActions.setUserAction({
                id: user.id,
                name: user.login,
                role: user.role,
            }))

        } catch (error: any) {
            console.log('error client', error)
        }
    },
    registration: (params: {
        data: { login: string, pswd: string },
        errorCallback: (str: string) => void
    }) => async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
        try {

            const response = await fetch(`${serverHttp}/api/auth/registration`, {
                method: `POST`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: params.data.login,
                    password: params.data.pswd,
                })
            })
            const data = await response.json()

            if (data.error) {
                console.log(data.message)
                params.errorCallback(data.message)
                return
            }

            localStorage.setItem(REFRESH_TOKEN, data.refreshToken)
            localStorage.setItem(ACCESS_TOKEN, data.accessToken)
            const user = jwt_decode(data.accessToken) as {
                id: number
                role: UserRoleType
                name: string
            }

            dispatch(AuthActions.setUserAction({
                id: user.id,
                name: user.name,
                role: user.role,
            }))

        } catch (error: any) {
            console.log('error client', error)
        }
    },
    logout: () => async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
        try {
            const refreshToken = localStorage.getItem(REFRESH_TOKEN)
            if (!refreshToken) {
                dispatch(AuthActions.setUserAction({role: ['guest'], name: 'Гость'}))
                return
            }

            const response = await fetch(`${serverHttp}/api/auth/logout`, {
                method: `POST`,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: refreshToken,
                })
            })
            const data = await response.json()

            if (data.error) {
                console.log(data.message)
                return
            }

        } catch (error: any) {
            console.log('error client', error)
        } finally {
            localStorage.removeItem(REFRESH_TOKEN)
            localStorage.removeItem(ACCESS_TOKEN)
            dispatch(AuthActions.setUserAction({role: ['guest'], name: 'Гость'}))
        }
    },

    getProfile: (params: { id: number }) => async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
        try {
            await new Promise(res => setTimeout(() => res(''), 1000))

            const response = await authFetch(() => dispatch(authThunk.checkAuth()))
            (`${serverHttp}/api/profile/${params.id}`, {
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

            dispatch(AuthActions.setProfileAction(data))

        } catch (error: any) {
            console.log('error client', error)
        }
    },
}
