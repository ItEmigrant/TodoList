import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

import {FVT} from "../App";
import styles from './Todolist.module.css'

type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}

type TitlePropsType = {
    title: string
    tasks: Array<TaskPropsType>
    delTasks: (taskId: string) => void
    Sort: (value: FVT) => void
    addTask: (title: string) => void
    changeCheckboxStatus: (taskId: string, newIsDone: boolean) => void
}
export const Todolist = (props: TitlePropsType) => {

    let [title, setTitle] = useState('')

    const [error, setError] = useState<string | null>(null)

    const [color, setColor] = useState<FVT>('All')


    function addTaskHandler() {
        if (title.trim() !== '') {
            props.addTask(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }

    }

    function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        setError(null)
        setTitle(event.currentTarget.value)
    }

    function oneKeyUpPressHandler(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    function OnAllClickHandler() {
        {
            props.Sort('All')
            setColor('All')
        }
    }

    function OnActiveClickHandler() {
        {
            props.Sort('Active')
            setColor('Active')
        }
    }

    function OnCompletedClickHandler() {
        {
            props.Sort('Completed')
            setColor('Completed')
        }
    }

    const onClickHandler = (t: string) => {
        props.delTasks(t)
    }
    function changeCheckboxHandler(tID:string, eventValue: boolean) {
        props.changeCheckboxStatus(tID, eventValue)


    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input className={error ? styles.error : ''} value={title}
                       onChange={onChangeHandler}
                       onKeyUp={oneKeyUpPressHandler}/>
                <button onClick={addTaskHandler}>+
                </button>
            </div>
            {error && <div className={styles.errorMessage}>{error}</div>}
            <ul>
                {

                    props.tasks.map(t => {


                        return <li className={t.isDone ?styles.isDone:'' } key={t.id}>
                            <input  type="checkbox" checked={t.isDone} onChange={(event: ChangeEvent<HTMLInputElement>)=>changeCheckboxHandler(t.id, event.currentTarget.checked)}/>
                            <span>{t.title}</span>
                            <button onClick={() => onClickHandler(t.id)}>X</button>
                        </li>
                    })
                }

            </ul>
            <div>
                <button className={color === "All" ? styles.activeFilter : ''} onClick={OnAllClickHandler}>All
                </button>
                <button className={color === "Active" ? styles.activeFilter : ''} onClick={OnActiveClickHandler}>Active
                </button>
                <button className={color === "Completed" ? styles.activeFilter : ''}
                        onClick={OnCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
}


