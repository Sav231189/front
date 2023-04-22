import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {ProfileType, UserType} from "types/UserType";

interface stateType {
    user: null | UserType
    profile: null | ProfileType
}
const initialState: stateType = {
    user: null,
    profile: null
}

export const slice = createSlice({
    name: 'AuthReducer',
    initialState,
    reducers: {
        setUserAction: (state, action: PayloadAction<UserType>) : void => {
            state.user = action.payload
        },
        setProfileAction: (state, action: PayloadAction<ProfileType>) : void => {
            state.profile = action.payload
        },
    }
})

export const AuthReducer = slice.reducer
export const AuthActions = slice.actions



