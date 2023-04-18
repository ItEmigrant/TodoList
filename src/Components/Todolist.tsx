import React, {memo, useCallback, /*KeyboardEvent,*/ useState} from 'react';
import {FVT} from "../AppWithRedux";
import {UnInput} from "./UnInput/UnInput";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Tasks} from "./Tasks";


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
    filter: FVT
}

export const Todolist = memo((props: TitlePropsType) => {

    let tasks = props.tasks
    const [color, setColor] = useState<FVT>('All')

    const OnAllClickHandler = useCallback(() => {
        props.Sort(props.todolistID, 'All')
        setColor('All')
    }, [props.Sort, props.todolistID])

    const OnActiveClickHandler = useCallback(() => {
        props.Sort(props.todolistID, 'Active')
        setColor('Active')
    }, [props.Sort, props.todolistID])

    const OnCompletedClickHandler = useCallback(() => {
        props.Sort(props.todolistID, 'Completed')
        setColor('Completed')
    }, [props.Sort, props.todolistID])

    function DelListClickHandler() {
        props.dellList(props.todolistID)
    }

    const addTaskHandler = useCallback((title: string) => {
        props.addTask(props.todolistID, title)
    }, [props.addTask, props.todolistID])

    const addTitleHandler = useCallback((currentTitle: string) => {
        props.ChangeTitle(props.todolistID, currentTitle)
    }, [props.ChangeTitle, props.todolistID])

    const ChangeTaskTitle = useCallback((taskId: string, currentTitle: string) => {
        props.ChangeTask(props.todolistID, taskId, currentTitle)
    }, [props.ChangeTask, props.todolistID])

    const delTasks = useCallback((taskId: string) => {
        props.delTasks(props.todolistID, taskId)
    }, [props.delTasks, props.todolistID])

    const changeCheckboxStatus = useCallback((taskId: string, newIsDone: boolean) => {
        props.changeCheckboxStatus(props.todolistID, taskId, newIsDone)
    }, [props.changeCheckboxStatus, props.todolistID])

    if (props.filter === "Active") {
        tasks = tasks.filter(t => !t.isDone)
    }
    if (props.filter === "Completed") {
        tasks = tasks.filter(t => t.isDone)
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
                    tasks.map(t => {
                        return <Tasks
                            key={t.id}
                            task={t}
                            changeCheckboxStatus={changeCheckboxStatus}
                            ChangeTaskTitle={ChangeTaskTitle}
                            delTasks={delTasks}/>
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
})



