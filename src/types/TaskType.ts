
export type TaskType = {
    id?: number,
    category_id: number,
    name: string,
    description: string,
    isOpen: boolean,
    isHidden: boolean
    taskTypeId: number
}

type ResultType = {
    id: number,
    status: 'await'|'access'|'reject'
}
