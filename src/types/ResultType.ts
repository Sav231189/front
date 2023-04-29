import {ProfileType, UserType} from "types/UserType";
import {TaskType} from "types/TaskType";

export type ResultType = {
    id?: number,
    userId?: number,
    taskId: number,
    status: 'new'|'await'|'access'|'reject',
    taskTypeId: number,
    youtube: string,
    adminComment: string,
    value: any,
    user: UserType & { profile: ProfileType }
    task?: TaskType
}
