import {TournamentType} from "types/TournamentType";

export type TournamentReducerType = {
    list: null | Array<TournamentType>,
    // newTournament: null | TournamentType
    editTournament: null | TournamentType
    newLogo: File | null
}
