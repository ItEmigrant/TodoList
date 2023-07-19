import React, {useEffect, useState} from 'react'
import {tasksApi} from "../Components/tasksApi/tasksApi";

export default {
    title: 'API-Tasks'
}

const todoID = "bc5f79dd-d839-4acf-8c56-184db82bef5d"

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
        useEffect(() => {
        tasksApi.getTasks(todoID)
            .then((res) => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    const title = 'work'
    useEffect(() => {
        tasksApi.postTasks(todoID, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const tasksID = "ed764e75-d468-4c45-9f9f-ca0cb4d5ab08"
    useEffect(() => {
        tasksApi.delTasks(todoID, tasksID)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    let title = 'Sex'
    const taskID = "c7734ea5-345c-406a-bc67-270d9e2631b4"
    useEffect(() => {
        //@ts-ignore
        tasksApi.updateTask(todoID, taskID,  title)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
