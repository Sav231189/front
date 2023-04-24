import {AppDispatch, RootState} from "store/ReduxStore";

import {TournamentActions} from "store/tournament/reducer/tournamentReducer";
import {serverHttp} from "config/api/api";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "config/constants";
import {authFetch} from "lib/authFetch";
import {authThunk} from "store/auth/thunk/authThunk";
import { push } from 'react-router-redux'


export const tournamentThunk = {
    getList: () => async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
        try {
            await new Promise((resolve) => {
                setTimeout(resolve, 1000)
            })

            dispatch(TournamentActions.setTournamentListAction([]))

        } catch (error: any) {
            console.log('error client', error)
        } finally {
            // dispatch(FetchingActions.setIsLoadingUserListAction(false))
        }
    },
    getTournamentItem: (id: number) => async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
        try {
            await new Promise((resolve) => {
                setTimeout(resolve, 1000)
            })

        } catch (error: any) {
            console.log('error client', error)
        } finally {
            // dispatch(FetchingActions.setIsLoadingUserListAction(false))
        }
    },
    createTournamentItem: (accessCallback: Function) => async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
        try {
            const newTournament = getState().TournamentReducer.editTournament
            if (!newTournament) return

            const newLogo = getState().TournamentReducer.newLogo

            // console.log(newTournament)

            await new Promise((resolve) => {
                setTimeout(resolve, 1000)
            })

            let formData = new FormData();

            for (let field in newTournament) {
                console.log(`${field}`, newTournament[field])
                formData.append(`${field}`, newTournament[field])
            }

            if (!!newLogo) {
                console.log(newLogo)
                formData.append(`files`, newLogo)
            }


            // @ts-ignore
            // for(let [name, value] of formData) {
                // console.log(`${name} = ${value}`) // key1=value1, потом key2=value2
            // }

            const response = await authFetch(() => dispatch(authThunk.checkAuth()))
            (`${serverHttp}/api/tournament/create`, {
                method: `POST`,
                // headers: {
                //     'Content-Type': 'multipart/form-data; boundary=',
                // },
                body: formData
            })
            const data = await response.json()
            if (data.error) {
                console.log(data.message)
                return
            }
            accessCallback(data.id)
            dispatch(TournamentActions.setEditTournamentAction(data))
            // dispatch(TournamentActions.setNewTournamentAction(null))
            dispatch(TournamentActions.setNewLogoAction(null))

        } catch (error: any) {
            console.log('error client', error)
        } finally {
            // dispatch(FetchingActions.setIsLoadingUserListAction(false))
        }
    },
}
