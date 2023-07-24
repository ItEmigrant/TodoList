import {v1} from "uuid";
import {todoListApi, TodoListGetType} from "../todolistsApi/todoListApi";
import {Dispatch} from "redux";
import {tasksApi} from "../tasksApi/tasksApi";
import {addTasksAC} from "./tasks-reducer";

export type removeTodolistAT = {
    type: "REMOVE-TODOLIST"
    id: string
}

export type addTodolistAT = ReturnType<typeof addTodolistAC>
type changeFilterAT = ReturnType<typeof changeFilterAC>
type changeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>
export type SetTodoListType = ReturnType<typeof setTodoListsRedux>

export type FVT = 'All' | 'Active' | 'Completed';

export type TodoListDomainType = TodoListGetType & {
    filter: FVT
}


const initialState: Array<TodoListDomainType> = [];

export type TodolistReducerActionType =
    removeTodolistAT
    | addTodolistAT
    | changeFilterAT
    | changeTodolistTitleAT
    | SetTodoListType

export const todolistReducer = (todoLists = initialState, action: TodolistReducerActionType): TodoListDomainType[] => {

    switch (action.type) {
        case "SET_TODO_LISTS":
            return action.TDL.map((tl) => ({...tl, filter: 'All'}))

        case "REMOVE-TODOLIST":

            return todoLists.filter(tl => tl.id !== action.id)

        case "ADD-TODOLIST":

            const newTodolist: TodoListDomainType = {...action.todolist, filter: 'All'}
            return [newTodolist, ...todoLists]
        /*  {
              id: action.todolistID,
              title: action.title,
              filter: 'All', addedDate: '',
              order: 0
          }*/

        case "FILTER-TODOLIST":
            let todolist = todoLists.find(tl => tl.id === action.todolistId);
            if (todolist) {
                todolist.filter = action.value;
            }
            return ([...todoLists]);

        case "NAME-TODOLIST":
            const todolist1 = todoLists.find(tl => tl.id === action.id);
            if (todolist1) {
                todolist1.title = action.title;
            }
            return ([...todoLists]);

        default:
            return todoLists
    }

}

export const removeTodolistAC = (id: string): removeTodolistAT => ({type: "REMOVE-TODOLIST", id});

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

