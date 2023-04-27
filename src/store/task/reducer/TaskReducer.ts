import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {TaskType} from "types/TaskType";

interface stateType {
    editTask: null | TaskType
}
const initialState: stateType = {
    editTask: null,
}

export const slice = createSlice({
    name: 'TaskReducer',
    initialState,
    reducers: {
        // setTaskListAction: (state, action: PayloadAction<Array<TaskType>>) : void => {
        //     state.taskList = action.payload
        // },
        // addEditTaskAction: (state, action: PayloadAction<TaskType>) : void => {
        //     state.taskList?.unshift(action.payload)
        // },
        // updateTaskItemAction: (state, action: PayloadAction<TaskType>) : void => {
        //     state.taskList = state.taskList?.map(el => el.id === action.payload.id ? action.payload : el) ?? []
        // },
        setEditTaskAction: (state, action: PayloadAction<TaskType | null>) : void => {
            if (action.payload)
                state.editTask = {...action.payload, taskTypeId: Number(action.payload?.taskTypeId)}
            else state.editTask = action.payload
        },
    }
})

export const TaskReducer = slice.reducer
export const TaskActions = slice.actions



