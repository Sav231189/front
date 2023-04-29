import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {TournamentType} from "types/TournamentType";
import {ResultTable, TournamentReducerType} from "store/tournament/type/reducerType";

const initialState: TournamentReducerType = {
    list: null,
    fullTournament: null,
    editTournament: null,
    newLogo: null,
    resultTable: null
}

export const slice = createSlice({
    name: 'TournamentReducer',
    initialState,
    reducers: {
        setTournamentListAction: (state, action: PayloadAction<Array<TournamentType> | null>) : void => {
            state.list = action.payload
        },
        setFullTournamentAction: (state, action: PayloadAction<TournamentType | null>) : void => {
            state.fullTournament = action.payload
        },
        setEditTournamentAction: (state, action: PayloadAction<TournamentType | null>) : void => {
            state.editTournament = action.payload
        },
        setNewLogoAction: (state, action: PayloadAction<File | null>) : void => {
            state.newLogo = action.payload
        },
        setResultTableAction: (state, action: PayloadAction<ResultTable>) : void => {
            state.resultTable = action.payload
        },
    }
})

export const TournamentReducer = slice.reducer
export const TournamentActions = slice.actions



