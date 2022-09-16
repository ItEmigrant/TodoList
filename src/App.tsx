import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Components/Todolist";
import {v1} from "uuid";

export type FVT = 'All' | 'Active' | 'Completed';
type TodolistType = {
    id: string
    title: string
    filter: FVT

}

function App() {

    let [todolist, setTodolist] = useState<Array<TodolistType>>([
        {id: v1(), title: 'What to learn', filter: 'All'},
        {id: v1(), title: 'What to buy', filter: 'All'},
    ])

    let [tasks, setTask] = useState([
        {id: v1(), title: 'Rest', isDone: false},
        {id: v1(), title: 'Work', isDone: true},
        {id: v1(), title: 'Sex', isDone: false},
    ])

    //let [filter, setOne] = useState<FVT>('All')


    function Sort(todolistID: string, filterValue: FVT) {
        setTodolist(todolist.map(el => el.id === todolistID ? {...el, filter: filterValue} : el))
    }

    const changeCheckboxStatus = (taskId: string, newIsDone: boolean) => {

        /* let currentTask = tasks.find(el => el.id === taskId);
         if (currentTask) {
             currentTask.isDone = newIsDone
             setTask([...tasks])
         }*/
        setTask(tasks.map(el => el.id === taskId ? {...el, isDone: newIsDone} : el))
    }

    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: false};
        let newTask = [task, ...tasks];
        setTask(newTask);
    }

    function delTasks(id: string) {
        let FilteredTasks = tasks.filter(t => t.id != id);
        setTask(FilteredTasks);
    }


    return (
        <div className="App">

            {todolist.map(el => {
                let FilterTask = tasks;

                if (el.filter === "Active") {
                    FilterTask = tasks.filter(t => !t.isDone)
                }
                if (el.filter === "Completed") {
                    FilterTask = tasks.filter(t => t.isDone)
                }
                return (
                    <Todolist title={el.title}
                              tasks={FilterTask}
                              delTasks={delTasks}
                              Sort={Sort}
                              addTask={addTask}
                              changeCheckboxStatus={changeCheckboxStatus}
                              todolistID={el.id}
                              key={el.id}

                    />
                )
            })}

        </div>
    );
}

export default App;
