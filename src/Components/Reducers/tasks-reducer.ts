import {TasksStateType} from "../Todolist";
import {addTodolistAT, SetTodoListType,} from "./todolist-reducer";
import {Dispatch} from "redux";
import {TaskGetType, tasksApi, taskStatuses} from "../tasksApi/tasksApi";


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
    | SetTodoListType
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
                copyState[tl.id] = []
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


export const addTasksAC = (task: TaskGetType) => {
       return {
        type: "ADD-TASK",
        task
    } as const
}

export const changeTasksStatusAC = (todolistId: string, taskId: string, status: taskStatuses) => {

    return {
        type: "CHANGE-TASK-STATUS",
        taskId, todolistId, status

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





