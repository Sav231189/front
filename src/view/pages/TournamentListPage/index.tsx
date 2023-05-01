import s from './style.module.scss'
import {css} from "lib/customClassName";
import {TournamentItem} from "view/components/tournamentItem";
import {Button} from "view/components/button";
import {useSelector} from "react-redux";
import {getTournamentListSelector} from "store/tournament/selector/getTournamentList";
import {useActions, useThunks} from "lib/reduxHook";
import {tournamentThunk} from "store/tournament/thunk/tournamentThunk";
import {useEffect} from "react";
import loadGif from 'view/assets/images/Load.gif'
import {TournamentActions} from "store/tournament/reducer/tournamentReducer";

export const TournamentListPage = () => {

    const tournamentList = useSelector(getTournamentListSelector)

    const {setTournamentListAction} = useActions(TournamentActions)

    const {getList} = useThunks(tournamentThunk)

    useEffect(() => {
        getList()
        return () => {
            setTournamentListAction(null)
        }
    }, [])

    return (
        <div className={css(s.TournamentListPage)}>
            <div className={css(s.container)}>
                <div className={css(s.head)}>
                    <div className={css(s.headTitle)}>
                        каталог турниров
                    </div>
                </div>
                <div className={css(s.filter)}>
                    <Button text={'все'} modes={[`uppercase`, `mobilSmall`, true ? `active`:``]}/>
                    <Button text={'скоро старт'} modes={[`uppercase`, `mobilSmall`]}/>
                    <Button text={'сейчас идет'} modes={[`uppercase`, `mobilSmall`]}/>
                    <Button text={'закончен'} modes={[`uppercase`, `mobilSmall`]}/>
                </div>
                <div className={css(s.list)}>
                    {tournamentList === null && <div className={css(s.loadingList)}>
                        <img src={loadGif} alt="load"/>
                        Загрузка...
                    </div>}
                    {tournamentList?.map((item, index) =>
                        <TournamentItem key={index} item={item}/>
                    )}
                    {tournamentList !== null && !tournamentList.length && <div className={css(s.emptyList)}>
                        Список турниров пуст
                    </div>}
                </div>
                {tournamentList !== null && tournamentList.length >= 12 &&
                    <div className={css(s.btnBox)}>
                        <Button text={'показать больше'} modes={[`uppercase`, 'maxWidth', `mobilSmall`]}/>
                    </div>}
            </div>
        </div>
    );
};
