import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CategoryType} from "types/CategoryType";

interface stateType {
    categoryList: null | Array<CategoryType>
}
const initialState: stateType = {
    categoryList: null
}

export const slice = createSlice({
    name: 'CategoryReducer',
    initialState,
    reducers: {
        setCategoryListAction: (state, action: PayloadAction<Array<CategoryType>>) : void => {
            state.categoryList = action.payload
        },
    }
})

export const CategoryReducer = slice.reducer
export const CategoryActions = slice.actions
