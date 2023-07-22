import {TasksStateType} from "../Todolist";
import {addTodolistAC, setTodoListsRedux, TodoListDomainType, todolistReducer} from "./todolist-reducer";
import {taskReducer} from "./tasks-reducer";


test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodoListsState: Array<TodoListDomainType> = [];


    const action = addTodolistAC({
        id: 'todolistID3',
        title: 'Rest',
        order: 0,
        addedDate: '',

    })

    const endTodoListsState = todolistReducer(startTodoListsState, action)
    const endTasksState = taskReducer(startTasksState, action)

    const keys = Object.keys(endTasksState);
    const idFormTasks = keys[0];
    const idFormTodoLists = endTodoListsState[0].id;

    expect(idFormTasks).toBe(action.todolist.id);
    expect(idFormTodoLists).toBe(action.todolist.id);

})

test('empty arrays should be added when we set todo', () => {
    const action = setTodoListsRedux([
        {id: '1', title: "title 1", addedDate: '', order: 0},
        {id: '2', title: "title 2", addedDate: '', order: 0}
    ])

    const andState = taskReducer({}, action)
    const keys = Object.keys(andState)

    expect(keys.length).toBe(2)
    expect(andState['1']).toBeDefined()
    expect(andState['2']).toBeDefined()

})
