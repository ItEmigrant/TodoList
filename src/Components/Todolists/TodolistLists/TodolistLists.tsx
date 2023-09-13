import React, {useCallback, useEffect} from 'react';
import {Grid, Paper} from "@mui/material";
import {TasksStateType, Todolist} from "./Todolist/Todolist";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch, useAppSelector} from "../../../App/state/store";
import {
    changeFilterAC, changeTodolistTitleTC, createTodolistTC,
    deleteTodolistTC,
    FVT,
    getTodoListsThunkCreator,
    TodoListDomainType
} from "../../../BLL/Reducers/todolist-reducer";
import {createTaskTC} from "../../../BLL/Reducers/tasks-reducer";
import {AddItemForm} from "../../UnInput/AddItemForm";
import {Navigate} from "react-router-dom";

const TodolistLists: React.FC = () => {

    let todolist = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todoLists)

    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)


    useEffect(() => {
        if(!isLoggedIn) return;
        dispatch(getTodoListsThunkCreator())
    }, [])

    const Sort = useCallback((todolistID: string, filterValue: FVT) => {
        dispatch(changeFilterAC(filterValue, todolistID))
    }, [dispatch])

    const addTask = useCallback((todolistID: string, title: string) => {
        dispatch(createTaskTC(todolistID, title))
    }, [dispatch])

    const dellList = useCallback((todolistID: string) => {
        dispatch(deleteTodolistTC(todolistID))
    }, [dispatch])

    const todoListAdd = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [dispatch])

    const ChangeTitle = useCallback((todolistID: string, currentTitle: string) => {
        dispatch(changeTodolistTitleTC(todolistID, currentTitle))
    }, [dispatch])

    if(!isLoggedIn) return <Navigate to={'/login'}/>

    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm callBack={todoListAdd}/>
        </Grid>
        <Grid container spacing={2}>
            {
                todolist.map(el => {
                    let FilterTask = tasks[el.id];
                    return <Grid item key={el.id}>
                        <Paper elevation={3} style={{padding: "10px", backgroundColor: "#fbcbfb"}}>
                            <Todolist
                                entityStatus={el.entityStatus}
                                title={el.title}
                                tasks={FilterTask}
                                Sort={Sort}
                                dellList={dellList}
                                addTask={addTask}
                                todolistID={el.id}
                                filter={el.filter}
                                ChangeTitle={ChangeTitle}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
};

export default TodolistLists;