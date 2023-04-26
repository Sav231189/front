import {TournamentType} from "types/TournamentType";

export type TournamentReducerType = {
    list: null | Array<TournamentType>,
    fullTournament: null | TournamentType
    editTournament: null | TournamentType
    newLogo: File | null
}
