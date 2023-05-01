import s from './style.module.scss'
import {css} from "lib/customClassName";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {getFullTournamentSelector} from "store/tournament/selector/getFullTournament";
import {TournamentHead} from "view/module/tournament/tournamentHead";
import {TournamentDescription} from "view/module/tournament/tournamentDescription";
import {TournamentPartners} from "view/module/tournament/tournamentPartners";
import {TournamentTable} from "view/module/tournament/tournamentTable";
import {useEffect} from "react";
import {useThunks} from "lib/reduxHook";
import {tournamentThunk} from "store/tournament/thunk/tournamentThunk";
import loadGif from "view/assets/images/Load.gif";

export const TournamentPage = () => {
    const {id} = useParams()
    const tournament = useSelector(getFullTournamentSelector)

    const {getFullTournament} = useThunks(tournamentThunk)

    useEffect(() => {
        getFullTournament(Number(id))
    },[])

    if (!id) return null
    if (tournament === null) {
        return <div className={css(s.loadingList)}>
            <img src={loadGif} alt="load"/>
            <span>Загрузка...</span>
        </div>
    }
    return (
        <div className={css(s.TournamentPage)}>
            <div className={css(s.container)}>
                <TournamentHead tournament={tournament}/>
                {tournament.isShowTable && <TournamentTable paidMeCategoryId={tournament?.paidMe[0] ?? null}/>}
                <TournamentDescription text={tournament.description}/>
                {tournament.id && <TournamentPartners tournamentId={tournament.id}/>}
            </div>
        </div>
    );
};
