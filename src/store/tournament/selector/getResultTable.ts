import {RootState} from "store/ReduxStore";

export const getResultTableSelector = (state: RootState) => state.TournamentReducer.resultTable
