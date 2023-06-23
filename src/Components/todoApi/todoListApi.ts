import axios from "axios";

const settings = {
    withCredentials: true
}
export const todoListApi = {
    getTodoLists() {
        return axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)

    },
    postTodoLists(title: string) {
        return axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title}, settings)
    },
    delTodoLists(todoID: string) {
        return axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoID}`, settings)
    },
    updateTodoLists(todoID: string, title: string) {
        return axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoID}`, {title}, settings)
    }

}