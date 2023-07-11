import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true
})


export const todoListApi = {
    getTodoLists() {
        return instance.get<TodoListGetType[]>('todo-lists')
    },
    postTodoLists(title: string) {
        return instance.post<ResponseType<{ item: TodoListGetType}>>('todo-lists', {title})
    },
    delTodoLists(todoID: string) {
        return instance.delete< ResponseType>(`todo-lists/${todoID}`)
    },
    updateTodoLists(todoID: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todoID}`, {title})
    }

}

export type TodoListGetType = {
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
}


