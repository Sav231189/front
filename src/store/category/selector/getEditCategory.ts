import {RootState} from "store/ReduxStore";

export const getEditCategorySelector = (state: RootState) => state.CategoryReducer.editCategory
