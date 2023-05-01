export type UserType = {
    id?: number
    role: UserRoleType
    name: string
    confirmed?: boolean
}

export type UserRoleType = Array<'guest' | 'regular' | 'admin'>

export type ProfileType = {
    id: null
    firstName: string
    isFilled: boolean
}
