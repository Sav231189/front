import s from 'view/module/tournament/tournamentTable/style.module.scss'
import {css} from "lib/customClassName";
import {TaskType} from "types/TaskType";
import {useSelector} from "react-redux";
import {getResultTableSelector} from "store/tournament/selector/getResultTable";
import {useEffect} from "react";
import {useThunks} from "lib/reduxHook";
import {tournamentThunk} from "store/tournament/thunk/tournamentThunk";
import loadGif from "view/assets/images/Load.gif";
import {getCurrentCategoryListSelector} from "store/tournament/selector/getCurrentCategoryList";

type PropsType = {
    paidMeCategoryId: number | null
}
export const TournamentTable = (props: PropsType) => {
    const {paidMeCategoryId} = props

    const tableResultTable = useSelector(getResultTableSelector)
    const currentCategoryList = useSelector(getCurrentCategoryListSelector)

    const {getResultTable} = useThunks(tournamentThunk)

    useEffect(() => {
        if (!!paidMeCategoryId) getResultTable(paidMeCategoryId)
        else if (!!currentCategoryList?.length) getResultTable(Number(currentCategoryList[0].id))
    }, [])

    return (
        <div className={css(s.TournamentTable)}>
            <div className={css(s.categoryFilter)}>

            </div>
            <TableHead taskList={tableResultTable?.taskList ?? []}/>
            {tableResultTable !== null && <div className={css(s.table)}>
                {tableResultTable.resultList && <div className={css(s.tableList)}>
                    {tableResultTable.resultList.map(member => <TableResultItem key={member.user.id} member={member}
                                                                                taskIdList={tableResultTable?.taskList?.map(task => Number(task.id))}/>)}
                </div>}
                {!tableResultTable.resultList && <div className={css(s.loadingList)}>
                    <img src={loadGif} alt="load"/>
                    <span>Загрузка...</span>
                </div>}
                {tableResultTable.resultList !== null && !tableResultTable.resultList.length &&
                    <div className={css(s.emptyList)}>Нет участников</div>}
            </div>}
            {tableResultTable === null && <div className={css(s.loadingList)}>
                <img src={loadGif} alt="load"/>
                <span>Загрузка...</span>
            </div>}
        </div>
    );
};

type TableHeadPropsType = {
    taskList: Array<TaskType>
}
const TableHead = (props: TableHeadPropsType) => {
    const {taskList} = props

    return (
        <div className={css(s.TableHead)}>
            <div className={css(s.name)}>Участник</div>
            <div className={css(s.top)}>Место</div>
            {taskList.map(task => <div key={task.id}>
                {task.name}
            </div>)}
        </div>
    );
};

const getResultString = (typeId: number, resultValue: string) => {
    switch (typeId) {
        case 1: {
            const value = parseInt(resultValue)
            if (value === 0) return `-`
            return `${(value - value % 60) / 60} : ${(value % 60) < 10 ? '0':''}${value % 60} (время)`

        }
        case 2: {
            const value = parseInt(resultValue)
            if (value === 0) return `-`
            return `${(value - value % 60) / 60} : ${(value % 60) < 10 ? '0':''}${value % 60} (время)`
        }
        case 3: {
            if (parseInt(resultValue) === 0) return `-`
            return `${resultValue} (кол-во)`
        }
        case 4: {
            const value = parseInt(resultValue)
            if (value === 0) return `-`
            const gram = (value % 100) > 9 ? (value % 100) > 100 ? `${value % 100}`: `0${value % 100}` : `00${value % 100}`
            return `${(value - value % 1000) / 1000} . ${gram} (кг)`
        }
        case 5: {
            const value = parseInt(resultValue)
            if (value === 0) return `-`
            const SM = (value % 100) >= 10 ? `${value % 100}` : `0${value % 100}`
            return `${(value - value % 100) / 100} . ${SM} (метры)`
        }
    }
}

type TableResultItemPropsType = {
    member: any
    taskIdList: Array<number>
}
const TableResultItem = (props: TableResultItemPropsType) => {
    const {member, taskIdList} = props

    return (
        <div className={css(s.TableResultItem)}>
            <div>{member.user.id}</div>
            <div className={css(s.top)}>{member.top === 0 ?  `-` : member.top}</div>
            {taskIdList.map(taskId => <div key={taskId}>
                {/*{console.log(member.resultMapList[taskId])}*/}
                {/*балы: {member.resultMapList[taskId].point} | */}
                {getResultString(Number(member.resultMapList[taskId].taskTypeId), member.resultMapList[taskId].value)}
            </div>)}
        </div>
    );
};
