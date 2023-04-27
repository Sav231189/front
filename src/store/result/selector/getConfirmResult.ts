import {RootState} from "store/ReduxStore";

export const getConfirmResultSelector = (state: RootState) => {
    return state.ResultReducer.confirmResult
}
