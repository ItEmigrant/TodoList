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
        return instance.post<TodoListPostType>('todo-lists', {title})
    },
    delTodoLists(todoID: string) {
        return instance.delete< TodoListDellType>(`todo-lists/${todoID}`)
    },
    updateTodoLists(todoID: string, title: string) {
        return instance.put<TodoListUpdateType>(`todo-lists/${todoID}`, {title})
    }

}

type TodoListGetType = {
    id: string,
    title: string,
    addedDate: Date,
    order: number
}

type  TodoListPostType = {
    resultCode: number,
    fieldsErrors: [],
    messages: string[],
    data: {
        item: TodoListGetType
    }
}

type  TodoListDellType = {
    resultCode: number,
    messages: string[],
    fieldsErrors: [],
    data: {}
}

type  TodoListUpdateType = {
    resultCode: number,
    messages: string[],
    fieldsErrors: [],
    data: {}
}