import {TasksStateType} from "../Todolist";
import {addTodolistAT, removeTodolistAT, SetTodoListType,} from "./todolist-reducer";
import {Dispatch} from "redux";
import {TaskGetType, taskPriority, tasksApi, taskStatuses, UpdateTaskModelType} from "../tasksApi/tasksApi";
import {AppRootStateType} from "../state/store";


export type removeActionType = ReturnType<typeof removeTasksAC>

export type addTasksType = ReturnType<typeof addTasksAC>

export type changeTasksStatusType = ReturnType<typeof changeTasksStatusAC>

export type changeTasksTitleAC = ReturnType<typeof changeTasksTitleAC>


export type TaskToActionType =
    removeActionType
    | addTasksType
    | changeTasksStatusType
    | changeTasksTitleAC
    | addTodolistAT
    | SetTodoListType
    | removeTodolistAT
    | ReturnType<typeof setTasksReduxAC>

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
            /* let task = {
                 title: action.title,
                 status: taskStatuses.New,
                 priority: taskPriority.Low,
                 startDate: '',
                 deadline: '',
                 id: v1(),
                 todoListId: action.todolistId,
                 order: 0,
                 addedDate: '',
                 description: ''
             };*/
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]

                /*  [action.todolistId]: [task, ...state[action.todolistId]]*/
            }

        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    status: action.status
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
                [action.todolist.id]: []
            }

        case "REMOVE-TODOLIST":
            let copyState = {...state}

            delete copyState[action.id]
            return copyState

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


export const addTasksAC = (task: TaskGetType) => {
    return {
        type: "ADD-TASK",
        task
    } as const
}

export const changeTasksStatusAC = (todolistId: string, status: taskStatuses, taskId: string) => {

    return {
        type: "CHANGE-TASK-STATUS",
        todolistId, status, taskId
    } as const
}

export const changeTasksTitleAC = (todolistId: string, title: string, taskId: string) => {

    return {
        type: "CHANGE-TITLE-TASK",
        payload: {
            todolistId, title, taskId
        }
    } as const
}


export const setTasksReduxAC = (tasks: TaskGetType[], todoId: string) => ({
    type: "SET_REDUX_TASK",
    tasks,
    todoId
}) as const;

export const getTaskThunkCreator = (todoId: string) => (dispatch: Dispatch) => {
    tasksApi.getTasks(todoId)
        .then((res) => {
            dispatch(setTasksReduxAC(res.data.items, todoId))

        })
}

export const deleteTaskTC = (todoID: string, taskID: string) => (dispatch: Dispatch) => {
    tasksApi.delTasks(todoID, taskID)
        .then((res) => {
            dispatch(removeTasksAC(taskID, todoID))
        })
}

export const createTaskTC = (todoListId: string, newTaskTitle: string) => (dispatch: Dispatch) => {
    tasksApi.postTasks(todoListId, newTaskTitle)
        .then((res) => {
            dispatch(addTasksAC(res.data.data.item))
        })
}


export type UpdateDomainTaskModelType = {
    title?: string,
    status?: taskStatuses
    priority?: taskPriority
    startDate?: string,
    deadline?: string,
    description?: string
}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todoLisId: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
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
                dispatch(changeTasksStatusAC(todoLisId, apiModel.status, taskId))

            })

    }
}

/*export const changeTaskTitleTC = (taskId: string, title: string, todoLisId: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todoLisId].find(t => t.id === taskId);
    if (task) {
        const model: UpdateTaskModelType = {
            title: title,
            startDate: task.startDate,
            priority: task.priority,
            deadline: task.deadline,
            description: task.description,
            status: task.status
        }
        tasksApi.updateTask(todoLisId, taskId, model)
            .then((res) => {
                dispatch(changeTasksTitleAC(todoLisId, title, taskId))


            })

    }
}*/



