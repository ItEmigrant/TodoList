import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Components/Todolist";
import {v1} from "uuid";
import {UnInput} from "./Components/UnInput/UnInput";

export type FVT = 'All' | 'Active' | 'Completed';
type TodolistType = {
    id: string
    title: string
    filter: FVT

}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolist, setTodolist] = useState<Array<TodolistType>>([
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'},
    ])

    let [tasks, setTask] = useState({
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
        /* let newTask = [task, ...tasks];
         setTask(newTask);*/


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

    function ChangeTask (todolistID: string, taskId: string, currentTitle:string ) {
        setTask({...tasks, [todolistID] : tasks[todolistID].map(el=> el.id===taskId ? {...el, title:currentTitle } :el)})
    }

    function ChangeTitle (todolistID: string, currentTitle:string ) {
        setTodolist(todolist.map(el=> el.id=== todolistID?  {...el, title:currentTitle} :el))
    }

    return (
        <div className="App">
            <UnInput callBack={todoListAdd}/>
            {todolist.map(el => {
                let FilterTask = tasks[el.id];

                if (el.filter === "Active") {
                    FilterTask = tasks[el.id].filter(t => !t.isDone)
                }
                if (el.filter === "Completed") {
                    FilterTask = tasks[el.id].filter(t => t.isDone)
                }
                return (

                    <Todolist title={el.title}
                              tasks={FilterTask}
                              delTasks={delTasks}
                              Sort={Sort}
                              dellList={dellList}
                              addTask={addTask}
                              changeCheckboxStatus={changeCheckboxStatus}
                              todolistID={el.id}
                              key={el.id}
                              ChangeTask={ChangeTask}
                              ChangeTitle={ChangeTitle}


                    />
                )
            })}

        </div>
    );
}

export default App;
