import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TasksStateType, Todolist} from "./Components/Todolist";

import {AddItemForm} from "./Components/UnInput/AddItemForm";
import ButtonAppBar from "./Components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    getTodoListsThunk,
    removeTodolistAC
} from "./Components/Reducers/todolist-reducer";
import {
    addTasksAC,
    changeTasksStatusAC,
    changeTasksTitleAC,
    removeTasksAC,
    RemoveTodolistAC
} from "./Components/Reducers/tasks-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./Components/state/store";


export type FVT = 'All' | 'Active' | 'Completed';

export type TodolistType = {
    id: string
    filter: FVT
    title: string
}

function AppWithRedux() {

    let todolist = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todoLists)

    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(getTodoListsThunk)
    }, [])


    const Sort = useCallback((todolistID: string, filterValue: FVT) => {
        dispatch(changeFilterAC(filterValue, todolistID))
    }, [dispatch])

    const changeCheckboxStatus = useCallback((todolistID: string, taskId: string, newIsDone: boolean) => {
        dispatch(changeTasksStatusAC(taskId, newIsDone, todolistID))
    }, [dispatch])

    const addTask = useCallback((todolistID: string, title: string) => {
        dispatch(addTasksAC(title, todolistID))
    }, [dispatch])

    const delTasks = useCallback((todolistID: string, taskId: string) => {
        let action = removeTasksAC(taskId, todolistID)
        dispatch(action)
    }, [dispatch])

    const dellList = useCallback((todolistID: string) => {
        dispatch(removeTodolistAC(todolistID))
        dispatch(RemoveTodolistAC(todolistID))
    }, [dispatch])

    const todoListAdd = useCallback((title: string) => {
        let action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch])

    const ChangeTask = useCallback((todolistID: string, taskId: string, currentTitle: string) => {
        dispatch(changeTasksTitleAC(taskId, currentTitle, todolistID))
    }, [dispatch])


    const ChangeTitle = useCallback((todolistID: string, currentTitle: string) => {
        dispatch(changeTodolistTitleAC(currentTitle, todolistID))
    }, [dispatch])

    return (
        <div className="App">
            <ButtonAppBar/>

            <Container fixed>

                <Grid container style={{padding: '20px'}}>
                    <AddItemForm callBack={todoListAdd}/>
                </Grid>

                <Grid container spacing={2}>
                    {
                        todolist.map(el => {
                            let FilterTask = tasks[el.id];

                            return <Grid item key={el.id}>
                                <Paper elevation={3} style={{padding: "10px", backgroundColor: "#fbcbfb"}}>
                                    <Todolist title={el.title}
                                              tasks={FilterTask}
                                              delTasks={delTasks}
                                              Sort={Sort}
                                              dellList={dellList}
                                              addTask={addTask}
                                              changeCheckboxStatus={changeCheckboxStatus}
                                              todolistID={el.id}
                                              filter={el.filter}
                                              ChangeTask={ChangeTask}
                                              ChangeTitle={ChangeTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithRedux;


/*function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolist, setTodolist] = useState<Array<TodolistType>>([
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'},
    ])

    let [tasks, setTask] = useState <TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'Rest', isDone: false},
            {id: v1(), title: 'Work', isDone: true},
            {id: v1(), title: 'Sex', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest Hard', isDone: false},
            {id: v1(), title: 'Work', isDone: true},
            {id: v1(), title: 'Eat', isDone: false},
        ]
    });

    function Sort(todolistID: string, filterValue: FVT) {
        setTodolist(todolist.map(el => el.id === todolistID ? {...el, filter: filterValue} : el))
    }

    const changeCheckboxStatus = (todolistID: string, taskId: string, newIsDone: boolean) => {

        setTask({
            ...tasks,
            [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, isDone: newIsDone} : el)
        })
    }

    function addTask(todolistID: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTask({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
        /!* let newTask = [task, ...tasks];
         setTask(newTask);*!/


    }

    function delTasks(todolistID: string, taskId: string) {

        //let FilteredTasks = tasks.filter(t => t.id != id);
        setTask({...tasks, [todolistID]: tasks[todolistID].filter(fl => fl.id !== taskId)})
    }

    function dellList(todolistID: string) {
        delete tasks[todolistID];
        setTodolist(todolist.filter(el => el.id !== todolistID))
    }

    function todoListAdd(title: string) {
        const newTodolistID = v1()
        let newTodolist: TodolistType = {id: newTodolistID, title: title, filter: 'All'};
        setTodolist([newTodolist, ...todolist])
        setTask({...tasks, [newTodolistID]: []})
    }

    function ChangeTask(todolistID: string, taskId: string, currentTitle: string) {
        setTask({
            ...tasks,
            [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, title: currentTitle} : el)
        })
    }

    function ChangeTitle(todolistID: string, currentTitle: string) {
        setTodolist(todolist.map(el => el.id === todolistID ? {...el, title: currentTitle} : el))
    }

    return (
        <div className="App">
            <ButtonAppBar/>

            <Container fixed>

                <Grid container style={{padding: '20px'}}>
                    <AddItemForm callBack={todoListAdd}/>
                </Grid>

                <Grid container spacing={2}>
                    {
                        todolist.map(el => {
                            let FilterTask = tasks[el.id];

                            if (el.filter === "Active") {
                                FilterTask = tasks[el.id].filter(t => !t.isDone)
                            }
                            if (el.filter === "Completed") {
                                FilterTask = tasks[el.id].filter(t => t.isDone)
                            }
                            return <Grid item key={el.id}>
                                <Paper elevation={3} style={{padding: "10px", backgroundColor: "#fbcbfb"}}>
                                    <Todolist title={el.title}
                                              tasks={FilterTask}
                                              delTasks={delTasks}
                                              Sort={Sort}
                                              dellList={dellList}
                                              addTask={addTask} changeCheckboxStatus={changeCheckboxStatus}
                                              todolistID={el.id}

                                              ChangeTask={ChangeTask}
                                              ChangeTitle={ChangeTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>


            </Container>

        </div>
    );
}*/

/*function AppWithReducer() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolist, dispatchToTodolist] = useReducer<Reducer<Array<TodolistType>, TodolistReducerActionType>>(todolistReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'},
    ])

    let [tasks, dispatchToTask] = useReducer<Reducer<TasksStateType, TaskToActionType>>(taskReducer, {
        [todolistID1]: [
            {id: v1(), title: 'Rest', isDone: false},
            {id: v1(), title: 'Work', isDone: true},
            {id: v1(), title: 'Sex', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest Hard', isDone: false},
            {id: v1(), title: 'Work', isDone: true},
            {id: v1(), title: 'Eat', isDone: false},
        ]
    });

    function Sort(todolistID: string, filterValue: FVT) {
        dispatchToTodolist(changeFilterAC(filterValue, todolistID))

    }

    const changeCheckboxStatus = (todolistID: string, taskId: string, newIsDone: boolean) => {
        dispatchToTask(changeTasksStatusAC(taskId, newIsDone, todolistID))
    }

    function addTask(todolistID: string, title: string) {
        dispatchToTask(addTasksAC(title, todolistID))
    }

    function delTasks(todolistID: string, taskId: string) {
        let action = removeTasksAC(taskId, todolistID)
        dispatchToTask(action)
    }

    function dellList(todolistID: string) {
        dispatchToTodolist(removeTodolistAC(todolistID))
        dispatchToTask(RemoveTodolistAC(todolistID))
    }

    function todoListAdd(title: string) {
        let action = addTodolistAC(title)
        dispatchToTodolist(action)
        dispatchToTask(action)

    }

    function ChangeTask(todolistID: string, taskId: string, currentTitle: string) {
        dispatchToTask(changeTasksTitleAC(taskId, currentTitle, todolistID))
    }


    function ChangeTitle(todolistID: string, currentTitle: string) {

        dispatchToTodolist(changeTodolistTitleAC(currentTitle, todolistID))
    }

    return (
        <div className="App">
            <ButtonAppBar/>

            <Container fixed>

                <Grid container style={{padding: '20px'}}>
                    <AddItemForm callBack={todoListAdd}/>
                </Grid>

                <Grid container spacing={2}>
                    {
                        todolist.map(el => {
                            let FilterTask = tasks[el.id];

                            if (el.filter === "Active") {
                                FilterTask = tasks[el.id].filter(t => !t.isDone)
                            }
                            if (el.filter === "Completed") {
                                FilterTask = tasks[el.id].filter(t => t.isDone)
                            }
                            return <Grid item key={el.id}>
                                <Paper elevation={3} style={{padding: "10px", backgroundColor: "#fbcbfb"}}>
                                    <Todolist title={el.title}
                                              tasks={FilterTask}
                                              delTasks={delTasks}
                                              Sort={Sort}
                                              dellList={dellList}
                                              addTask={addTask} changeCheckboxStatus={changeCheckboxStatus}
                                              todolistID={el.id}

                                              ChangeTask={ChangeTask}
                                              ChangeTitle={ChangeTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    )
}*/


