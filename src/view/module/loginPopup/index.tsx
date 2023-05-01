import s from './index.module.scss'
import {css} from "lib/customClassName";
import {useClickOutside} from "lib/useClickOutside";
import {createPortal} from "react-dom";
import {useCallback, useState} from "react";
import {authThunk} from "store/auth/thunk/authThunk";
import {useThunks} from "lib/reduxHook";
import {Button} from "view/components/button";

type PropsType = {
    close: Function,
    mode?: 'login'|'registration',
    element?: HTMLElement
}
export const LoginPopup = (props: PropsType) => {
    const {close, element = document.body, mode = 'login'} = props

    const [currentMode, setCurrentMode] = useState(mode)
    const [isLoading, setIsLoading] = useState(false)

    useClickOutside(() => !isLoading && close(), [`LoginPopup`], [isLoading])

    return createPortal(
            <div className={css(s.LoginPopup)} onClick={e => e.stopPropagation()}>
                <div id={`LoginPopup`} className={css(s.main)}>
                    {currentMode === 'login'
                        ? <Login setCurrentMode={setCurrentMode} isLoading={isLoading} setIsLoading={setIsLoading}/>
                        : <Registration setCurrentMode={setCurrentMode} isLoading={isLoading} setIsLoading={setIsLoading}/>
                    }
                    {!isLoading && <div className={css(s.closeBtn)} onClick={() => close()}/>}
                </div>
            </div>
    , element);
};

type LoginPropsType = {
    setCurrentMode: Function
    setIsLoading: Function
    isLoading: boolean
}
const Login = (props: LoginPropsType) => {
    const {setCurrentMode, isLoading, setIsLoading} = props

    const [data, setData] = useState<{ login: string, password: string }>({login: '', password: ''})
    const [error, setError] = useState<string|null>(null)

    const {login} = useThunks(authThunk)

    const errorCallback = useCallback((message: string)=>{
        setError(message)
    },[])

    const loginHandler = async (e: any) => {
        e.preventDefault()
        setIsLoading(true)
        await login({
            data: {
                login: data.login,
                pswd: data.password
            },
            errorCallback: errorCallback
        })
        setIsLoading(false)
    }

    const changeLoginHandler = (e) => {
        setData(prev => ({...prev, login: e.target.value}))
        setError(null)
    }
    const changePasswordHandler = (e) => {
        setData(prev => ({...prev, password: e.target.value}))
        setError(null)
    }

    return (
        <div className={css(s.Login)}>
            <div className={css(s.title)}>Вход</div>
            {error !== null && <div className={css(s.errorMessage)}>{error}</div>}
            <form onSubmit={loginHandler}>
                <input type="text" disabled={isLoading} placeholder={`Email:`} onChange={changeLoginHandler}/>
                <input type="text" disabled={isLoading} placeholder={`Пароль:`} onChange={changePasswordHandler}/>
                <div className={css(s.sendBtnBox)}>
                    <Button text={`Войти`} modes={[`maxWidth`,`red`,`noRadius`]} isLoading={isLoading}/>
                </div>
            </form>
            <div className={css(s.changeMode)}>
                <span>У вас нет аккаунта?</span>
                <span className={css(s.btn)} onClick={() => !isLoading && setCurrentMode('registration')}>Создать</span>
            </div>
        </div>
    );
};

type RegistrationPropsType = {
    setCurrentMode: Function
    setIsLoading: Function
    isLoading: boolean
}
const Registration = (props: RegistrationPropsType) => {
    const {setCurrentMode, isLoading, setIsLoading} = props

    const [data, setData] = useState<{ login: string, password: string, confirm: string }>({login: '', password: '', confirm: ''})
    const [error, setError] = useState<string|null>(null)

    const {registration} = useThunks(authThunk)

    const errorCallback = useCallback((message: string)=>{
        setError(message)
    },[])

    const registrationHandler = async (e: any) => {
        e.preventDefault()
        if (data.password !== data.confirm) {
            setError(`Пароли не совпадают`)
            return
        }
        setIsLoading(true)
        await registration({
            data: {
                login: data.login,
                pswd: data.password
            },
            errorCallback: errorCallback
        })
        setIsLoading(false)
    }
    const changeLoginHandler = (e) => {
        setData(prev => ({...prev, login: e.target.value}))
        setError(null)
    }
    const changePasswordHandler = (e) => {
        setData(prev => ({...prev, password: e.target.value}))
        setError(null)
    }
    const changeConfirmHandler = (e) => {
        setData(prev => ({...prev, confirm: e.target.value}))
        setError(null)
    }

    return (
        <div className={css(s.Registration)}>
            <div className={css(s.title)}>Регистрация</div>
            {error !== null && <div className={css(s.errorMessage)}>{error}</div>}
            <form onSubmit={registrationHandler}>
                <input type="text" disabled={isLoading} placeholder={`Email:`} onChange={changeLoginHandler}/>
                <input type="text" disabled={isLoading} placeholder={`Пароль:`} onChange={changePasswordHandler}/>
                <input type="text" disabled={isLoading} placeholder={`Повторите пароль:`} onChange={changeConfirmHandler}/>
                <div className={css(s.sendBtnBox)}>
                    <Button text={`Создать`} modes={[`maxWidth`,`red`,`noRadius`]} isLoading={isLoading}/>
                </div>
            </form>
            <div className={css(s.changeMode)}>
                <span>У вас уже есть аккаунт?</span>
                <span className={css(s.btn)} onClick={() => !isLoading && setCurrentMode('login')}>Войти</span>
            </div>
        </div>
    );
};
