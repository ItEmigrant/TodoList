import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

// CLI
// GUI => CRUD
export type FilterValueStyle = "All" | "Active" | "Completed";


function App() {
    //BLL:

    const todoListTitle: string = "What to learn today"
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS&TS", isDone: true},
        {id: v1(), title: "REACT", isDone: false},

    ]);

    const addTask = (inputValue:string) => {
        const newTasks = {id: v1(), title: inputValue, isDone:false}
        setTasks([newTasks, ...tasks])
    }

    const [filter, setFilter] = useState<FilterValueStyle>("All")


    const removeTask = (taskId: string) => {

        setTasks(tasks.filter(t => t.id !== taskId)) //work asynchronous
    }

    const changeFilter = (filter: FilterValueStyle) => {
        setFilter(filter)
    }

    let getTasksForTodoList = () => {
        switch (filter) {
            case "Active":
                return tasks.filter(t => !t.isDone)
            case "Completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }


    //UI:
    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={getTasksForTodoList()}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}

            />

        </div>
    );
}

export default App;
