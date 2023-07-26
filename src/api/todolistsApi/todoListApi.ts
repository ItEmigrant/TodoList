import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true
})

//Api
export const todoListApi = {
    getTodoLists() {
        return instance.get<TodoListGetType[]>('todo-lists')
    },
    postTodoLists(title: string) {
        return instance.post<ResponseType<{ item: TodoListGetType }>, AxiosResponse<ResponseType<{
            item: TodoListGetType
        }>>, { title: string }>('todo-lists', {title}) //type 3 params
    },
    delTodoLists(todoID: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoID}`)
    },
    updateTodoLists(todoID: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todoID}`, {title})
    }
}

//types
export type TodoListGetType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
export type ResponseType<T = {}> = {
    resultCode: number,
    messages: string[],
    fieldsErrors: [],
    data: T
}


