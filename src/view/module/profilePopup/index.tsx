import s from './index.module.scss'
import {css} from "lib/customClassName";
import {Button} from "view/components/button";
import {useNavigate} from "react-router-dom";
import {useAuth} from "store/auth/hook/useAuth";
import {useThunks} from "lib/reduxHook";
import {authThunk} from "store/auth/thunk/authThunk";
import {useProfile} from "store/auth/hook/useProfile";

type PropsType = {
    closePopup: Function
}
export const ProfilePopup = (props: PropsType) => {
    const {closePopup} = props
    const navigate = useNavigate()

    const profile = useProfile()

    const user = useAuth()

    const {logout} = useThunks(authThunk)
    const logoutHandler = () => {
        logout()
    }
    const navigateHandler = (path: string) => {
        closePopup()
        navigate(path)
    }

    return (
        <div className={css(s.ProfilePopup)}>
            <div className={css(s.popupHeader)}>
                <div className={css(s.iconImgBox)}>

                </div>
                <div className={css(s.fullName)}>
                    <div className={css(s.lastName)}>{profile?.firstName}</div>
                    <div className={css(s.firstName)}>{profile?.firstName}</div>
                </div>
            </div>
            <div className={css(s.info)}>
                <div className={css(s.infoItem)}>
                    <div className={css(s.key)} onClick={() => navigateHandler(`profile`)}>Профиль</div>
                </div>
                <div className={css(s.infoItem)}>
                    <div className={css(s.key)}>Мои турниры</div>
                </div>
            </div>
            {user?.role.includes('admin') &&
                <div className={css(s.admin)}>
                    <Button modes={[`maxWidth`, 'uppercase', `noRadius`]} text={`Панель администратора`} click={() => navigateHandler(`admin`)}/>
                </div>
            }
            {/*<div className={css(s.journal)}>*/}
            {/*    <Button modes={[`maxWidth`, 'red', 'uppercase']} text={`Дневник тренировок`}/>*/}
            {/*</div>*/}
            {/*<div className={css(s.profileNav)}>*/}
            {/*    <div className={css(s.navItem)}>*/}
            {/*        <div className={css(s.key)}>Кабинет тренера</div>*/}
            {/*    </div>*/}
            {/*    <div className={css(s.navItem)}>*/}
            {/*        <div className={css(s.key)}>Избранное</div>*/}
            {/*    </div>*/}
            {/*    <div className={css(s.navItem)}>*/}
            {/*        <div className={css(s.key)}>Спортивный уровень</div>*/}
            {/*    </div>*/}
            {/*    <div className={css(s.navItem)}>*/}
            {/*        <div className={css(s.key)}>Программа</div>*/}
            {/*    </div>*/}
            {/*    <div className={css(s.navItem)}>*/}
            {/*        <div className={css(s.key)}>Тренировка сегодня</div>*/}
            {/*    </div>*/}
            {/*    <div className={css(s.navItem)}>*/}
            {/*        <div className={css(s.key)}>Активность</div>*/}
            {/*    </div>*/}
            {/*    <div className={css(s.navItem)}>*/}
            {/*        <div className={css(s.key)}>Коментарии</div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className={css(s.popupFooter)}>
                <div className={css(s.footerBtn)}>Сменить пароль</div>
                <div className={css(s.footerBtn)} onClick={logoutHandler}>Выйти</div>
            </div>
        </div>
    );
};
