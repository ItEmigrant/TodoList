import {TasksStateType} from "../Todolist";
import {
    addTasksAC,
    removeTasksAC,
    taskReducer, updateTasksAC
} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC} from "./todolist-reducer";

import {taskPriority, taskStatuses} from "../../api/tasksApi/tasksApi";

let startTasksState: TasksStateType

beforeEach(() => {
    startTasksState = {
        'todolistID1': [
            {
                id: '1',
                todoListId: 'todolistID1',
                title: 'Rest',
                status: taskStatuses.New,
                priority: taskPriority.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: '',
                description: ''
            },
            {
                id: '2',
                todoListId: 'todolistID1',
                title: 'Work',
                status: taskStatuses.Completed,
                priority: taskPriority.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: '',
                description: ''
            },
            {
                id: '3',
                todoListId: 'todolistID1',
                title: 'Sex',
                status: taskStatuses.New,
                priority: taskPriority.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: '',
                description: ''
            }
        ],
        'todolistID2': [

            {
                id: '1',
                todoListId: 'todolistID2',
                title: 'Rest Hard',
                status: taskStatuses.New,
                priority: taskPriority.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: '',
                description: ''
            },
            {
                id: '2',
                todoListId: 'todolistID2',
                title: 'Work',
                status: taskStatuses.Completed,
                priority: taskPriority.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: '',
                description: ''
            },
            {
                id: '3',
                todoListId: 'todolistID2',
                title: 'Eat',
                status: taskStatuses.New,
                priority: taskPriority.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: '',
                description: ''
            }

            /* {id: '1', title: 'Rest Hard', isDone: false},
             {id: '2', title: 'Work', isDone: true},
             {id: '3', title: 'Eat', isDone: false},*/
        ]
    }
});

test('correct task should be delete from correct array', () => {

    const action = removeTasksAC('2', 'todolistID2')

    const endState = taskReducer(startTasksState, action)

    expect(endState).toEqual({
        'todolistID1': [
            {
                id: '1',
                todoListId: 'todolistID1',
                title: 'Rest',
                status: taskStatuses.New,
                priority: taskPriority.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: '',
                description: ''
            },
            {
                id: '2',
                todoListId: 'todolistID1',
                title: 'Work',
                status: taskStatuses.Completed,
                priority: taskPriority.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: '',
                description: ''
            },
            {
                id: '3',
                todoListId: 'todolistID1',
                title: 'Sex',
                status: taskStatuses.New,
                priority: taskPriority.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: '',
                description: ''
            }
        ],
        'todolistID2': [
            {
                id: '1',
                todoListId: 'todolistID2',
                title: 'Rest Hard',
                status: taskStatuses.New,
                priority: taskPriority.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: '',
                description: ''
            },
            {
                id: '3',
                todoListId: 'todolistID2',
                title: 'Eat',
                status: taskStatuses.New,
                priority: taskPriority.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: '',
                description: ''
            }

        ]
    });
});

test('correct task should be added to correct array', () => {

    const action = addTasksAC({
        id: '4',
        todoListId: 'todolistID2',
        title: 'xxx',
        status: taskStatuses.New,
        priority: taskPriority.Low,
        startDate: '',
        deadline: '',
        order: 0,
        addedDate: '',
        description: ''
    },)

    const endState = taskReducer(startTasksState, action)

    expect(endState['todolistID1'].length).toBe(3);
    expect(endState['todolistID2'].length).toBe(4);
    expect(endState['todolistID2'][0].id).toBeDefined();
    expect(endState['todolistID2'][0].title).toBe('xxx');
    expect(endState['todolistID2'][0].status).toBe(taskStatuses.New);

})

test('status specified task should be changed', () => {
    const action = updateTasksAC('todolistID2', {
        title: 'Work',
        status: taskStatuses.New,
        priority: taskPriority.Low,
        startDate: '',
        deadline: '',
        description: ''
       }, '2')

    const endState = taskReducer(startTasksState, action)

    expect(endState['todolistID2'][1].status).toBe(taskStatuses.New);
    expect(endState['todolistID2'][1].id).toBe('2');
    expect(endState['todolistID1'][1].status).toBe(taskStatuses.Completed);

})

test('title for task should be changed', () => {
    const action = updateTasksAC('todolistID1', { title: 'Run',
        status: taskStatuses.New,
        priority: taskPriority.Low,
        startDate: '',
        deadline: '',
        description: ''}, '1')

    const endState = taskReducer(startTasksState, action)

    expect(endState['todolistID1'][0].title).toBe('Run');
    expect(startTasksState['todolistID1'][0].title).toBe('Rest');
    expect(endState['todolistID1'][0].id).toBe('1');
    expect(endState['todolistID2'][0].title).toBe('Rest Hard');

})

test('new array should be added when new todoList be added', () => {

    const action = addTodolistAC(
        {
            id: 'todolistID3',
            title: 'Rest',
            order: 0,
            addedDate: '',

        },)

    const endState = taskReducer(startTasksState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != 'todolistID1' && k != 'todolistID2');
    if (!newKey) {
        throw Error('new key should be added')
    }


    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
})

test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC('todolistID2')

    const endState = taskReducer(startTasksState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistID2']).not.toBeDefined();
})

