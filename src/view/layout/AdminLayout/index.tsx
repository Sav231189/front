import s from './style.module.scss'
import {css} from "lib/customClassName";
import {Outlet} from "react-router-dom";
import React from "react";
import {AdminNavigate} from "view/module/admin/navigate";

export const AdminLayout = () => {

    return (
        <div className={css(s.AdminLayout)}>
            <div className={css(s.container)}>
                <AdminNavigate />
                <Outlet/>
            </div>
        </div>
    );
};
