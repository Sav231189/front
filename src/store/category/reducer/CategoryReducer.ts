import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CategoryType} from "types/CategoryType";
import {TaskType} from "types/TaskType";

interface stateType {
    categoryList: null | Array<CategoryType>
    editCategory: null | CategoryType
}

const initialState: stateType = {
    categoryList: null,
    editCategory: null,
}

export const slice = createSlice({
    name: 'CategoryReducer',
    initialState,
    reducers: {
        setCategoryListAction: (state, action: PayloadAction<Array<CategoryType> | null>): void => {
            state.categoryList = action.payload
        },
        addEditCategoryAction: (state, action: PayloadAction<CategoryType>): void => {
            state.categoryList?.unshift(action.payload)
        },
        updateCategoryItemAction: (state, action: PayloadAction<CategoryType>): void => {
            state.categoryList = state.categoryList?.map(el => el.id === action.payload.id ? action.payload : el) ?? []
        },
        setEditCategoryAction: (state, action: PayloadAction<CategoryType | null>): void => {
            state.editCategory = action.payload
        },
        setTaskListAction: (state, action: PayloadAction<{ list: Array<TaskType>, categoryId: number}>): void => {
            const item = state.categoryList?.find(el => {
                return  el.id === action.payload.categoryId
            })
            if (!item) return
            item.taskList = action.payload.list
        },
        addTaskAction: (state, action: PayloadAction<TaskType>): void => {
            const item = state.categoryList?.find(el => {
                return  el.id === action.payload.category_id
            })
            if (!item || !item.taskList) return
            item.taskList.unshift(action.payload)
        },
        updateTaskAction: (state, action: PayloadAction<TaskType>): void => {
            const item = state.categoryList?.find(el => {
                return  el.id === action.payload.category_id
            })
            if (!item || !item.taskList) return
            item.taskList = item.taskList.map(task => task.id === action.payload.id ? action.payload : task)
        },
    }
})

export const CategoryReducer = slice.reducer
export const CategoryActions = slice.actions
