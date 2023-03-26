import React, {ChangeEvent, /*KeyboardEvent,*/ useState} from 'react';

import {FVT} from "../AppWithRedux";
import styles from './Todolist.module.css'
import {UnInput} from "./UnInput/UnInput";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";


export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksStateType = {
    [key: string]: Array<TaskPropsType>
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
                {/* <button className={styles.DellList} onClick={DelListClickHandler}>Dell</button>*/}
                <IconButton aria-label="delete" onClick={DelListClickHandler}
                            style={{color: 'red', backgroundColor: 'orange'}}>
                    <Delete/>
                </IconButton>

            </h3>

            <UnInput callBack={addTaskHandler}/>

            <ul>
                {
                    props.tasks.map(t => {

                        return <li className={t.isDone ? styles.isDone : ''} key={t.id}>
                            {/*<input type="checkbox" checked={t.isDone}*/}
                            <Checkbox
                                onChange={(event: ChangeEvent<HTMLInputElement>) => changeCheckboxHandler(t.id, event.currentTarget.checked)}
                                checked={t.isDone} defaultChecked/>


                            <EditableSpan title={t.title}
                                          callBack={(currentTitle) => ChangeTaskHandler(t.id, currentTitle)}/>

                            {/* <button onClick={() => onDelClickHandler(t.id)}>X</button>*/}
                            <IconButton aria-label="delete" onClick={() => onDelClickHandler(t.id)}>
                                <Delete/>
                            </IconButton>

                        </li>
                    })
                }

            </ul>
            <div>
                <Button variant={color === "All" ? "outlined" : "contained"} color="success" onClick={OnAllClickHandler}
                        style={{
                            maxWidth: "60px",
                            maxHeight: "30px",
                            minWidth: "60px",
                            minHeight: "30px",
                            marginRight: "2px"
                        }}> All </Button>
                <Button variant={color === "Active" ? "outlined" : "contained"} color="error"
                        onClick={OnActiveClickHandler} style={{
                    maxWidth: "80px",
                    maxHeight: "30px",
                    minWidth: "80px",
                    minHeight: "30px",
                    marginRight: "2px"
                }}> Active </Button>
                <Button variant={color === "Completed" ? "outlined" : "contained"} color="secondary"
                        onClick={OnCompletedClickHandler} style={{
                    maxWidth: "115px",
                    maxHeight: "30px",
                    minWidth: "115px",
                    minHeight: "30px"
                }}> Completed </Button>

                {/*<button className={color === "All" ? styles.activeFilter : ''} onClick={OnAllClickHandler}>All
                </button>

                <button className={color === "Active" ? styles.activeFilter : ''} onClick={OnActiveClickHandler}>Active
                </button>

                <button className={color === "Completed" ? styles.activeFilter : ''}
                        onClick={OnCompletedClickHandler}>Completed
                </button>*/}

            </div>
        </div>
    );
}


