import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Components/Todolist";
import {v1} from "uuid";


export  type FVT = 'All' | 'Active' | 'Completed';

function App() {
    let [tasks, setTask] = useState([
        {id: v1(), title: 'Rest', isDone: false},
        {id: v1(), title: 'Work', isDone: true},
        {id: v1(), title: 'Sex', isDone: false},
    ])

    const changeCheckboxStatus = (taskId: string, newIsDone: boolean) => {

       /* let currentTask = tasks.find(el => el.id === taskId);
        if (currentTask) {
            currentTask.isDone = newIsDone
            setTask([...tasks])
        }*/
        setTask( tasks.map(el=>el.id===taskId ? {...el, isDone:newIsDone } :el ))
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


    let [filter, setOne] = useState<FVT>('All')
    let FilterTask = tasks;
    if (filter === "Active") {
        FilterTask = tasks.filter(t => !t.isDone)
    }
    if (filter === "Completed") {
        FilterTask = tasks.filter(t => t.isDone)
    }

    function Sort(value: FVT) {
        setOne(value)
    }


    return (
        <div className="App">
            <Todolist title='My day'
                      tasks={FilterTask}
                      delTasks={delTasks}
                      Sort={Sort}
                      addTask={addTask}
                      changeCheckboxStatus={changeCheckboxStatus}
            />

        </div>
    );
}

export default App;
