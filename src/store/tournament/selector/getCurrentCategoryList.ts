import {RootState} from "store/ReduxStore";

export const getCurrentCategoryListSelector = (state: RootState) => state.TournamentReducer.fullTournament?.categories
