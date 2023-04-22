import {RootState} from "store/ReduxStore";

export const getUser = (state: RootState) => state.AuthReducer.user
