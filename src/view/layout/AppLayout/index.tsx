import React from 'react';
import {Outlet} from "react-router-dom";
import {css} from "lib/customClassName";
import s from './index.module.scss'
import {Header} from "view/module/header";
import {Footer} from "view/module/footer";

export const AppLayout = () => {

    return (
        <div id={`AppLayout`} className={css(s.AppLayout)}>
            <Header />
            <Outlet/>
            <Footer />
        </div>
    );
};
