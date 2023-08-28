import {v1} from "uuid";

import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC, FVT,
    removeTodolistAC, setTodoListsRedux, TodoListDomainType,
    todolistReducer
} from "./todolist-reducer";


let todolistId1: string
let todolistId2: string

let startState: Array<TodoListDomainType>


beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "All", addedDate: '', order: 0, entityStatus:"idle"},
        {id: todolistId2, title: "What to buy", filter: "All", addedDate: '', order: 0, entityStatus:"idle"}
    ]
})

test("correct todolist should be removed", () => {
    const endState = todolistReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {


    let newTodolistTitle = "New Todolist"

    const endState = todolistReducer(startState, addTodolistAC({
        id: 'todolistID3',
        title: 'New Todolist',
        order: 0,
        addedDate: '',

    }))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});

test("correct todolist should be changed", () => {

    let newFilter: FVT = "Completed"

    const endState = todolistReducer(startState, changeFilterAC(newFilter, todolistId2))

    expect(endState[0].filter).toBe('All');
    expect(endState[1].filter).toBe(newFilter);
});

test("correct todolist should change name", () => {

    let newTodolistTitle = "New Todolist"

    const endState = todolistReducer(startState, changeTodolistTitleAC(todolistId2,newTodolistTitle))

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});


test("correct todoLists should be set to the Redux", () => {

    let action = setTodoListsRedux(startState)

    const endState = todolistReducer([], action)

    expect(endState.length).toBe(2);
    expect(endState[1].title).toBe("What to buy");
});
