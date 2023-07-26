import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true
})
//Api
export const tasksApi = {
    getTasks(todoID: string) {
        return instance.get<ResponseGetTaskType<TaskGetType[]>>(`${todoID}/tasks`)
    },
    postTasks(todoID: string, title: string) {
        return instance.post<ResponsePostTaskType<TaskGetType>>(`${todoID}/tasks`, {title})
    },
    delTasks(todoID: string, taskID: string) {
        return instance.delete<ResponseDeleteTaskType>(`${todoID}/tasks/${taskID}`)
    },
    updateTask(todoID: string, taskID: string, model: UpdateTaskModelType) {
        return instance.put<ResponseUpdateTaskType<TaskGetType>>(`${todoID}/tasks/${taskID}`, model)
    }

}
//types
export enum taskStatuses {
    New = 0,
    InProgress,
    Completed,
    Draft = 3
}

export enum taskPriority {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}

//types
export type TaskGetType = {
    title: string,
    status: taskStatuses,
    priority: taskPriority,
    startDate: string,
    deadline: string,
    id: string,
    todoListId: string,
    order: number,
    addedDate: string,
    description: string
}
export type ResponseGetTaskType<T = {}> = {
    error: string | null
    totalCount: number
    items: T
}
export type ResponsePostTaskType<T = {}> = {
    resultCode: number,
    messages: string[],
    data: { item: T }

}
export type ResponseDeleteTaskType<T = {}> = {
    resultCode: number,
    messages: string[],
    data: {}
}
export type ResponseUpdateTaskType<T = {}> = {
    resultCode: number,
    messages: string[],
    data: { item: T }
}
export type UpdateTaskModelType = {
    title: string,
    status: taskStatuses
    priority: taskPriority
    startDate: string,
    deadline: string,
    description: string
}

