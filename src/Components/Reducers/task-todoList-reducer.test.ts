import {TasksStateType} from "../Todolist";
import {addTasksAC, removeTasksAC, taskReducer} from "./tasks-reducer";

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
    expect(endState['todolistID2']).toBeDefined();
    expect(endState['todolistID2'][0].title).toBe('Train');
    expect(endState['todolistID2'][0].isDone).toBe(false);

})

