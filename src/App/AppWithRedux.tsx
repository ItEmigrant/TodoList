import React from 'react';
import './App.css';
import ButtonAppBar from "../Components/ButtonAppBar";
import {Container, LinearProgress} from "@mui/material";
import TodolistLists from "../Components/Todolists/TodolistLists/TodolistLists";
import {useAppSelector} from "./state/store";
import {RequestStatusType} from "../BLL/Reducers/app-reducer";
import {ErrorSnackbar} from "../Components/ErrorsSnackbar/ErrorSnackbar";
import {Login} from "../features/Login/Login";
import {Route, Routes} from "react-router-dom";


function AppWithRedux() {

    const statusProgress = useAppSelector<RequestStatusType>(state => state.app.status)
    return (
        <div className="App">
            <ButtonAppBar/>
            {statusProgress === 'loading' && <LinearProgress color={'secondary'}/>}
            <Container fixed>

            </Container>
            <ErrorSnackbar/>
            <Routes>
                <Route path={'/'} element={ <TodolistLists/>}/>
                <Route path={'login'} element={<Login/>}/>
            </Routes>

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


