import {RootState} from "store/ReduxStore";

export const getTournamentRulesSelector = (state: RootState) => state.TournamentReducer.fullTournament?.rules
