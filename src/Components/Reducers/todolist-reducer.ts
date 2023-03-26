import {FVT, TodolistType} from "../../AppWithReducer";
import {v1} from "uuid";

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

export type TodolistReducerActionType = removeTodolistAT | addTodolistAT | changeFilterAT | changeTodolistTitleAT

export const todolistReducer = (todolists: Array<TodolistType>, action: TodolistReducerActionType): Array<TodolistType> => {

    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id != action.id)
        case "ADD-TODOLIST":
            return [...todolists, {id: action.todolistID, title: action.title, filter: 'All'}]
        case "FILTER-TODOLIST":
            let todolist = todolists.find(tl => tl.id === action.todolistId);
            if (todolist) {
                todolist.filter = action.value;
            }
            return ([...todolists]);
        case "NAME-TODOLIST":
            const todolist1 = todolists.find(tl => tl.id === action.id);
            if (todolist1) {
                todolist1.title = action.title;
            }
            return ([...todolists]);

        default:
            return todolists
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
