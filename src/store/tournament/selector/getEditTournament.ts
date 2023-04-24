import {RootState} from "store/ReduxStore";

export const getEditTournamentSelector = (state: RootState) => state.TournamentReducer.editTournament
