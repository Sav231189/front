import {RootState} from "store/ReduxStore";

export const getTournamentPrizeSelector = (state: RootState) => state.TournamentReducer.fullTournament?.prize
