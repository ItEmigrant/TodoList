import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todoListApi} from "../Components/todoApi/todoListApi";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true
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
    useEffect(() => {
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: 'Redux'}, settings)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todoID = "d15b3cad-2035-4ebc-8e32-9dcb89bf304d"
    useEffect(() => {
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoID}`, settings)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todoID = "54c14407-acb5-4413-bca4-a13a1389f900"
    useEffect(() => {
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoID}`, {title: 'Angular'}, settings)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
