import {TasksStateType} from "../Todolist";
import {addTodolistAC, todolistReducer} from "./todolist-reducer";
import {taskReducer} from "./tasks-reducer";
import {TodolistType} from "../../AppWithRedux";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodoListsState: Array<TodolistType> = [];


    const action = addTodolistAC('new todoList')

    const endTodoListsState = todolistReducer(startTodoListsState, action)
    const endTasksState = taskReducer(startTasksState, action)

    const keys = Object.keys(endTasksState);
    const idFormTasks = keys[0];
    const idFormTodoLists = endTodoListsState[0].id;

    expect(idFormTasks).toBe(action.todolistID);
    expect(idFormTodoLists).toBe(action.todolistID);

})