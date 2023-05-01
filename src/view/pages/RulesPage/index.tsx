import s from './style.module.scss'
import {css} from "lib/customClassName";
import {Button} from "view/components/button";
import {useNavigate, useParams} from "react-router-dom";
import {getTournamentRulesSelector} from "store/tournament/selector/getTournamentRules";
import {useSelector} from "react-redux";
import {useEffect} from "react";

export const RulesPage = () => {
    const {id} = useParams()

    const navigate = useNavigate()

    const tournamentRules = useSelector(getTournamentRulesSelector)

    useEffect(()=>{
        if (tournamentRules === undefined) {
            navigate(`/tournament/${id}`)
        }
    },[])

    if (!id || tournamentRules === undefined) return null
    return (
        <div className={css(s.RulesPage)}>
            <div className={css(s.container)}>
                <div className={css(s.main)} >
                    <Button text={`←    Назад`} click={()=>navigate(`/tournament/${id}`)}/>
                    <div className={css(s.titlePage)}>ПРАВИЛА УЧАСТИЯ В ТУРНИРЕ</div>
                    {tournamentRules.length > 0 && <div>
                        {tournamentRules}
                    </div>}
                    {tournamentRules.length === 0 &&
                        <div className={css(s.emptyList)}>Правила не описаны</div>}
                </div>
            </div>
        </div>
    );
};
