import s from './style.module.scss'
import {css} from "lib/customClassName";
import {TaskType} from "types/TaskType";
import {Button} from "view/components/button";
import {useEffect, useState} from "react";
import {useActions, useThunks} from "lib/reduxHook";
import {resultThunk} from "store/result/thunk/resultThunk";
import {useSelector} from "react-redux";
import {getResultByIdSelector} from "store/result/selector/getResultById";
import {InputText} from "view/components/InputText";
import {ResultActions} from "store/result/reducer/ResultReducer";
import {ResultType} from "types/ResultType";

type PropsType = {
    task: TaskType
}
export const TaskItem = (props: PropsType) => {
    const {task} = props

    const [timeMaxValue, setTimeMaxValue] = useState<[number, number]>([0, 0])
    const [timeMinValue, setTimeMinValue] = useState<[number, number]>([0, 0])
    const [weightValue, setWeightValue] = useState<[number, number]>([0, 0])
    const [amountValue, setAmountValue] = useState<number>(0)
    const [heightValue, setHeightValue] = useState<[number, number]>([0, 0])

    const [oldResult, setOldResult] = useState<ResultType>()

    const [isChange, setIsChange] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    const result = useSelector(getResultByIdSelector(Number(task.id)))

    const {changeResultByIdAction} = useActions(ResultActions)

    const {addResultItems, create, update} = useThunks(resultThunk)

    useEffect(() => {
        if (!result) return
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

        if (!oldResult) setOldResult(result)
        if (!!oldResult && oldResult.value !== result.value) {
            setIsChange(true)
        } else if (!!oldResult && oldResult.youtube !== result.youtube) {
            setIsChange(true)
        } else if (isChange) {
            setIsChange(false)
        }

    }, [result])

    useEffect(() => {
        addResultItems(Number(task.id))
    }, [])

    const setMinuteMinHandler = (str: string) => {
        const value = parseInt(str)
        if (value > 3600) return
        if (value < 0) return
        setTimeMinValue(prev => {
            return [!value ? 0 : value, prev[1]]
        })
        const newValue = !((value * 60) + timeMinValue[1]) && ((value * 60) + timeMinValue[1]) !== 0 ? timeMinValue[1] : ((value * 60) + timeMinValue[1])
        changeResultByIdAction({...result, value: newValue})

    }
    const setSecondMinHandler = (str: string) => {
        const value = parseInt(str)
        if (value > 59) return
        if (value < 0) return
        setTimeMinValue(prev => {
            return [prev[0], !value ? 0 : value]
        })
        const newValue = !(timeMinValue[0] * 60 + value) ? (timeMinValue[0] * 60) : (timeMinValue[0] * 60 + value)
        changeResultByIdAction({...result, value: newValue})
    }
    const setMinuteMaxHandler = (str: string) => {
        const value = parseInt(str)
        if (value > 3600) return
        if (value < 0) return
        setTimeMaxValue(prev => {
            return [!value ? 0 : value, prev[1]]
        })
        const newValue = !((value * 60) + timeMaxValue[1]) && ((value * 60) + timeMaxValue[1]) !== 0 ? timeMaxValue[1] : ((value * 60) + timeMaxValue[1])
        changeResultByIdAction({...result, value: newValue})

    }
    const setSecondMaxHandler = (str: string) => {
        const value = parseInt(str)
        if (value > 59) return
        if (value < 0) return
        setTimeMaxValue(prev => {
            return [prev[0], !value ? 0 : value]
        })
        const newValue = !(timeMaxValue[0] * 60 + value) ? (timeMaxValue[0] * 60) : (timeMaxValue[0] * 60 + value)
        changeResultByIdAction({...result, value: newValue})
    }
    const setWeightKilogramHandler = (str: string) => {
        const value = parseInt(str)
        if (value > 1_000_000) return
        if (value < 0) return
        setWeightValue(prev => {
            return [!value ? 0 : value, prev[1]]
        })
        const newValue = !((value * 1000) + weightValue[1]) && ((value * 1000) + weightValue[1]) !== 0 ? weightValue[1] : ((value * 1000) + weightValue[1])
        changeResultByIdAction({...result, value: newValue})

    }
    const setWeightGramHandler = (str: string) => {
        const value = parseInt(str)
        if (value > 1_000) return
        if (value < 0) return
        setWeightValue(prev => {
            return [prev[0], !value ? 0 : value]
        })
        const newValue = !(weightValue[0] * 1000 + value) ? (weightValue[0] * 1000) : (weightValue[0] * 1000 + value)
        changeResultByIdAction({...result, value: newValue})
    }
    const setHeightMHandler = (str: string) => {
        const value = parseInt(str)
        if (value > 1_000_000) return
        if (value < 0) return
        setHeightValue(prev => {
            return [!value ? 0 : value, prev[1]]
        })
        const newValue = !((value * 100) + heightValue[1]) && ((value * 100) + heightValue[1]) !== 0 ? heightValue[1] : ((value * 100) + heightValue[1])
        changeResultByIdAction({...result, value: newValue})

    }
    const setHeightSMHandler = (str: string) => {
        const value = parseInt(str)
        if (value >= 100) return
        if (value < 0) return
        setHeightValue(prev => {
            return [prev[0], !value ? 0 : value]
        })
        const newValue = !(heightValue[0] * 100 + value) ? (heightValue[0] * 100) : (heightValue[0] * 100 + value)
        changeResultByIdAction({...result, value: newValue})
    }
    const setAmountHandler = (str: string) => {
        const value = parseInt(str)
        if (value > 64_000) return
        if (value < 0) return
        setAmountValue(!value ? 0 : value)
        const newValue = !value ? 0 : value
        changeResultByIdAction({...result, value: newValue})
    }
    const setYoutubeHandler = (str: string) => {
        changeResultByIdAction({...result, youtube: str})
    }

    const sendResultHandler = async () => {
        if (!task.id) return

        setOldResult(undefined)
        setIsLoading(true)
        await create(task.id)
        setIsLoading(false)
    }
    const updateResultHandler = async () => {
        if (!task.id) return

        setOldResult(undefined)
        setIsLoading(true)
        await update(task.id)
        setIsLoading(false)
    }

    return (
        <div className={css(s.TaskItem)}>
            <div className={css(s.title)}>
                <div className={css(s.name)}>{task.name}</div>
                <div className={css(s.status, s[result?.status])}>
                    {(() => {
                        switch (result?.status) {
                            case 'new':
                                return 'Ожидает заполнения';
                            case 'await':
                                return 'Ожидает проверки';
                            case 'access':
                                return 'Результат принят';
                            case 'reject':
                                return 'Результат не принят';
                            default:
                                return null
                        }
                    })()}
                </div>
            </div>
            <div className={css(s.description)}>
                <span>Описание: </span>{task.description}
            </div>
            <div className={css(s.main)}>
                <div className={css(s.resultBox)}>
                    <div className={css(s.link)}>
                        <InputText change={setYoutubeHandler} modes={[`maxWidth`]}
                                   placeholder={`https://`}
                                   value={result?.youtube ?? ''}
                                   title={!!result ? `Ссылка на видео (видео выполненного вами комплекса)` : `загрузка...`}/>
                    </div>
                    <div className={css(s.result)}>
                        {!result && <div className={css(s.amount)}>
                            <InputText type={`number`}
                                       modes={[`maxWidth`, `center`]}
                                       value={""} title={`загрузка...`}
                                       placeholder={``}/>
                        </div>}
                        {!!result && (() => {
                            switch (Number(task?.taskTypeId)) {
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
                </div>
                <div className={css(s.btnBox)}>
                    {(() => {
                        switch (result?.status) {
                            case 'new':
                                return <Button text={`Отправить    →`} disable={!isChange}
                                               isLoading={isLoading}
                                               modes={[`red`, 'noRadius', `maxWidth`]} click={sendResultHandler}/>
                            case 'await':
                                return <Button text={`Изменить    →`} disable={!isChange}
                                               isLoading={isLoading}
                                               modes={[`red`, 'noRadius', `maxWidth`]} click={updateResultHandler}/>
                            case 'access':
                                return <Button text={`Изменить    →`} disable={!isChange}
                                               isLoading={isLoading}
                                               modes={[`red`, 'noRadius', `maxWidth`]} click={updateResultHandler}/>
                            case 'reject':
                                return <Button text={`Изменить    →`} disable={!isChange}
                                               isLoading={isLoading}
                                               modes={[`red`, 'noRadius', `maxWidth`]} click={updateResultHandler}/>
                            default:
                                return null
                        }
                    })()}
                </div>
            </div>
        </div>
    );
};
