import {ReactNode, useEffect} from "react";
import {useThunks} from "lib/reduxHook";
import {authThunk} from "store/auth/thunk/authThunk";
import {useAuth} from "store/auth/hook/useAuth";
import {REFRESH_TOKEN} from "config/constants";

type PropsType = {
    children: ReactNode
}
export const AuthProvider = (props: PropsType) => {
    const {children} = props

    const user = useAuth()
    const {checkAuth} = useThunks(authThunk)

    useEffect(() => {
        checkAuth()
    }, [])

    if (user === null && localStorage.getItem(REFRESH_TOKEN)) return <div>Авторизация...</div>
    else return <>{children}</>
};
