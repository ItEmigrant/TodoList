import axios from "axios";

const settings = {
    withCredentials: true
}
export const todoListApi = {
    getTodoLists() {
       return axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)

    }
}