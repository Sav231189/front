import s from './style.module.scss'
import {css} from "lib/customClassName";
import {useThunks} from "lib/reduxHook";
import {resultThunk} from "store/result/thunk/resultThunk";
import {useEffect} from "react";
import {getAdminResultListSelector} from "store/result/selector/getAdminResultList";
import {useSelector} from "react-redux";
import loadGif from "view/assets/images/Load.gif";
import {AdminResultItem} from "view/components/adminResultItem";

export const ResultPage = () => {

    const adminResultList = useSelector(getAdminResultListSelector)
    const {getAdminList} = useThunks(resultThunk)

    useEffect(() => {
        getAdminList()
    }, [])

    return (
        <div className={css(s.ResultPage)}>
            <div className={css(s.head)}>
                Приём результатов
            </div>
            <div className={css(s.list)}>
                {adminResultList === null && <div className={css(s.loadingList)}>
                    <img src={loadGif} alt="load"/>
                    <span>Загрузка...</span>
                </div>}
                {adminResultList !== null && adminResultList.length === 0 &&
                    <div className={css(s.emptyList)}>Список пуст</div>}
                {adminResultList !== null && adminResultList.length > 0 && adminResultList.map(result =>
                    <AdminResultItem key={result.id} result={result}/>)}
            </div>
        </div>
    );
};
