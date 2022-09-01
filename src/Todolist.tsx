import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValueStyle} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    //FilterValueStyle: string
    addTask: (inputValue: string) => void

}

const TodoList = (props: TodoListPropsType) => {

    let [filter, setFilter] = useState<FilterValueStyle>("All")

    const changeFilter = (filter: FilterValueStyle) => {
        setFilter(filter)
    }

let tempTasks = props.tasks
        switch (filter) {
            case "Active":
                tempTasks =  props.tasks.filter(t => !t.isDone)
                break
            case "Completed":
                tempTasks =   props.tasks.filter(t => t.isDone)
                break
        }



    const addTaskHandler = () => {
        props.addTask(inputValue)
        setInputValue('')
    }
    const [inputValue, setInputValue] = useState('')

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
    }

    const tsarChangeFilterHandler = (value: FilterValueStyle) => {
        changeFilter(value)
    }
    const removeTaskHandler = (taskID:string) => {
        props.removeTask(taskID)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={inputValue} onKeyUp={onKeyPressHandler}
                       onChange={onChangeHandler}
                />
                <button onClick={() => addTaskHandler()}>+</button>
            </div>
            <ul>
                {tempTasks.map(task => {
                    /* const removeTaskHandler = () => {
                         props.removeTask(task.id)
                     }*/
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={()=>removeTaskHandler(task.id)}>Del</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => tsarChangeFilterHandler('All')}>All</button>
                <button onClick={() => tsarChangeFilterHandler('Active')}>Active</button>
                <button onClick={() => tsarChangeFilterHandler('Completed')}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;