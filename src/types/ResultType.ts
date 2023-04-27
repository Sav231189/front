import {ProfileType, UserType} from "types/UserType";

export type ResultType = {
    id?: number,
    userId?: number,
    taskId: number,
    status: 'new'|'await'|'access'|'reject',
    taskTypeId: number,
    youtube: string,
    value: any,
    user: UserType & { profile: ProfileType }
}
