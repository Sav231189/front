import {AppDispatch, RootState} from "store/ReduxStore";
import img_1 from "view/assets/images/tounamentItem/img_1.png";
import img_2 from "view/assets/images/tounamentItem/img_2.png";
import tournament_item from "view/assets/images/tounamentItem/tournament_item.png";
import {TournamentActions} from "store/tournament/reducer/tournamentReducer";

const TournamentList = [
    {
        id: 1,
        img: tournament_item,
        title: `Fanatic team camp`,
        text: `Онлайн-курс полноформатных домашних тренировок с заботой о женском здоровье, суставах и мышцах!`,
        tagList: [`#Кроссфит`, `#Тег2`, `#Тег3`],
        status: 1,
        isOnline: true,
        date: `12.04-18.04`,
        isPaidMe: false,
    },
    {
        id: 2,
        img: img_1,
        title: `Fanatic team camp`,
        text: `Онлайн-курс полноформатных домашних тренировок с заботой о женском здоровье, суставах и мышцах!`,
        tagList: [`#Кроссфит`, `#Тег2`, `#Тег3`],
        status: 2,
        isOnline: false,
        date: `12.04-18.04`,
        isPaidMe: true,
    },
    {
        id: 3,
        img: img_1,
        title: `Fanatic team camp`,
        text: `Онлайн-курс полноформатных домашних тренировок с заботой о женском здоровье, суставах и мышцах!`,
        tagList: [`#Кроссфит`, `#Тег2`, `#Тег3`],
        status: 2,
        isOnline: true,
        date: `12.04-18.04`,
        isPaidMe: true,
    },
    {
        id: 4,
        img: img_1,
        title: `Fanatic team camp`,
        text: `Онлайн-курс полноформатных домашних тренировок Онлайн-курс полноформатных домашних тренировок с заботой о женском здоровье, суставах и мышцах!`,
        tagList: [`#Кроссфит`, `#Тег2`, `#Тег3`],
        status: 2,
        isOnline: true,
        date: `12.04-18.04`,
        isPaidMe: false,
    },
    {
        id: 5,
        img: img_2,
        title: `Fanatic team camp`,
        text: `Онлайн-курс полноформатных домашних тренировок с заботой о женском здоровье, суставах и мышцах!`,
        tagList: [`#Кроссфит`, `#Тег2`, `#Тег3`],
        status: 2,
        isOnline: true,
        date: `12.04-18.04`,
        isPaidMe: false,
    },
    {
        id: 6,
        img: img_1,
        title: `Fanatic team camp`,
        text: `Онлайн-курс полноформатных домашних тренировок с заботой о женском здоровье, суставах и мышцах!`,
        tagList: [`#Кроссфит`, `#Тег2`, `#Тег3`],
        status: 2,
        isOnline: true,
        date: `12.04-18.04`,
        isPaidMe: false,
    },
    {
        id: 7,
        img: img_1,
        title: `Fanatic team camp`,
        text: `Онлайн-курс полноформатных домашних тренировок с заботой о женском здоровье, суставах и мышцах!`,
        tagList: [`#Кроссфит`, `#Тег2`, `#Тег3`],
        status: 3,
        isOnline: true,
        date: `12.04-18.04`,
        isPaidMe: false,
    },
    {
        id: 8,
        img: img_1,
        title: `Fanatic team camp`,
        text: `Онлайн-курс полноформатных домашних тренировок с заботой о женском здоровье, суставах и мышцах!`,
        tagList: [`#Кроссфит`, `#Тег2`, `#Тег3`],
        status: 1,
        isOnline: true,
        date: `12.04-18.04`,
        isPaidMe: false,
    },
]
export const tournamentThunk = {

    getList: () => async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
        try {
            await new Promise((resolve) => {
                setTimeout(resolve, 1000)
            })

            dispatch(TournamentActions.setTournamentListAction(TournamentList))

        } catch (error: any) {
            console.log('error client', error)
        } finally {
            // dispatch(FetchingActions.setIsLoadingUserListAction(false))
        }
    },
}
