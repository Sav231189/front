import s from './style.module.scss'
import {css} from "lib/customClassName";
import {InputText} from "view/components/InputText";
import {Button} from "view/components/button";

export const ProfilePage = () => {

    return (
        <div className={css(s.ProfilePage)}>
            <div className={css(s.container)}>
                <div className={css(s.titlePage)}>Профиль</div>
                <div className={css(s.main)}>
                    <div className={css(s.form)}>
                        <InputText
                            value={''}
                            modes={[`maxWidth`]}
                            placeholder={'имя'}
                            title={`Введите ваше имя`}/>
                        <InputText
                            value={''}
                            modes={[`maxWidth`]}
                            placeholder={'фамилия'}
                            title={`Введите вашу фамилию`}/>
                        <InputText
                            value={''}
                            modes={[`maxWidth`]}
                            placeholder={'отчество'}
                            title={`Введите ваше отчество`}/>
                        <InputText
                            value={''}
                            modes={[`maxWidth`]}
                            placeholder={'СОЦИАЛЬНАЯ СЕТЬ'}
                            title={`Введите ссылку на вашу социальную сеть для связи *виден только администраторам  `}/>
                        <InputText
                            value={''}
                            modes={[`maxWidth`]}
                            placeholder={'пол'}
                            title={`Введите ваш пол`}/>
                        <InputText
                            value={''}
                            modes={[`maxWidth`]}
                            placeholder={'город'}
                            title={`Введите ваш город`}/>
                        <InputText
                            value={''}
                            modes={[`maxWidth`]}
                            placeholder={'зал'}
                            title={`Введите зал для занятий (свободный текст с ограничением в 35 символов)`}/>
                        <InputText
                            value={''}
                            modes={[`maxWidth`]}
                            placeholder={'размер'}
                            title={`Введите ваш размер одежды`}/>
                        <InputText
                            value={''}
                            modes={[`maxWidth`]}
                            placeholder={'вес'}
                            title={`Введите ваш вес`}/>
                        <InputText
                            value={''}
                            modes={[`maxWidth`]}
                            placeholder={'РОСТ'}
                            title={`Введите ваш рост`}/>
                        <div className={css(s.sendBtnBox)}>
                            <Button text={`Сохранить изменения    →`} modes={[`red`, `noRadius`, `maxWidth`]}/>
                        </div>
                    </div>
                    <div className={css(s.avatar)}>
                        <div className={css(s.imgBox)}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
