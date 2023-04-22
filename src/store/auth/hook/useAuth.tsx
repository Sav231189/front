import {useSelector} from "react-redux";
import {getUser} from "store/auth/selector/getUser";

export const useAuth = () => {
    const user = useSelector(getUser)
    return user
}
