import {todoListApi, TodoListGetType} from "../todolistsApi/todoListApi";
import {Dispatch} from "redux";

const initialState: Array<TodoListDomainType> = [];
export const todolistReducer = (todoLists = initialState, action: TodolistReducerActionType): TodoListDomainType[] => {
    switch (action.type) {
        case "SET_TODO_LISTS":
            return action.TDL.map((tl) => ({...tl, filter: 'All'}))
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            return [{...action.todolist, filter: 'All'}, ...todoLists]
        case "FILTER-TODOLIST":
            return todoLists.map(el=> el.id===action.todolistId ? {...el, filter:action.value}: el)
        case "NAME-TODOLIST":
            return todoLists.map(tl=>tl.id===action.id ? {...tl, title:action.title} : tl)
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
export const getTodoListsThunkCreator = () => (dispatch: Dispatch) => {
    todoListApi.getTodoLists()
        .then((res) => {
            dispatch(setTodoListsRedux(res.data))
        })
}

export const deleteTodolistTC = (todoID: string) => (dispatch: Dispatch) => {
    todoListApi.delTodoLists(todoID)
        .then((res) => {
            dispatch(removeTodolistAC(todoID))
        })
}
export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todoListApi.postTodoLists(title)
        .then((res) => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}
export const changeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch) => {
    todoListApi.updateTodoLists(id, title)
        .then((res) => {
            dispatch(changeTodolistTitleAC(id, title))
        })
}

//types
export type removeTodolistAT = ReturnType<typeof removeTodolistAC>
export type addTodolistAT = ReturnType<typeof addTodolistAC>
export type SetTodoListType = ReturnType<typeof setTodoListsRedux>
export type FVT = 'All' | 'Active' | 'Completed';
export type TodoListDomainType = TodoListGetType & { filter: FVT }

export type TodolistReducerActionType =
    | removeTodolistAT
    | addTodolistAT
    | ReturnType<typeof changeFilterAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | SetTodoListType