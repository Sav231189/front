import s from './style.module.scss'
import {css} from "lib/customClassName";
import {useMatch, useNavigate} from "react-router-dom";

export const AdminNavigate = () => {
    const navigate = useNavigate()

    return (
        <div className={css(s.AdminNavigate)}>
            <div className={css(s.navItem, !!useMatch("/admin/tournament/*") && s.active)} onClick={()=>navigate(`tournament`)}>
                турниры
            </div>
            <div className={css(s.navItem, !!useMatch("/admin/result/*") && s.active)} onClick={()=>navigate(`result`)}>
                прием результатов
            </div>
            <div className={css(s.navItem, !!useMatch("/admin/user/*") && s.active)} onClick={()=>navigate(`user`)}>
                пользователи
            </div>
            <div className={css(s.navItem, !!useMatch("/admin/statistic/*") && s.active)} onClick={()=>navigate(`statistic`)}>
                статистика
            </div>
            <div className={css(s.navItem, !!useMatch("/admin/partner/*") && s.active)} onClick={()=>navigate(`partner`)}>
                партнёры
            </div>
        </div>
    );
};
