import {RootState} from "store/ReduxStore";

export const getNewLogoTournamentSelector = (state: RootState) => {

    const imageFile = state.TournamentReducer.newLogo as File

    if (imageFile === null) return null

    return URL.createObjectURL(imageFile)
}
