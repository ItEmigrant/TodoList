import React, {ChangeEvent, /*KeyboardEvent,*/ useState} from 'react';

import {FVT} from "../App";
import styles from './Todolist.module.css'
import {UnInput} from "./UnInput/UnInput";
import {EditableSpan} from "./EditableSpan";

type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}

type TitlePropsType = {
    dellList: (todolistID: string) => void
    todolistID: string
    title: string
    tasks: Array<TaskPropsType>
    delTasks: (taskId: string, todolistID: string) => void
    Sort: (todolistID: string, filterValue: FVT) => void
    addTask: (todolistID: string, title: string) => void
    changeCheckboxStatus: (todolistID: string, taskId: string, newIsDone: boolean) => void
    ChangeTask: (todolistID: string, taskId: string, currentTitle: string) => void
    ChangeTitle: (todolistID: string, currentTitle: string) => void


}
export const Todolist = (props: TitlePropsType) => {


    const [color, setColor] = useState<FVT>('All')

    function OnAllClickHandler() {
        {
            props.Sort(props.todolistID, 'All')
            setColor('All')
        }
    }

    function OnActiveClickHandler() {
        {
            props.Sort(props.todolistID, 'Active')
            setColor('Active')
        }
    }

    function OnCompletedClickHandler() {
        {
            props.Sort(props.todolistID, 'Completed')
            setColor('Completed')
        }
    }

    const onDelClickHandler = (t: string) => {
        props.delTasks(props.todolistID, t)
    }

    function changeCheckboxHandler(tID: string, eventValue: boolean) {
        props.changeCheckboxStatus(props.todolistID, tID, eventValue)


    }

    function DelListClickHandler() {
        props.dellList(props.todolistID)
    }

    function addTaskHandler(title: string) {
        props.addTask(props.todolistID, title)
    }

    function addTitleHandler(currentTitle: string) {
        props.ChangeTitle(props.todolistID, currentTitle)
    }

    function ChangeTaskHandler(tID: string, currentTitle: string) {
        props.ChangeTask(props.todolistID, tID, currentTitle)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} callBack={addTitleHandler}/>
                <button className={styles.DellList} onClick={DelListClickHandler}>Dell</button>
            </h3>

            <UnInput callBack={addTaskHandler}/>

            <ul>
                {
                    props.tasks.map(t => {

                        return <li className={t.isDone ? styles.isDone : ''} key={t.id}>
                            <input type="checkbox" checked={t.isDone}
                                   onChange={(event: ChangeEvent<HTMLInputElement>) => changeCheckboxHandler(t.id, event.currentTarget.checked)}/>

                            <EditableSpan title={t.title} callBack={(currentTitle) => ChangeTaskHandler(t.id, currentTitle )}/>

                            <button onClick={() => onDelClickHandler(t.id)}>X</button>
                        </li>
                    })
                }

            </ul>
            <div>
                <button className={color === "All" ? styles.activeFilter : ''} onClick={OnAllClickHandler}>All
                </button>
                <button className={color === "Active" ? styles.activeFilter : ''} onClick={OnActiveClickHandler}>Active
                </button>
                <button className={color === "Completed" ? styles.activeFilter : ''}
                        onClick={OnCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
}


