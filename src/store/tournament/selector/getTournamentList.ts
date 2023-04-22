import {RootState} from "store/ReduxStore";

export const getTournamentListSelector = (state: RootState) => state.TournamentReducer.list
