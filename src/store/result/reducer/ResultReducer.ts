import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ResultType} from "types/ResultType";

interface stateType {
    resultItems: { [key: string]: ResultType }
    adminResultList: Array<ResultType> | null
    confirmResult: ResultType | null
}
const initialState: stateType = {
    resultItems: {},
    adminResultList: null,
    confirmResult: null,
}

export const slice = createSlice({
    name: 'ResultReducer',
    initialState,
    reducers: {
        addResultItemsAction: (state, action: PayloadAction<ResultType>) : void => {
            state.resultItems[`${action.payload.taskId}`] = {...action.payload}
        },
        changeResultByIdAction: (state, action: PayloadAction<ResultType>) : void => {
            state.resultItems[`${action.payload.taskId}`] = {...action.payload, value: String(action.payload.value)}
        },

        setAdminResultListAction: (state, action: PayloadAction<Array<ResultType> | null>) : void => {
            state.adminResultList = action.payload
        },
        setConfirmResultAction: (state, action: PayloadAction<ResultType | null>) : void => {
            state.confirmResult = action.payload
        },
        // updateTaskItemAction: (state, action: PayloadAction<TaskType>) : void => {
        //     state.taskList = state.taskList?.map(el => el.id === action.payload.id ? action.payload : el) ?? []
        // },
        // setEditTaskAction: (state, action: PayloadAction<TaskType | null>) : void => {
        //     state.editTask = action.payload
        // },
    }
})

export const ResultReducer = slice.reducer
export const ResultActions = slice.actions



