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
/*type TaskGetType = {
    id: string,
    title: string,
    description:string,
    todoListId: string,
    order: number,
    status: number,
    priority: number,
    startDate: string
    addedDate: Date


}*/

/*type ResponseType<T = {}> = {
    resultCode: number,
    messages: string[],
    fieldsErrors: [],
    data: T
}*/


