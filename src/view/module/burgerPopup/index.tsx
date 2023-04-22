import s from './index.module.scss'
import {css} from "lib/customClassName";
import {Button} from "view/components/button";

export const BurgerPopup = () => {

    return (
        <div className={css(s.BurgerPopup)}>
            <div className={css(s.popupHeader)}>
                <div className={css(s.title)}>
                    Кнопки меню
                </div>
            </div>
            <div className={css(s.profileNav)}>
                <div className={css(s.navItem)}>
                    <div className={css(s.key)}>Программы тренировок</div>
                </div>
                <div className={css(s.navItem)}>
                    <div className={css(s.key)}>Тренеры</div>
                </div>
                <div className={css(s.navItem)}>
                    <div className={css(s.key)}>Испытания WOD</div>
                </div>
                <div className={css(s.navItem)}>
                    <div className={css(s.key)}>Статьи</div>
                </div>
                <div className={css(s.navItem)}>
                    <div className={css(s.key)}>упражнения</div>
                </div>
                <div className={css(s.navItem)}>
                    <div className={css(s.key)}>Группа вконтакте</div>
                </div>
                <div className={css(s.navItem)}>
                    <div className={css(s.key)}>Канал на youtube</div>
                </div>
            </div>
        </div>
    );
};
