import {TaskType} from "types/TaskType";

export type CategoryType = {
    id?: number,
    tournamentId: number,
    name: string,
    description: string,
    status?: string,
    isSubmissionResult: boolean,
    isAccessBuy: boolean,
    isHidden: boolean,
    price: number,
    taskList: Array<TaskType> | null
}
