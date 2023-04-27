import {RootState} from "store/ReduxStore";

export const getResultByIdSelector = (id: number) => (state: RootState) => {
    return state.ResultReducer.resultItems[`${id}`]
}
