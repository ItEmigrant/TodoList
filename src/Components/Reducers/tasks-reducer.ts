import {TasksStateType} from "../Todolist";
import {addTodolistAT,} from "./todolist-reducer";
import {v1} from "uuid";


export type removeActionType = ReturnType<typeof removeTasksAC>

export type addTasksType = ReturnType<typeof addTasksAC>

export type changeTasksStatusType = ReturnType<typeof changeTasksStatusAC>

export type changeTasksTitleAC = ReturnType<typeof changeTasksTitleAC>

export type RemoveTodolistAC = ReturnType<typeof RemoveTodolistAC>

export type TaskToActionType =
    removeActionType
    | addTasksType
    | changeTasksStatusType
    | changeTasksTitleAC
    | addTodolistAT
    | RemoveTodolistAC

const initialState: TasksStateType = {};

export const taskReducer = (state = initialState, action: TaskToActionType): TasksStateType => {

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
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    isDone: action.isDone
                } : t)

            }

        case "CHANGE-TITLE-TASK":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
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
            return state
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
        title, todolistId,
    } as const
}

export const changeTasksStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {

    return {
        type: "CHANGE-TASK-STATUS",
        taskId, todolistId, isDone

    } as const
}

export const changeTasksTitleAC = (taskId: string, title: string, todolistId: string) => {

    return {
        type: "CHANGE-TITLE-TASK",
        payload: {
            taskId, title, todolistId
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





