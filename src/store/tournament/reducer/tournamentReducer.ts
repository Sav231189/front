import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {TournamentType} from "types/TournamentType";
import {TournamentReducerType} from "store/tournament/type/reducerType";

const initialState: TournamentReducerType = {
    list: null,
    editTournament: null,
    newLogo: null
}

export const slice = createSlice({
    name: 'TournamentReducer',
    initialState,
    reducers: {
        setTournamentListAction: (state, action: PayloadAction<Array<TournamentType>>) : void => {
            state.list = action.payload
        },
        setEditTournamentAction: (state, action: PayloadAction<TournamentType>) : void => {
            state.editTournament = action.payload
        },
        setNewLogoAction: (state, action: PayloadAction<File>) : void => {
            state.newLogo = action.payload
        },
    }
})

export const TournamentReducer = slice.reducer
export const TournamentActions = slice.actions



