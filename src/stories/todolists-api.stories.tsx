import React, {useEffect, useState} from 'react'
import {todoListApi} from "../Components/todoApi/todoListApi";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListApi.getTodoLists()
            .then((res) => {
                setState(res.data)
                console.log(res.data)
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
    const todoID = "79e1dc0b-0371-4204-95be-5019607b18a4"
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
    let title = 'LOL'
    const todoID = '69a6c7d4-4908-4187-8c85-37db6cf60ce3'
    useEffect(() => {
        todoListApi.updateTodoLists(todoID, title)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
