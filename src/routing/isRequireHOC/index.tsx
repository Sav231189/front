import {UserRoleType} from "types/UserType";
import {ReactNode} from "react";
import {useAuth} from "store/auth/hook/useAuth";

type PropsType = {
    permissionRoles: UserRoleType
    permissionElement?: ReactNode
    children?: ReactNode
}
export const IsRequireHOC = (props: PropsType): JSX.Element => {
    const {permissionRoles, permissionElement = null, children = null} = props

    const user = useAuth()

    let isPermission = false

    user?.role.forEach(role => {
        if (permissionRoles.includes(role)) isPermission = true
    })

    return (isPermission ? children : permissionElement) as JSX.Element
};
