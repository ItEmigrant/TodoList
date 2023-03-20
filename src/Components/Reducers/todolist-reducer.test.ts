import {v1} from "uuid";
import {FVT, TodolistType} from "../../App";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./todolist-reducer";

let todolistId1 = v1();
let todolistId2 = v1();

const startState: Array<TodolistType> = [
    {id: todolistId1, title: "What to learn", filter: "All"},
    {id: todolistId2, title: "What to buy", filter: "All"}
]

test("correct todolist should be removed", () => {


    const endState = todolistReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist"

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]

    const endState = todolistReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test("correct todolist should be changed", () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FVT = "Completed"

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]

    const endState = todolistReducer(startState, changeFilterAC(newFilter, todolistId2))

    expect(endState[0].filter).toBe('All');
    expect(endState[1].filter).toBe(newFilter);
});

test("correct todolist should change name", () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist"

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]

    const endState = todolistReducer(startState, changeTodolistTitleAC(newTodolistTitle, todolistId2))

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});



