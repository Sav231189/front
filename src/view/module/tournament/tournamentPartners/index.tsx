import s from './style.module.scss'
import {css} from "lib/customClassName";

const partners = [
    {
        id: 1,
        link: ''
    },
    {
        id: 2,
        link: ''
    },
    {
        id: 3,
        link: ''
    },
]
type PropsType = {
    tournamentId: number
}
export const TournamentPartners = (props: PropsType) => {
    const {tournamentId} = props

    return (
        <div className={css(s.TournamentPartners)}>
            <div className={css(s.title)}>
                НАШИ ПАРТНЕРЫ
            </div>
            <div className={css(s.list)}>
                {partners.map((partner) => {
                    return <div key={partner.id} className={css(s.partnerItem)}></div>
                })}
            </div>
        </div>
    );
};
