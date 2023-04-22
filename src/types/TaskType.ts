
export type TaskType = {
    id: number,
    category_id: number,
    name: string,
    description: string,
    isOpen: boolean,
    taskTypeId: number
    result: ResultType | null
}

type ResultType = {
    id: number,
    status: 'await'|'access'|'reject'
}
