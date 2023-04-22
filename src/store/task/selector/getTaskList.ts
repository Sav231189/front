import {RootState} from "store/ReduxStore";

export const taskListSelector = (state: RootState) => state.TaskReducer.taskList
