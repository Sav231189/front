import s from './style.module.scss'
import {css} from "lib/customClassName";
import {Outlet} from "react-router-dom";
import React from "react";

export const TournamentLayout = () => {

    return (
        <div className={css(s.TournamentLayout)}>
            <Outlet/>
        </div>
    );
};
