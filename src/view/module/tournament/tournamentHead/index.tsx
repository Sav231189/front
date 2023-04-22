import s from './style.module.scss'
import {css} from "lib/customClassName";
import {TournamentType} from "types/TournamentType";
import {Button} from "view/components/button";
import {useNavigate} from "react-router-dom";
import {LoginButton} from "view/components/loginButton";
import {useAuth} from "store/auth/hook/useAuth";
import {useProfile} from "store/auth/hook/useProfile";

type PropsType = {
    tournament: TournamentType
}
export const TournamentHead = (props: PropsType) => {
    const {tournament} = props

    const navigate = useNavigate()

    const user = useAuth()

    const profile = useProfile()

    return (
        <div className={css(s.TournamentHead)}>
            <div className={css(s.logo)}>
                <img src={tournament.img} alt="logo"/>
            </div>
            <div className={css(s.main)}>
                <div className={css(s.info)}>
                    <div className={css(s.name)}>
                        НАЗВАНИЕ ТУРНИРА
                    </div>
                    <div className={css(s.smallInfo)}>
                        <div className={css(s.date)}>
                            {tournament.date}
                        </div>
                        <div className={css(s.isOnline)}>
                            {tournament.isOnline ? <span className={css(s.true)}>ONLINE</span> :
                                <span className={css(s.false)}>OFFLINE</span>}
                        </div>
                    </div>
                </div>
                <div className={css(s.btnBox)}>
                    <div className={css(s.btnRow)}>
                        <Button text={'правила'} modes={[`uppercase`, `maxWidth`]}
                                click={() => navigate(`/tournament/rules/${tournament.id}`)}/>
                        <Button text={'призы'} modes={[`uppercase`, `maxWidth`]}
                                click={() => navigate(`/tournament/prize/${tournament.id}`)}/>
                    </div>
                    <div className={css(s.btnRow, s.oneItem)}>
                        {user && !user.id && <LoginButton text={`Регистрация на турнир`}/>}
                        {user?.id && profile && profile.isFilled && !tournament.isPaidMe && (user?.role.includes('regular') || user?.role.includes('admin')) &&
                            <Button text={'ПРИНЯТЬ УЧАСТИЕ'} modes={[`uppercase`, `maxWidth`, `red`]} click={() => navigate(`/tournament/select/${tournament.id}`)}/>}

                        {user?.id && profile && profile.isFilled && tournament.isPaidMe && (user?.role.includes('regular') || user?.role.includes('admin')) &&
                            <Button text={'добавить результат '} modes={[`uppercase`, `maxWidth`, `red`]} click={() => navigate(`/tournament/add/${tournament.categoryId ?? 1}`)}/>}

                        {user?.id && profile && !profile.isFilled && <Button text={'Заполнить профиль'} modes={[`uppercase`, `maxWidth`]} click={() => navigate(`/profile`)}/>}
                    </div>
                </div>
            </div>
        </div>
    );
};
