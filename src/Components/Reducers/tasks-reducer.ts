import {TasksStateType} from "../Todolist";
import {v1} from "uuid";
import {addTodolistAT} from "./todolist-reducer";


export type removeActionType = ReturnType<typeof removeTasksAC>

export type addTasksType = ReturnType<typeof addTasksAC>

export type changeTasksStatusType = ReturnType<typeof changeTasksStatusAC>

export type changeTasksTitleAC = ReturnType<typeof changeTasksTitleAC>

export type RemoveTodolistAC = ReturnType<typeof RemoveTodolistAC>

type ActionType =
    removeActionType
    | addTasksType
    | changeTasksStatusType
    | changeTasksTitleAC
    | addTodolistAT
    | RemoveTodolistAC

export const taskReducer = (state: TasksStateType, action: ActionType) => {

    switch (action.type) {

        case "REMOVE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId)
            }

        case "ADD-TASK":
            let task = {id: v1(), title: action.title, isDone: false};

            return {
                ...state,
                [action.todolistId]: [task, ...state[action.todolistId]]
            }

        case "CHANGE-TASK-STATUS":

            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskID ? {
                    ...t,
                    isDone: action.isDone
                } : t)

            }

        case "CHANGE-TITLE-TASK":

            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskID ? {
                    ...t,
                    title: action.payload.title
                } : t)

            }

        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todolistID]: []
            }

        case "REMOVE-TODOLIST-ELEMENT":

            let {[action.payload.todolistId]: [], ...rest} = {...state}
          /*  let copyState = {...state}
            delete copyState[action.payload.todolistId]*/
            return rest

        default:
            throw new Error("I don't understand this type")
    }

}


export const removeTasksAC = (taskId: string, todolistId: string) => {
    return {
        type: "REMOVE-TASK",
        taskId, todolistId
    } as const
}


export const addTasksAC = (title: string, todolistId: string) => {

    return {
        type: "ADD-TASK",
        title, todolistId

    } as const
}

export const changeTasksStatusAC = (taskID: string, isDone: boolean, todolistId: string) => {

    return {
        type: "CHANGE-TASK-STATUS",
        taskID, todolistId, isDone

    } as const
}

export const changeTasksTitleAC = (taskID: string, title: string, todolistId: string) => {

    return {
        type: "CHANGE-TITLE-TASK",
        payload: {
            taskID, title, todolistId
        }
    } as const
}

export const RemoveTodolistAC = (todolistId: string) => {
    return {
        type: "REMOVE-TODOLIST-ELEMENT",
        payload: {
            todolistId
        }
    } as const
}




