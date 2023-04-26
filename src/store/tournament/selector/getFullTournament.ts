import {RootState} from "store/ReduxStore";

export const getFullTournamentSelector = (state: RootState) => state.TournamentReducer.fullTournament
