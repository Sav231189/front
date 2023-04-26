import {RootState} from "store/ReduxStore";

export const getTaskListSelector = (state: RootState) => state.TaskReducer.taskList
