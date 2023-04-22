import s from './index.module.scss'
import {css} from "lib/customClassName";
import {useState} from "react";
import {useClickOutside} from "lib/useClickOutside";

type PropsType = {
    index: number
}
export const FeedBackItem = (props: PropsType) => {
    const {index} = props

    const [isBig, setIsBig] = useState(false)

    useClickOutside(() => setIsBig(false), [`FeedBackItem${index}`])

    return (
        <div id={`FeedBackItem${index}`} className={css(s.FeedBackItem)} >
            <div className={css(s.icon, isBig && s.big)}>

            </div>
            <div className={css(s.main)}>
                <div className={css(s.fullName)}>
                    Андрей Фамилия
                </div>
                <div className={css(s.text, isBig && s.Big)}>
                    <div className={css(s.value)}>
                        Пришел на кузницу спорта от того, что надоела собственная никчемность. Был просто
                        физкультурником, силовых толком не было, да и делал тройку базовых упражнений, а толка было
                        мало. Наткнулся на канал на youtube, смотрю есть и гири, и штанга, и кольца (на которых не
                        умел). На сайте нашел программы тренировок, решил взять Fanatic Strong так как, мне это было
                        ближе. Первые 3 месяца умирал от такой интенсивности. Результаты превзошли мои ожидания. Как
                        организм адаптировался, дыхание перестало сбиваться, пульс пришел в норму, сила значительно
                        повысилась! По результатам: был до занятий 105-106кг (сало преобладало), после окончания Fanatic
                        Strong стало 99кг, присед со штангой на спине был 80кг, стал 105кг, фронтальный присед был 60кг,
                        стала 100кг, арамейский жим был 50кг, стал 65кг, швунги не делал раньше, а тут дошел до 85кг,
                        становая тяга была 130кг стала 150кг (могу больше на 10кг, но побоялся), подтягивался плохо
                        (раза 4-5) сейчас 12-14, научился на кольцах отжиматься 6-8 раз за подход, открыл для себя
                        тяжело атлетические упражнения! Подносы ног к перекладине вообще не давались. Сейчас могу
                        10-12раз за подход. При вопросах, всегда отвечают в группе в контакте и корректируют ошибки. В
                        общем я доволен!
                        <div className={css(s.closeBtn)} onClick={() => setIsBig(false)}>
                            <span>Свернуть</span>
                        </div>
                    </div>
                </div>
                <div className={css(s.openBtn)} onClick={() => setIsBig(true)}>
                    <span>Развернуть</span>
                </div>
            </div>
        </div>
    );
};
