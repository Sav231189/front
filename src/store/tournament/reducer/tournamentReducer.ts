import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {TournamentType} from "types/TournamentType";
import {TournamentReducerType} from "store/tournament/type/reducerType";

const initialState: TournamentReducerType = {
    list: null,
    // newTournament: null,
    editTournament: null,
    newLogo: null,
}

export const slice = createSlice({
    name: 'TournamentReducer',
    initialState,
    reducers: {
        setTournamentListAction: (state, action: PayloadAction<Array<TournamentType>>) : void => {
            state.list = action.payload
        },
        // setNewTournamentAction: (state, action: PayloadAction<TournamentType | null>) : void => {
        //     state.newTournament = action.payload
        // },
        setEditTournamentAction: (state, action: PayloadAction<TournamentType | null>) : void => {
            state.editTournament = action.payload
        },
        setNewLogoAction: (state, action: PayloadAction<File | null>) : void => {
            state.newLogo = action.payload
        },
    }
})

export const TournamentReducer = slice.reducer
export const TournamentActions = slice.actions



