import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {TaskType} from "types/TaskType";


interface stateType {
    taskList: null | Array<TaskType>
}
const initialState: stateType = {
    taskList: null
}

export const slice = createSlice({
    name: 'TaskReducer',
    initialState,
    reducers: {
        setTaskListAction: (state, action: PayloadAction<Array<TaskType>>) : void => {
            state.taskList = action.payload
        },
    }
})

export const TaskReducer = slice.reducer
export const TaskActions = slice.actions



