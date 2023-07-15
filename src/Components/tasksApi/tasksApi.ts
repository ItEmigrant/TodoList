import axios from "axios";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true
})


export const tasksApi = {
    getTasks(todoID: string) {
        return instance.get<ResponseTaskType<TaskGetType[]>>(`${todoID}/tasks`)
    },
    postTasks(todoID: string, title: string) {
        return instance.post<ResponseTaskType>(`${todoID}/tasks`, {title})
    },
    delTasks(todoID: string, taskID: string) {
        return instance.delete<ResponseTaskType>(`${todoID}/tasks/${taskID}`)
    },
    updateTask(todoID: string, taskID: string, title: string) {
        return instance.put<ResponseType>(`${todoID}/tasks/${taskID}`, {title})
    }

}


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

export type ResponseTaskType<T = {}> = {
    error: string | null
    totalCount: number
    items: T
}


