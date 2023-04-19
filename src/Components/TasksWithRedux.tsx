import React, {ChangeEvent, memo, useCallback} from 'react';
import styles from "./Todolist.module.css";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskPropsType} from "./Todolist";
import {useDispatch} from "react-redux";
import {changeTasksStatusAC, changeTasksTitleAC, removeTasksAC} from "./Reducers/tasks-reducer";

export type TasksPropsType = {
    task: TaskPropsType
    todolistId: string
}

export const TasksWithRedux = memo(({task, todolistId}: TasksPropsType) => {


    const dispatch = useDispatch()

    function changeCheckboxHandler(event: ChangeEvent<HTMLInputElement>) {
        let newIsDoneValue = event.currentTarget.checked;
        dispatch(changeTasksStatusAC(task.id, newIsDoneValue, todolistId))
    }

    const ChangeTaskHandler = useCallback((currentTitle: string) => {
        dispatch(changeTasksTitleAC(task.id, currentTitle, todolistId))
    }, [dispatch, task.id, todolistId])

    const onDelClickHandler = () => dispatch(removeTasksAC(task.id, todolistId))

    return <li className={task.isDone ? styles.isDone : ''}>
        {/*<input type="checkbox" checked={t.isDone}*/}
        <Checkbox
            onChange={changeCheckboxHandler}
            checked={task.isDone}/>

        <EditableSpan title={task.title} callBack={ChangeTaskHandler}/>

        {/* <button onClick={() => onDelClickHandler(t.id)}>X</button>*/}
        <IconButton aria-label="delete" onClick={onDelClickHandler}>
            <Delete/>
        </IconButton>

    </li>

});


/*
export type TasksPropsType = {
    task: TaskPropsType
    changeCheckboxStatus: (taskId: string, newIsDone: boolean) => void
    ChangeTaskTitle: (taskId: string, currentTitle: string) => void
    delTasks: (taskId: string) => void
}

export const Tasks = memo((props: TasksPropsType) => {

    function changeCheckboxHandler(tID: string, eventValue: boolean) {
        props.changeCheckboxStatus(tID, eventValue)
    }

    const ChangeTaskHandler = useCallback((currentTitle: string) => {
        props.ChangeTaskTitle(props.task.id, currentTitle)
    },[props.ChangeTaskTitle, props.task.id])

    const onDelClickHandler = (t: string) => {
        props.delTasks(t)
    }

    return <li className={props.task.isDone ? styles.isDone : ''}>
        {/!*<input type="checkbox" checked={t.isDone}*!/}
        <Checkbox
            onChange={(event: ChangeEvent<HTMLInputElement>) => changeCheckboxHandler(props.task.id, event.currentTarget.checked)}
            checked={props.task.isDone}/>

        <EditableSpan title={props.task.title} callBack={ChangeTaskHandler}/>

        {/!* <button onClick={() => onDelClickHandler(t.id)}>X</button>*!/}
        <IconButton aria-label="delete" onClick={() => onDelClickHandler(props.task.id)}>
            <Delete/>
        </IconButton>

    </li>

});
*/

