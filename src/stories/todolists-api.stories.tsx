import React, {useEffect, useState} from 'react'
import {todoListApi} from "../api/todolistsApi/todoListApi";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListApi.getTodoLists()
            .then((res) => {
                setState(res.data)

            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const title = 'Krakow'
    useEffect(() => {
        todoListApi.postTodoLists(title)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todoID = "1a99e839-9511-4930-955f-380231e868b7"
    useEffect(() => {
        todoListApi.delTodoLists(todoID)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    let title = 'LOLa'
    const todoID = "bc5f79dd-d839-4acf-8c56-184db82bef5d"
    useEffect(() => {
        todoListApi.updateTodoLists(todoID, title)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
