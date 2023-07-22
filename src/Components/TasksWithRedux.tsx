import React, {ChangeEvent, memo, useCallback} from 'react';
import styles from "./Todolist.module.css";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskGetType, taskStatuses} from "./tasksApi/tasksApi";
import {useAppDispatch} from "./state/store";
import {deleteTaskTC, updateTaskTC} from "./Reducers/tasks-reducer";

export type TasksPropsType = {
    task: TaskGetType
    todolistId: string
}

export const TasksWithRedux = memo(({task, todolistId}: TasksPropsType) => {
    const dispatch = useAppDispatch()
    function changeCheckboxHandler(event: ChangeEvent<HTMLInputElement>) {
        // Get the value of the checkbox
        let isChecked = event.currentTarget.checked;
        // Set the new task status
        let newTaskStatus = isChecked ? taskStatuses.Completed : taskStatuses.New;
        // Update the task
        dispatch(updateTaskTC(task.id, {status: newTaskStatus}, todolistId))
    }


    const ChangeTaskHandler = useCallback((currentTitle: string) => {
        dispatch(updateTaskTC(task.id, {title: currentTitle}, todolistId))
    }, [dispatch, task.id, todolistId])

    const onDelClickHandler = () => dispatch(deleteTaskTC(todolistId, task.id))

    return <li className={task.status === taskStatuses.Completed ? styles.isDone : ''}>
        {/*<input type="checkbox" checked={t.isDone}*/}
        <Checkbox
            onChange={changeCheckboxHandler}
            checked={task.status === taskStatuses.Completed}/>

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
    changeCheckboxStatus: (taskId: string, status: taskStatuses) => void
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

