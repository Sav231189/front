import s from 'view/module/tournament/tournamentTable/style.module.scss'
import {css} from "lib/customClassName";
import {TaskType} from "types/TaskType";
import {useSelector} from "react-redux";
import {getResultTableSelector} from "store/tournament/selector/getResultTable";
import {useEffect} from "react";
import {useThunks} from "lib/reduxHook";
import {tournamentThunk} from "store/tournament/thunk/tournamentThunk";

export const TournamentTable = () => {

    const tableResultTable = useSelector(getResultTableSelector)

    const {getResultTable} = useThunks(tournamentThunk)

    useEffect(() => {
        getResultTable(6)
    }, [])

    return (
        <div className={css(s.TournamentTable)}>
            <div className={css(s.categoryFilter)}>

            </div>
            {tableResultTable && <div className={css(s.table)}>
                <TableHead taskList={tableResultTable.taskList}/>
                {tableResultTable.resultList && <div className={css(s.tableList)}>
                    {tableResultTable.resultList.map(member => <TableResultItem member={member} taskIdList={tableResultTable?.taskList?.map(task=>Number(task.id))}/>)}
                </div>}
                {!tableResultTable.resultList && <div>load...</div>}
            </div>}
            {!tableResultTable && <div>load...</div>}
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
            <div className={css(s.points)}>Балы</div>
            {taskList.map(task => <div key={task.id}>
                {task.name}
            </div>)}
        </div>
    );
};


type TableResultItemPropsType = {
    member: any
    taskIdList: Array<number>
}
const TableResultItem = (props: TableResultItemPropsType) => {
    const {member, taskIdList} = props

    return (
        <div className={css(s.TableResultItem)}>
            <div>{member.user.id}</div>
            <div>{member.allPoint}</div>
            {taskIdList.map(taskId => <div>
                {member.resultMapList[taskId].point}
                /
                {member.resultMapList[taskId].typedValue}
            </div>)}
        </div>
    );
};
