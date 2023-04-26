import {RootState} from "store/ReduxStore";

export const getEditTaskSelector = (state: RootState) => state.TaskReducer.editTask
