import {RootState} from "store/ReduxStore";

export const getProfileSelector = (state: RootState) => state.AuthReducer.profile
