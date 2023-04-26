import s from './style.module.scss'
import {css} from "lib/customClassName";
import {Button} from "view/components/button";
import loadGif from "view/assets/images/Load.gif";
import {TournamentItem} from "view/components/tournamentItem";
import {useSelector} from "react-redux";
import {getTournamentListSelector} from "store/tournament/selector/getTournamentList";
import {useActions, useThunks} from "lib/reduxHook";
import {tournamentThunk} from "store/tournament/thunk/tournamentThunk";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {TournamentActions} from "store/tournament/reducer/tournamentReducer";

export const AdminTournamentList = () => {

    const navigate = useNavigate()

    const {setTournamentListAction} = useActions(TournamentActions)

    const tournamentList = useSelector(getTournamentListSelector)

    const {getAdminList} = useThunks(tournamentThunk)

    useEffect(() => {
        getAdminList()
        return () => {
            setTournamentListAction(null)
        }
    }, [])

    return (
        <div className={css(s.TournamentList)}>
            <div className={css(s.container)}>
                <div className={css(s.head)}>
                    <div className={css(s.headTitle)}>
                        редактирование турниров
                    </div>
                    <Button text={`Добавить +`} modes={[`maxWidth`,`red`]} click={() => navigate(`/admin/tournament/edit`)}/>
                </div>
                <div className={css(s.filter)}>
                    <Button text={'скоро старт'} modes={[`uppercase`, `mobilSmall`]}/>
                    <Button text={'сейчас идет'} modes={[`uppercase`, `mobilSmall`]}/>
                    <Button text={'закончен'} modes={[`uppercase`, `mobilSmall`]}/>
                </div>
                <div className={css(s.list)}>
                    {tournamentList === null && <div className={css(s.loadingList)}>
                        <img src={loadGif} alt="load"/>
                    </div>}
                    {tournamentList?.map((item, index) =>
                        <TournamentItem key={item.id} item={item} isEditable={true}/>
                    )}
                </div>
                {tournamentList !== null && tournamentList.length >= 12 &&
                    <div className={css(s.btnBox)}>
                        <Button text={'показать больше'} modes={[`uppercase`, 'maxWidth', `mobilSmall`]}/>
                    </div>}
            </div>
        </div>
    );
};
