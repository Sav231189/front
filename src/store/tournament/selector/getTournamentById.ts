import {RootState} from "store/ReduxStore";

export const getTournamentByIdSelector = (id: number | undefined) => (state: RootState) => state.TournamentReducer.list?.find((el) => el.id === id)
