import s from './style.module.scss'
import {css} from "lib/customClassName";
import {Outlet} from "react-router-dom";
import React, {useEffect} from "react";
import {useActions} from "lib/reduxHook";
import {TournamentActions} from "store/tournament/reducer/tournamentReducer";

export const TournamentLayout = () => {

    const {setFullTournamentAction} = useActions(TournamentActions)

    useEffect(() => {
        return () => {
            setFullTournamentAction(null)
        }
    }, [])

    return (
        <div className={css(s.TournamentLayout)}>
            <Outlet/>
        </div>
    );
};
