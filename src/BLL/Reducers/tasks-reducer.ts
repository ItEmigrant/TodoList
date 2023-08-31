import {TasksStateType} from "../../Components/Todolists/TodolistLists/Todolist/Todolist";
import {addTodolistAT, removeTodolistAT, SetTodoListType,} from "./todolist-reducer";
import {Dispatch} from "redux";
import {TaskGetType, taskPriority, tasksApi, taskStatuses, UpdateTaskModelType} from "../../api/tasksApi/tasksApi";
import {AppRootStateType} from "../../App/state/store";
import {setErrorACType, setStatusAC, setStatusACType} from "./app-reducer";
import {ResultCode} from "../../api/todolistsApi/todoListApi";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";


const initialState: TasksStateType = {};

export const taskReducer = (state = initialState, action: TaskToActionType): TasksStateType => {

    switch (action.type) {
        case "SET_REDUX_TASK": {
            return {
                ...state,
                [action.todoId]: action.tasks
            }
        }
        case "SET_TODO_LISTS": {
            const copyState = {...state}
            action.TDL.forEach((tl) => {
                copyState[tl.id] = [];
            })
            return copyState
        }
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId)
            }
        case "ADD-TASK":
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        case "UPDATE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    ...action.model
                } : t)
            }
        case "ADD-TODOLIST":
            return {...state, [action.todolist.id]: []}
        case "REMOVE-TODOLIST":
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        default:
            return state
    }

}

//actions
export const removeTasksAC = (taskId: string, todolistId: string) => ({
    type: "REMOVE-TASK",
    taskId, todolistId
} as const)

export const addTasksAC = (task: TaskGetType) => ({
    type: "ADD-TASK",
    task
} as const)

export const updateTasksAC = (todolistId: string, model: UpdateDomainTaskModelType, taskId: string) => ({
    type: "UPDATE-TASK",
    todolistId, model, taskId
} as const)

export const setTasksReduxAC = (tasks: TaskGetType[], todoId: string) => ({
    type: "SET_REDUX_TASK",
    tasks,
    todoId
}) as const;

//thunks
export const getTaskThunkCreator = (todoId: string) => (dispatch: Dispatch<TaskToActionType>) => {
    dispatch(setStatusAC('loading'))
    tasksApi.getTasks(todoId)
        .then((res) => {
            dispatch(setTasksReduxAC(res.data.items, todoId))
            dispatch(setStatusAC('succeeded'))
        })
}
export const deleteTaskTC = (todoID: string, taskID: string) => (dispatch: Dispatch<TaskToActionType>) => {
    dispatch(setStatusAC('loading'))
    tasksApi.delTasks(todoID, taskID)
        .then(() => {
            dispatch(removeTasksAC(taskID, todoID))
            dispatch(setStatusAC('succeeded'))
        })
}
export const createTaskTC = (todoListId: string, newTaskTitle: string) => (dispatch: Dispatch<TaskToActionType>) => {
    dispatch(setStatusAC('loading'))
    tasksApi.postTasks(todoListId, newTaskTitle)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTasksAC(res.data.data.item))
            } else {
               handleServerAppError(dispatch, res.data)
        }})
        .catch(((err) => {
            handleServerNetworkError(dispatch,err)
        }))
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todoLisId: string) => (dispatch: Dispatch<TaskToActionType>, getState: () => AppRootStateType) => {
    dispatch(setStatusAC('loading'))
    const task = getState().tasks[todoLisId].find(t => t.id === taskId);
    if (task) {
        const apiModel: UpdateTaskModelType = {
            title: task.title,
            startDate: task.startDate,
            priority: task.priority,
            deadline: task.deadline,
            description: task.description,
            status: task.status,
            ...domainModel
        }
        tasksApi.updateTask(todoLisId, taskId, apiModel)
            .then((res) => {
                if (res.data.resultCode === ResultCode.success) {
                    dispatch(updateTasksAC(todoLisId, domainModel, taskId))
                    dispatch(setStatusAC('succeeded'))
                } else {
                   handleServerAppError(dispatch, res.data)
            }})
            .catch((err) => {
                handleServerNetworkError(dispatch,err)
            })
    }
}

//types
export type UpdateDomainTaskModelType = {
    title?: string,
    status?: taskStatuses
    priority?: taskPriority
    startDate?: string,
    deadline?: string,
    description?: string
}
export type TaskToActionType =
    | ReturnType<typeof removeTasksAC>
    | ReturnType<typeof addTasksAC>
    | ReturnType<typeof updateTasksAC>
    | addTodolistAT
    | SetTodoListType
    | removeTodolistAT
    | ReturnType<typeof setTasksReduxAC>
    | setStatusACType
    | setErrorACType

