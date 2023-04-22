import {useSelector} from "react-redux";
import {getProfileSelector} from "store/auth/selector/getProfile";

export const useProfile = () => {
    const user = useSelector(getProfileSelector)
    return user
}
