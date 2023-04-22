import s from './index.module.scss'
import {css} from "lib/customClassName";
import {useNavigate} from "react-router-dom";
import {TournamentType} from "types/TournamentType";
import {Button} from "view/components/button";
import {PositionBtn} from "view/components/positionBtn";

type PropsType = {
    item: TournamentType
    isEditable?: boolean
}
export const TournamentItem = (props: PropsType) => {
    const {item, isEditable = false} = props
    const navigate = useNavigate()

    const openTournamentHandler = () => {
        navigate(`/tournament/${item.id}`)
    }
    const openAdminTournamentHandler = () => {
        navigate(`/admin/tournament/edit/${item.id}`)
    }
    const openAdminCategoryHandler = () => {
        navigate(`/admin/category-list/${item.id}`)
    }
    const prevPositionTournamentHandler = () => {
        console.log(`prevPositionTournamentHandler`)
    }
    const nextPositionTournamentHandler = () => {
        console.log(`nextPositionTournamentHandler`)
    }

    return (
        <div className={css(s.BestsellerItem)} onClick={openTournamentHandler}>
            <div className={css(s.imgBox)}>
                <img src={item.img} alt="img"/>
            </div>
            <div className={css(s.title)}>{item.title}</div>
            <div className={css(s.text)}>{item.text}</div>
            <div className={css(s.status)}>
                {(()=>{
                    switch (item.status) {
                        case 1: return <span className={css(s.soon)}>скоро старт</span>
                        case 2: return <span className={css(s.work)}>сейчас идет</span>
                        case 3: return <span className={css(s.finish)}>закончен</span>
                        default: return null
                    }
                })()}
            </div>
            {isEditable && <div className={css(s.isEditable)} onClick={e=>e.stopPropagation()}>
                <Button text={`Редактировать турнир`} modes={[`maxWidth`,`mobilSmall`,`red`]} click={openAdminTournamentHandler}/>
                <Button text={`Редактировать категории`} modes={[`maxWidth`,`mobilSmall`,`red`]} click={openAdminCategoryHandler}/>
                <PositionBtn title={`Позиция`}/>
                <Button text={`Открыть турнир`} modes={[`maxWidth`,`mobilSmall`]} click={openTournamentHandler}/>
            </div>}
        </div>
    );
};
