import s from './style.module.scss'
import {css} from "lib/customClassName";
import {Button} from "view/components/button";
import {useNavigate, useParams} from "react-router-dom";
import {getTournamentPrizeSelector} from "store/tournament/selector/getTournamentPrize";
import {useSelector} from "react-redux";
import {useEffect} from "react";

export const PrizePage = () => {
    const {id} = useParams()

    const navigate = useNavigate()

    const tournamentPrize = useSelector(getTournamentPrizeSelector)

    useEffect(()=>{
        if (tournamentPrize === undefined) {
            navigate(`/tournament/${id}`)
        }
    },[])

    if (!id || tournamentPrize === undefined) return null
    return (
        <div className={css(s.PrizePage)}>
            <div className={css(s.container)}>
                <div className={css(s.main)} >
                    <Button text={`←    Назад`} click={()=>navigate(`/tournament/${id}`)}/>
                    <div className={css(s.titlePage)}>ПРИЗЫ</div>
                    {tournamentPrize.length > 0 && <div>
                        {tournamentPrize}
                    </div>}
                    {tournamentPrize.length === 0 &&
                        <div className={css(s.emptyList)}>Призы не описаны</div>}
                </div>
            </div>
        </div>
    );
};
