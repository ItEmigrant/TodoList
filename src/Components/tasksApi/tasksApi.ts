import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true
})


export const tasksApi = {
    getTasks(todoID: string) {
        return instance.get(`${todoID}/tasks`)
    },
    postTasks(todoID: string, title: string) {
        return instance.post(`${todoID}/tasks`, {title})
    },
    delTasks(todoID: string, taskID: string) {
        return instance.delete(`${todoID}/tasks/${taskID}`)
    },
    updateTask(todoID: string, taskID: string, title: string) {
        return instance.put<ResponseType>(`${todoID}/tasks/${taskID}`, {title})
    }

}
/*
type TodoListGetType = {
    id: string,
    title: string,
    addedDate: Date,
    order: number
}

type ResponseType<T={}> = {
    resultCode: number,
    messages: string[],
    fieldsErrors: [],
    data: T
}*/


