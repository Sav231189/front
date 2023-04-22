import {RootState} from "store/ReduxStore";

export const categoryListSelector = (state: RootState) => state.CategoryReducer.categoryList
