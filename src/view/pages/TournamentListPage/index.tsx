import s from './style.module.scss'
import {css} from "lib/customClassName";
import {TournamentItem} from "view/components/tournamentItem";
import {Button} from "view/components/button";
import {useSelector} from "react-redux";
import {getTournamentListSelector} from "store/tournament/selector/getTournamentList";
import {useThunks} from "lib/reduxHook";
import {tournamentThunk} from "store/tournament/thunk/tournamentThunk";
import {useEffect} from "react";
import loadGif from 'view/assets/images/Load.gif'

export const TournamentListPage = () => {

    const tournamentList = useSelector(getTournamentListSelector)

    const {getList} = useThunks(tournamentThunk)

    useEffect(() => {
        getList()
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
                    <Button text={'скоро старт'} modes={[`uppercase`, `mobilSmall`]}/>
                    <Button text={'сейчас идет'} modes={[`uppercase`, `mobilSmall`]}/>
                    <Button text={'закончен'} modes={[`uppercase`, `mobilSmall`]}/>
                </div>
                <div className={css(s.list)}>
                    {tournamentList === null && <div className={css(s.loadingList)}>
                        <img src={loadGif} alt="load"/>
                    </div>}
                    {tournamentList?.map((item, index) =>
                        <TournamentItem key={index} item={item}/>
                    )}
                </div>
                {tournamentList !== null &&
                    <div className={css(s.btnBox)}>
                        <Button text={'показать больше'} modes={[`uppercase`, 'maxWidth', `mobilSmall`]}/>
                    </div>}
            </div>
        </div>
    );
};
