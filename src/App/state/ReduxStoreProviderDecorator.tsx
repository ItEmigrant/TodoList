import React from 'react';
import {Provider} from "react-redux";
import {combineReducers, legacy_createStore} from "redux";
import {taskReducer} from "../../BLL/Reducers/tasks-reducer";
import {todolistReducer} from "../../BLL/Reducers/todolist-reducer";
import {v1} from "uuid";
import {AppRootStateType} from "./store";
import {taskPriority, taskStatuses} from "../../api/tasksApi/tasksApi";
import {appReducer} from "../../BLL/Reducers/app-reducer";


const rootReducer = combineReducers({
    tasks: taskReducer,
    todoLists: todolistReducer,
    app: appReducer
})


const initialGlobalState: AppRootStateType = {
    auth: {
        isLoggedIn: false
    },
    app: {
        status: 'loading',
        error: null
    },
    todoLists: [
        {
            id: 'todolistId1', title: 'What to learn', addedDate: '',
            order: 0, filter: 'All', entityStatus: 'idle'
        }
        , {
            id: 'todolistId2', title: 'What to buy', addedDate: '',
            order: 0, filter: 'All', entityStatus: 'idle'
        }
    ],
    tasks: {
        ['todolistId1']: [
            {
                id: v1(),
                todoListId: 'todolistId1',
                title: 'JS',
                status: taskStatuses.New,
                priority: taskPriority.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: '',
                description: ''
            },
            {
                id: v1(),
                todoListId: 'todolistId1',
                title: 'React',
                status: taskStatuses.Completed,
                priority: taskPriority.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: '',
                description: ''
            }
        ],
        ['todolistId2']: [
            {
                id: v1(),
                todoListId: 'todolistId2',
                title: 'Milk',
                status: taskStatuses.New,
                priority: taskPriority.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: '',
                description: ''
            },
            {
                id: v1(),
                todoListId: 'todolistId2',
                title: 'Water',
                status: taskStatuses.Completed,
                priority: taskPriority.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: '',
                description: ''
            }
        ]
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
};

