import s from './style.module.scss'
import {css} from "lib/customClassName";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {getTournamentByIdSelector} from "store/tournament/selector/getTournamentById";
import {TournamentHead} from "view/module/tournament/tournamentHead";
import {TournamentDescription} from "view/module/tournament/tournamentDescription";
import {TournamentPartners} from "view/module/tournament/tournamentPartners";
import {TournamentTable} from "view/module/tournament/tournamentTable";

export const TournamentPage = () => {
    const {id} = useParams()
    const tournament = useSelector(getTournamentByIdSelector(Number(id)))

    if (!id || !tournament) return null

    return (
        <div className={css(s.TournamentPage)}>
            <div className={css(s.container)}>
                <TournamentHead tournament={tournament}/>
                <TournamentTable />
                <TournamentDescription text={tournament.descriptionSmall}/>
                {tournament.id && <TournamentPartners tournamentId={tournament.id}/>}
            </div>
        </div>
    );
};
