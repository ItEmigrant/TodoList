import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

// CLI
// GUI => CRUD
export type FilterValueStyle = "All" | "Active" | "Completed";


function App() {
    //BLL:

    const todoListTitle: string = "What to learn today"


    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS&TS", isDone: true},
        {id: 3, title: "REACT", isDone: false},
    ]);

    const [filter, setFilter] = useState<FilterValueStyle>("All")


    const removeTask = (taskId: number) => {
        setTasks(tasks.filter(t => t.id !== taskId)) //work asynchronous
    }

    const changeFilter = (filter: FilterValueStyle) => {
        setFilter(filter)
    }

    const getTasksForTodoList = () => {
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
            />

        </div>
    );
}

export default App;
