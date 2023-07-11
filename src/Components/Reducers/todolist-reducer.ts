import {FVT, TodolistType} from "../../AppWithRedux";
import {v1} from "uuid";
import {TodoListGetType} from "../todolistsApi/todoListApi";

type removeTodolistAT = {
    type: "REMOVE-TODOLIST"
    id: string
}

export type addTodolistAT = {
    type: "ADD-TODOLIST"
    title: string
    todolistID: string
}

type changeFilterAT = {
    type: "FILTER-TODOLIST"
    value: FVT,
    todolistId: string
}

type changeTodolistTitleAT = {
    type: 'NAME-TODOLIST'
    id: string
    title: string
}

const initialState: Array<TodolistType> = [];

export type TodolistReducerActionType = removeTodolistAT | addTodolistAT | changeFilterAT | changeTodolistTitleAT

export const todolistReducer = (todoLists = initialState, action: TodolistReducerActionType): Array<TodolistType> => {

    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            return [...todoLists, {id: action.todolistID, title: action.title, filter: 'All'}]
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

export const addTodolistAC = (title: string): addTodolistAT => ({type: "ADD-TODOLIST", title, todolistID: v1()});

export const changeFilterAC = (value: FVT, todolistId: string): changeFilterAT => ({
    type: "FILTER-TODOLIST", value, todolistId
})
export const changeTodolistTitleAC = (title: string, id: string): changeTodolistTitleAT => ({
    type: "NAME-TODOLIST",
    title,
    id
})


type SetTodoListType = {
    type: "SET_TODO_LISTS"
    TDL: TodoListGetType[]
}
export const setTodoListsRedux = (TDL: TodoListGetType[]): SetTodoListType=> ({
    type: "SET_TODO_LISTS",
    TDL
})
