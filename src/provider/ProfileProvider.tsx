import {ReactNode, useEffect} from "react";
import {useAuth} from "store/auth/hook/useAuth";
import {getProfileSelector} from "store/auth/selector/getProfile";
import {useSelector} from "react-redux";
import {useThunks} from "lib/reduxHook";
import {authThunk} from "store/auth/thunk/authThunk";

type PropsType = {
    children: ReactNode
}
export const ProfileProvider = (props: PropsType) => {
    const {children} = props

    const user = useAuth()

    const profile = useSelector(getProfileSelector)

    const {getProfile} = useThunks(authThunk)

    useEffect(() => {
        if (user === null) return
        if (!user.id) return

        getProfile({id: user.id})
    }, [user?.id])

    if (user && !user.id) return <>{children}</>;
    if (profile === null && (user && user.id)) return <div>Получение профиля...</div>
    else return <>{children}</>
};
