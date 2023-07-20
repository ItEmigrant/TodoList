import React, {memo, useCallback, useEffect, useState} from 'react';
import {AddItemForm} from "./UnInput/AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {TasksWithRedux} from "./TasksWithRedux";
import {getTaskThunkCreator} from "./Reducers/tasks-reducer";
import {useAppDispatch} from "./state/store";
import {TaskGetType, taskStatuses} from "./tasksApi/tasksApi";
import {FVT} from "./Reducers/todolist-reducer";


/*export type TaskPropsType = {
    id: string
    title: string
    isDone?: boolean
}*/

export type TasksStateType = {
    [key: string]: Array<TaskGetType>
}

type TitlePropsType = {
    dellList: (todolistID: string) => void
    todolistID: string
    title: string
    tasks: Array<TaskGetType>
    Sort: (todolistID: string, filterValue: FVT) => void
    addTask: (todolistID: string, title: string) => void
    changeCheckboxStatus: (todolistID: string, taskId: string, status: taskStatuses) => void
    ChangeTitle: (todolistID: string, currentTitle: string) => void
    filter: FVT
}

export const Todolist = memo((props: TitlePropsType) => {

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getTaskThunkCreator(props.todolistID))
    }, [])

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


    if (props.filter === "Active") {
        tasks = tasks.filter(t => t.status === taskStatuses.New) //
    }
    if (props.filter === "Completed") {
        tasks = tasks.filter(t => t.status === taskStatuses.Completed)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} callBack={addTitleHandler}/>
                <IconButton aria-label="delete" onClick={DelListClickHandler}
                            style={{color: 'red', backgroundColor: 'orange'}}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm callBack={addTaskHandler}/>
            <ul>
                {
                    tasks.map(t => {

                        return <TasksWithRedux
                            key={t.id}
                            task={t}
                            todolistId={props.todolistID}
                        />
                    })
                }
            </ul>
            <div>
                <ButtonWithMemo ButtonTitle={'All'} color={"success"} onClick={OnAllClickHandler}
                                variant={color === "All" ? "outlined" : "contained"} style={{
                    maxWidth: "60px",
                    maxHeight: "30px",
                    minWidth: "60px",
                    minHeight: "30px",
                    marginRight: "2px"
                }}/>
                <ButtonWithMemo ButtonTitle={'Active'} color={"error"} onClick={OnActiveClickHandler}
                                variant={color === "Active" ? "outlined" : "contained"}
                                style={{
                                    maxWidth: "80px",
                                    maxHeight: "30px",
                                    minWidth: "80px",
                                    minHeight: "30px",
                                    marginRight: "2px"
                                }}/>

                <ButtonWithMemo ButtonTitle={'Completed'} color={'secondary'} onClick={OnCompletedClickHandler}
                                variant={color === "Completed" ? "outlined" : "contained"}
                                style={{
                                    maxWidth: "115px",
                                    maxHeight: "30px",
                                    minWidth: "115px",
                                    minHeight: "30px"
                                }}/>

            </div>
        </div>
    );
})

type styleType = {
    maxWidth: string
    maxHeight: string
    minWidth: string
    minHeight: string
    marginRight?: string
}
type ButtonPropsType = {
    ButtonTitle: string
    color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
    onClick: () => void
    variant: 'text' | 'outlined' | 'contained'
    style: styleType

}

const ButtonWithMemo = memo((props: ButtonPropsType) => {
    return <Button variant={props.variant} color={props.color} onClick={props.onClick}
                   style={props.style}> {props.ButtonTitle} </Button>
})


