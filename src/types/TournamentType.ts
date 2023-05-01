import {CategoryType} from "types/CategoryType";

export type TournamentType = {
    id?: number,
    img: string,
    name: string,
    descriptionSmall: string,
    description: string,
    startDate: string,
    status: string,
    prize: string,
    rules: string,
    isOnline: boolean,
    isHidden: boolean,
    isShowTable: boolean,

    paidMe: Array<number>,
    categories?: Array<CategoryType>,
    categoryId?: number
}
