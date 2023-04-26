import s from './style.module.scss'
import {css} from "lib/customClassName";
import {TournamentType} from "types/TournamentType";
import {Button} from "view/components/button";
import {useNavigate} from "react-router-dom";
import {LoginButton} from "view/components/loginButton";
import {useAuth} from "store/auth/hook/useAuth";
import {useProfile} from "store/auth/hook/useProfile";
import tournament_item from "view/assets/images/tounamentItem/tournament_item.png";

type PropsType = {
    tournament: TournamentType
}
export const TournamentHead = (props: PropsType) => {
    const {tournament} = props

    const navigate = useNavigate()

    return (
        <div className={css(s.TournamentHead)}>
            <div className={css(s.logo)}>
                {tournament.img === '' && <img src={tournament_item} alt="tournament_item" />}
                {tournament.img !== '' && <img src={`http://localhost:7000/upload/`+tournament.img} alt="tournament_item" />}
            </div>
            <div className={css(s.main)}>
                <div className={css(s.info)}>
                    <div className={css(s.name)}>
                        НАЗВАНИЕ ТУРНИРА
                    </div>
                    <div className={css(s.smallInfo)}>
                        <div className={css(s.date)}>
                            {tournament.startDate}
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
                        {!tournament.isPaidMe && <Button text={'ПРИНЯТЬ УЧАСТИЕ'} modes={[`uppercase`, `maxWidth`, `red`]} click={() => navigate(`/tournament/select/${tournament.id}`)}/>}
                        {tournament.isPaidMe && <Button text={'добавить результат '} modes={[`uppercase`, `maxWidth`, `red`]} click={() => navigate(`/tournament/add/${tournament.categoryId ?? 1}`)}/>}
                    </div>
                </div>
            </div>
        </div>
    );
};
