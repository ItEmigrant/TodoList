import React from 'react';
import {FilterValueStyle} from "./App";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: number) => void
    changeFilter: (filter: FilterValueStyle) => void
}

const TodoList = (props: TodoListPropsType) => {
    const tasksItems = props.tasks.map(task => {

        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={() => props.removeTask(task.id)}>Del</button>
            </li>
        )
    })
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksItems}

            </ul>
            <div>
                <button onClick={() => props.changeFilter ('All')}>All</button>
                <button onClick={() => props.changeFilter ("Active")}>Active</button>
                <button onClick={() => props.changeFilter ("Completed")}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;