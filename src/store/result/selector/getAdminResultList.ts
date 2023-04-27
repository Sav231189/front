import {RootState} from "store/ReduxStore";

export const getAdminResultListSelector = (state: RootState) => {
    return state.ResultReducer.adminResultList
}
