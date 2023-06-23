import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true
})


export const todoListApi = {
    getTodoLists() {
        return instance.get<TodoListDallType[]>('todo-lists')
    },
    postTodoLists(title: string) {
        return instance.post('todo-lists', {title})
    },
    delTodoLists(todoID: string) {
        return instance.delete(`todo-lists/${todoID}`)
    },
    updateTodoLists(todoID: string, title: string) {
        return instance.put(`todo-lists/${todoID}`, {title})
    }

}

type TodoListDallType = {
    id: string,
    title: string,
    addedDate: Date,
    order: number
}