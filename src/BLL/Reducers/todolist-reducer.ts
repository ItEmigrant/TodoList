import {todoListApi, TodoListGetType} from "../../api/todolistsApi/todoListApi";
import {Dispatch} from "redux";
import {RequestStatusType, setErrorAC, setErrorACType, setStatusAC, setStatusACType} from "./app-reducer";

const initialState: Array<TodoListDomainType> = [];
export const todolistReducer = (todoLists = initialState, action: TodolistReducerActionType): TodoListDomainType[] => {
    switch (action.type) {
        case "SET_TODO_LISTS":
            return action.TDL.map((tl) => ({...tl, filter: 'All', entityStatus: "idle"}))
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            return [{...action.todolist, filter: 'All', entityStatus: "idle"}, ...todoLists]
        case "FILTER-TODOLIST":
            return todoLists.map(el => el.id === action.todolistId ? {...el, filter: action.value} : el)
        case "NAME-TODOLIST":
            return todoLists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case "CHANGE-ENTITY-STATUS":
            return todoLists.map(tl => tl.id === action.todolistId ? {...tl, entityStatus: action.entityStatus} : tl)

        default:
            return todoLists
    }
}
//actions
export const removeTodolistAC = (id: string) => ({type: "REMOVE-TODOLIST", id}) as const;
export const addTodolistAC = (todolist: TodoListGetType) => ({
    type: "ADD-TODOLIST",
    todolist
}) as const;
export const changeFilterAC = (value: FVT, todolistId: string) => ({
    type: "FILTER-TODOLIST", value, todolistId
}) as const;
export const changeEntityStatusAC = (entityStatus: RequestStatusType, todolistId: string) => ({
    type: "CHANGE-ENTITY-STATUS", entityStatus, todolistId
}) as const;
export const changeTodolistTitleAC = (id: string, title: string,) => ({
    type: "NAME-TODOLIST",
    title,
    id
}) as const;
export const setTodoListsRedux = (TDL: TodoListGetType[]) => ({
    type: "SET_TODO_LISTS",
    TDL
}) as const;

//thunks
export const getTodoListsThunkCreator = () => (dispatch: Dispatch<TodolistReducerActionType>) => {
    dispatch(setStatusAC('loading'))
    todoListApi.getTodoLists()
        .then((res) => {
            dispatch(setTodoListsRedux(res.data))
            dispatch(setStatusAC('succeeded'))
        })
}
enum ResultCode {
    success=0,
    error=1,
   }
export const deleteTodolistTC = (todoID: string) => (dispatch: Dispatch<TodolistReducerActionType>) => {
    dispatch(setStatusAC('loading'))
    dispatch(changeEntityStatusAC('loading', todoID))
    todoListApi.delTodoLists(todoID)
        .then((res) => {
            if (res.data.resultCode === ResultCode.success) {
                dispatch(removeTodolistAC(todoID))
                dispatch(setStatusAC('succeeded'))
            } else {
                if (res.data.messages.length) {
                    dispatch(setErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setErrorAC('Some Error'))
                }
            }
        })
        .catch((error) => {
            dispatch(setStatusAC('failed'))
            dispatch(changeEntityStatusAC('failed', todoID))
            dispatch(setErrorAC(error.message))
        })
}
export const createTodolistTC = (title: string) => (dispatch: Dispatch<TodolistReducerActionType>) => {
    dispatch(setStatusAC('loading'))
    todoListApi.postTodoLists(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC(res.data.data.item))
            } else {
                if (res.data.messages.length) {
                    dispatch(setErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setErrorAC('Some Error'))
                }
            }
            dispatch(setStatusAC('succeeded'))
        })
}
export const changeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch<TodolistReducerActionType>) => {
    dispatch(setStatusAC('loading'))
    todoListApi.updateTodoLists(id, title)
        .then(() => {
            dispatch(changeTodolistTitleAC(id, title))
            dispatch(setStatusAC('succeeded'))
        })
}

//types
export type removeTodolistAT = ReturnType<typeof removeTodolistAC>
export type addTodolistAT = ReturnType<typeof addTodolistAC>
export type SetTodoListType = ReturnType<typeof setTodoListsRedux>
export type FVT = 'All' | 'Active' | 'Completed';
export type TodoListDomainType = TodoListGetType & {
    filter: FVT,
    entityStatus: RequestStatusType
}

export type TodolistReducerActionType =
    | removeTodolistAT
    | addTodolistAT
    | ReturnType<typeof changeEntityStatusAC>
    | ReturnType<typeof changeFilterAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | SetTodoListType
    | setStatusACType
    | setErrorACType
