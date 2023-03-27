import {TasksStateType} from "../Todolist";
import {addTodolistAT, todolistID1, todolistID2} from "./todolist-reducer";
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

const initialState: TasksStateType = {
    [todolistID1]: [
        {id: v1(), title: 'Rest', isDone: false},
        {id: v1(), title: 'Work', isDone: true},
        {id: v1(), title: 'Sex', isDone: false},
    ],
    [todolistID2]: [
        {id: v1(), title: 'Rest Hard', isDone: false},
        {id: v1(), title: 'Work', isDone: true},
        {id: v1(), title: 'Eat', isDone: false},
    ]
};

export const taskReducer = (state = initialState, action: TaskToActionType): TasksStateType => {

    switch (action.type) {

        case "REMOVE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId)
            }

        case "ADD-TASK":
            let task = {id: action.todolistId, title: action.title, isDone: false};

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





