import s from './style.module.scss'
import {css} from "lib/customClassName";
import {useNavigate} from "react-router-dom";

export const AdminNavigate = () => {
    const navigate = useNavigate()

    return (
        <div className={css(s.AdminNavigate)}>
            <div className={css(s.navItem)} onClick={()=>navigate(`tournament`)}>
                турниры
            </div>
            <div className={css(s.navItem)} onClick={()=>navigate(`result`)}>
                прием результатов
            </div>
            <div className={css(s.navItem)} onClick={()=>navigate(`user`)}>
                пользователи
            </div>
            <div className={css(s.navItem)} onClick={()=>navigate(`statistic`)}>
                статистика
            </div>
            <div className={css(s.navItem)} onClick={()=>navigate(`partner`)}>
                партнёры
            </div>
        </div>
    );
};
