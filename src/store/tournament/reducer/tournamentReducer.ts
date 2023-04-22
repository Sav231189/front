import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {TournamentType} from "types/TournamentType";


interface stateType {
    list: null | Array<TournamentType>
    editTournament: null
}
const initialState: stateType = {
    list: null,
    editTournament: null
}

export const slice = createSlice({
    name: 'TournamentReducer',
    initialState,
    reducers: {
        setTournamentListAction: (state, action: PayloadAction<Array<TournamentType>>) : void => {
            state.list = action.payload
        },
    }
})

export const TournamentReducer = slice.reducer
export const TournamentActions = slice.actions



