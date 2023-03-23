import {TasksStateType} from "../Todolist";
import {addTasksAC, changeTasksStatusAC, changeTasksTitleAC, removeTasksAC, taskReducer} from "./tasks-reducer";

test('correct task should be delete from correct array', () => {
    const startTasksState: TasksStateType = {
        'todolistID1': [
            {id: '1', title: 'Rest', isDone: false},
            {id: '2', title: 'Work', isDone: true},
            {id: '3', title: 'Sex', isDone: false},
        ],
        'todolistID2': [
            {id: '1', title: 'Rest Hard', isDone: false},
            {id: '2', title: 'Work', isDone: true},
            {id: '3', title: 'Eat', isDone: false},
        ]
    };


    const action = removeTasksAC('2', 'todolistID2')

    const endState = taskReducer(startTasksState, action)

    expect(endState).toEqual({
        'todolistID1': [
            {id: '1', title: 'Rest', isDone: false},
            {id: '2', title: 'Work', isDone: true},
            {id: '3', title: 'Sex', isDone: false}
        ],
        'todolistID2': [
            {id: '1', title: 'Rest Hard', isDone: false},
            {id: '3', title: 'Eat', isDone: false}
        ]
    });
});


test('correct task should be added to correct array', () => {
    const startTasksState: TasksStateType = {
        'todolistID1': [
            {id: '1', title: 'Rest', isDone: false},
            {id: '2', title: 'Work', isDone: true},
            {id: '3', title: 'Sex', isDone: false},
        ],
        'todolistID2': [
            {id: '1', title: 'Rest Hard', isDone: false},
            {id: '2', title: 'Work', isDone: true},
            {id: '3', title: 'Eat', isDone: false},
        ]
    };


    const action = addTasksAC('Train', 'todolistID2')

    const endState = taskReducer(startTasksState, action)

    expect(endState['todolistID1'].length).toBe(3);
    expect(endState['todolistID2'].length).toBe(4);
    expect(endState['todolistID2'][0].id).toBeDefined();
    expect(endState['todolistID2'][0].title).toBe('Train');
    expect(endState['todolistID2'][0].isDone).toBe(false);

})

test('status specified task should be changed', () => {
    const startTasksState: TasksStateType = {
        'todolistID1': [
            {id: '1', title: 'Rest', isDone: false},
            {id: '2', title: 'Work', isDone: true},
            {id: '3', title: 'Sex', isDone: false},
        ],
        'todolistID2': [
            {id: '1', title: 'Rest Hard', isDone: false},
            {id: '2', title: 'Work', isDone: true},
            {id: '3', title: 'Eat', isDone: false},
        ]
    };


    const action = changeTasksStatusAC('2', false, 'todolistID2')

    const endState = taskReducer(startTasksState, action)

    expect(endState['todolistID2'][1].isDone).toBe(false);
    expect(endState['todolistID2'][1].id).toBe('2');
    expect(endState['todolistID1'][1].isDone).toBe(true);

})

test('title for task should be changed', () => {
    const startTasksState: TasksStateType = {
        'todolistID1': [
            {id: '1', title: 'Rest', isDone: false},
            {id: '2', title: 'Work', isDone: true},
            {id: '3', title: 'Sex', isDone: false},
        ],
        'todolistID2': [
            {id: '1', title: 'Rest Hard', isDone: false},
            {id: '2', title: 'Work', isDone: true},
            {id: '3', title: 'Eat', isDone: false},
        ]
    };


    const action = changeTasksTitleAC('1', 'Run', 'todolistID1')

    const endState = taskReducer(startTasksState, action)

    expect(endState['todolistID1'][0].title).toBe('Run');
    expect(startTasksState['todolistID1'][0].title).toBe('Rest');
    expect(endState['todolistID1'][0].id).toBe('1');

})

