import {TournamentType} from "types/TournamentType";
import {TaskType} from "types/TaskType";
import {ResultType} from "types/ResultType";

export type TournamentReducerType = {
    list: null | Array<TournamentType>,
    fullTournament: null | TournamentType
    editTournament: null | TournamentType
    newLogo: null | File
    resultTable: null | ResultTable
}

export type ResultTable = {
    taskList: Array<TaskType>,
    resultList: Array<ResultType> | null
}
