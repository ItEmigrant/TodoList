import React from 'react';
import {Provider} from "react-redux";
import {combineReducers, legacy_createStore} from "redux";
import {taskReducer} from "../Reducers/tasks-reducer";
import {todolistReducer} from "../Reducers/todolist-reducer";
import {v1} from "uuid";
import {AppRootStateType} from "./store";


const rootReducer = combineReducers({
    tasks: taskReducer,
    todoLists: todolistReducer
})


const initialGlobalState = {
    todoLists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'All'},
        {id: 'todolistId2', title: 'What to buy', filter: 'All'}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&CSS', isDone: false},
            {id: v1(), title: 'JS', isDone: true}
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'React Book', isDone: true}
        ]
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
};

