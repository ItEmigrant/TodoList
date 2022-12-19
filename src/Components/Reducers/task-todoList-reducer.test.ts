import {addTodolistAC, todolistReducer} from "./todolist-reducer";
import {TasksStateType} from "../Todolist";
import {TodolistType} from "../../App";
import {taskReducer} from "./tasks-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistType> = []

    const action = addTodolistAC('new todolist')

    const endTasksState = taskReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolistID)
    expect(idFromTodolists).toBe(action.todolistID)
})

