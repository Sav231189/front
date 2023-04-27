import s from './style.module.scss'
import {css} from "lib/customClassName";
import {Popup} from "view/components/popup";
import {Button} from "view/components/button";
import {InputText} from "view/components/InputText";
import {ResultType} from "types/ResultType";
import {useEffect, useState} from "react";
import {useActions} from "lib/reduxHook";
import {ResultActions} from "store/result/reducer/ResultReducer";
import {useSelector} from "react-redux";
import {getResultByIdSelector} from "store/result/selector/getResultById";
import {getConfirmResultSelector} from "store/result/selector/getConfirmResult";

type PropsType = {
    close: () => void
    result: ResultType
}
export const ConfirmResultPopup = (props: PropsType) => {
    const {close, result} = props

    const confirmResult = useSelector(getConfirmResultSelector)

    const {setConfirmResultAction} = useActions(ResultActions)

    const [timeMaxValue, setTimeMaxValue] = useState<[number, number]>([0, 0])
    const [timeMinValue, setTimeMinValue] = useState<[number, number]>([0, 0])
    const [weightValue, setWeightValue] = useState<[number, number]>([0, 0])
    const [amountValue, setAmountValue] = useState<number>(0)
    const [heightValue, setHeightValue] = useState<[number, number]>([0, 0])

    useEffect(() => {
        setConfirmResultAction(result)
    }, [])

    useEffect(() => {
        setConfirmResultAction(result)
        switch (result.taskTypeId) {
            case 1: {
                const value = parseInt(result.value)
                setTimeMinValue([(value - value % 60) / 60, value % 60])
                break
            }
            case 2: {
                const value = parseInt(result.value)
                setTimeMaxValue([(value - value % 60) / 60, value % 60])
                break
            }
            case 3: {
                const value = parseInt(result.value)
                setAmountValue(value)
                break
            }
            case 4: {
                const value = parseInt(result.value)
                setWeightValue([(value - value % 1000) / 1000, value % 1000])
                break
            }
            case 5: {
                const value = parseInt(result.value)
                setHeightValue([(value - value % 100) / 100, value % 100])
                break
            }
        }
    }, [])

    const setMinuteMinHandler = (str: string) => {
        const value = parseInt(str)
        if (!confirmResult) return
        if (value > 3600) return
        if (value < 0) return
        setTimeMinValue(prev => {
            return [!value ? 0 : value, prev[1]]
        })
        const newValue = !((value * 60) + timeMinValue[1]) && ((value * 60) + timeMinValue[1]) !== 0 ? timeMinValue[1] : ((value * 60) + timeMinValue[1])
        setConfirmResultAction({...confirmResult, value: newValue})

    }
    const setSecondMinHandler = (str: string) => {
        const value = parseInt(str)
        if (!confirmResult) return
        if (value > 59) return
        if (value < 0) return
        setTimeMinValue(prev => {
            return [prev[0], !value ? 0 : value]
        })
        const newValue = !(timeMinValue[0] * 60 + value) ? (timeMinValue[0] * 60) : (timeMinValue[0] * 60 + value)
        setConfirmResultAction({...confirmResult, value: newValue})
    }
    const setMinuteMaxHandler = (str: string) => {
        const value = parseInt(str)
        if (!confirmResult) return
        if (value > 3600) return
        if (value < 0) return
        setTimeMaxValue(prev => {
            return [!value ? 0 : value, prev[1]]
        })
        const newValue = !((value * 60) + timeMaxValue[1]) && ((value * 60) + timeMaxValue[1]) !== 0 ? timeMaxValue[1] : ((value * 60) + timeMaxValue[1])
        setConfirmResultAction({...confirmResult, value: newValue})

    }
    const setSecondMaxHandler = (str: string) => {
        const value = parseInt(str)
        if (!confirmResult) return
        if (value > 59) return
        if (value < 0) return
        setTimeMaxValue(prev => {
            return [prev[0], !value ? 0 : value]
        })
        const newValue = !(timeMaxValue[0] * 60 + value) ? (timeMaxValue[0] * 60) : (timeMaxValue[0] * 60 + value)
        setConfirmResultAction({...confirmResult, value: newValue})
    }
    const setWeightKilogramHandler = (str: string) => {
        const value = parseInt(str)
        if (!confirmResult) return
        if (value > 1_000_000) return
        if (value < 0) return
        setWeightValue(prev => {
            return [!value ? 0 : value, prev[1]]
        })
        const newValue = !((value * 1000) + weightValue[1]) && ((value * 1000) + weightValue[1]) !== 0 ? weightValue[1] : ((value * 1000) + weightValue[1])
        setConfirmResultAction({...confirmResult, value: newValue})

    }
    const setWeightGramHandler = (str: string) => {
        const value = parseInt(str)
        if (!confirmResult) return
        if (value > 1_000) return
        if (value < 0) return
        setWeightValue(prev => {
            return [prev[0], !value ? 0 : value]
        })
        const newValue = !(weightValue[0] * 1000 + value) ? (weightValue[0] * 1000) : (weightValue[0] * 1000 + value)
        setConfirmResultAction({...confirmResult, value: newValue})
    }
    const setHeightMHandler = (str: string) => {
        const value = parseInt(str)
        if (!confirmResult) return
        if (value > 1_000_000) return
        if (value < 0) return
        setHeightValue(prev => {
            return [!value ? 0 : value, prev[1]]
        })
        const newValue = !((value * 100) + heightValue[1]) && ((value * 100) + heightValue[1]) !== 0 ? heightValue[1] : ((value * 100) + heightValue[1])
        setConfirmResultAction({...confirmResult, value: newValue})

    }
    const setHeightSMHandler = (str: string) => {
        const value = parseInt(str)
        if (!confirmResult) return
        if (value >= 100) return
        if (value < 0) return
        setHeightValue(prev => {
            return [prev[0], !value ? 0 : value]
        })
        const newValue = !(heightValue[0] * 100 + value) ? (heightValue[0] * 100) : (heightValue[0] * 100 + value)
        setConfirmResultAction({...confirmResult, value: newValue})
    }
    const setAmountHandler = (str: string) => {
        const value = parseInt(str)
        if (!confirmResult) return
        if (value > 64_000) return
        if (value < 0) return
        setAmountValue(!value ? 0 : value)
        const newValue = !value ? 0 : value
        setConfirmResultAction({...confirmResult, value: newValue})
    }

    const getUrlYoutube = (url:string) => {
        return /^https?\:\/\/(www\.)?youtu\.be/.test(url) ? url.replace(/^https?\:\/\/(www\.)?youtu\.be\/([\w-]{11}).*/,"$2") : url.replace(/.*\?v\=([\w-]{11}).*/,"$1");
    }

    const confirmResultHandler = () => {

    }
    const rejectResultHandler = () => {

    }

    return (
        <Popup clickCloseBtnCallback={close}>
            <div className={css(s.ConfirmResultPopup)}>
                <div className={css(s.head)}>
                    Прием результата
                </div>
                <div className={css(s.videoBlock)}>
                    <iframe width="100%" height="304px" src={`http://www.youtube.com/embed/${getUrlYoutube(result.youtube)}`}
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen></iframe>

                    {/*<iframe src='https://www.youtube.com/watch?v=wpy6BU6h4FY&ab_channel=PurpleSchool%7CAntonLarichev'*/}
                    {/*        frameBorder={0}*/}
                    {/*        allowFullScreen={true}*/}
                    {/*        allow={'autoplay;modestbranding'}*/}
                    {/*>*/}

                    {/*</iframe>*/}
                </div>
                <div className={css(s.value)}>
                    {!!result && (() => {
                        switch (Number(result?.taskTypeId)) {
                            case 1:
                                return <div className={css(s.time)}>
                                    <InputText type={`number`} change={setMinuteMinHandler}
                                               modes={[`maxWidth`, `center`]}
                                               min={0} max={3600}
                                               value={String(timeMinValue[0])}
                                               title={`минуты`} placeholder={`0`}/>
                                    <InputText type={`number`} change={setSecondMinHandler}
                                               modes={[`maxWidth`, `center`]}
                                               min={0} max={59}
                                               value={((timeMinValue[1] < 10 && timeMinValue[1] >= 0) ? '0' : '' ) + String(timeMinValue[1])}
                                               title={`секунды`}
                                               placeholder={`0`}/>
                                </div>;
                            case 2:
                                return <div className={css(s.time)}>
                                    <InputText type={`number`} change={setMinuteMaxHandler}
                                               modes={[`maxWidth`, `center`]}
                                               min={0} max={3600}
                                               value={String(timeMaxValue[0])}
                                               title={`минуты`} placeholder={`0`}/>
                                    <InputText type={`number`} change={setSecondMaxHandler}
                                               modes={[`maxWidth`, `center`]}
                                               min={0} max={59}
                                               value={((timeMaxValue[1] < 10 && timeMaxValue[1] >= 0) ? '0' : '') + String(timeMaxValue[1])}
                                               title={`секунды`}
                                               placeholder={`0`}/>
                                </div>;
                            case 3:
                                return <div className={css(s.amount)}>
                                    <InputText type={`number`} change={setAmountHandler}
                                               modes={[`maxWidth`, `center`]}
                                               min={0} max={64_000}
                                               value={String(amountValue)} title={`количество (шт / раз)`}
                                               placeholder={`0`}/>
                                </div>;
                            case 4:
                                return <div className={css(s.weight)}>
                                    <InputText type={`number`} change={setWeightKilogramHandler}
                                               modes={[`maxWidth`, `center`]}
                                               min={0} max={1000000}
                                               value={(String(weightValue[0]))}
                                               title={`килограммы`} placeholder={`0`}/>
                                    <InputText type={`number`} change={setWeightGramHandler}
                                               modes={[`maxWidth`, `center`]}
                                               min={0} max={1000}
                                               value={((weightValue[1] < 10 && weightValue[1] >= 0) ? '00' : (weightValue[1] < 100 && weightValue[1] > 9) ? '0' : '') + String(weightValue[1])}
                                               title={`граммы`}
                                               placeholder={`0`}/>
                                </div>;
                            case 5:
                                return <div className={css(s.time)}>
                                    <InputText type={`number`} change={setHeightMHandler}
                                               modes={[`maxWidth`, `center`]}
                                               min={0} max={3600}
                                               value={String(heightValue[0])}
                                               title={`метры`} placeholder={`0`}/>
                                    <InputText type={`number`} change={setHeightSMHandler}
                                               modes={[`maxWidth`, `center`]}
                                               min={0} max={59}
                                               value={((heightValue[1] < 10 && heightValue[1] >= 0) ? '0' :  '') + String(heightValue[1])}
                                               title={`сантиметры`}
                                               placeholder={`0`}/>
                                </div>;
                            default:
                                return null
                        }
                    })()}
                </div>
                <div className={css(s.comment)}>
                    <div className={css(s.subTitle)}>Комментарий</div>
                    <textarea placeholder={`Введите текст`}/>
                </div>
                <div className={css(s.btnBox)}>
                    <Button text={`принять`} modes={[`red`,`maxWidth`,`noRadius`]}/>
                    <Button text={`отклонить`} modes={[`maxWidth`,`noRadius`]}/>
                </div>
            </div>
        </Popup>
    );
};
