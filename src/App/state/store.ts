import {AnyAction, applyMiddleware, combineReducers, compose, legacy_createStore} from 'redux'
import {taskReducer, TaskToActionType} from "../../BLL/Reducers/tasks-reducer";
import {todolistReducer, TodolistReducerActionType} from "../../BLL/Reducers/todolist-reducer";
import thunk, {ThunkDispatch} from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "../../BLL/Reducers/app-reducer";
import {AuthActionsType, authReducer} from "../../BLL/Reducers/authReducer";


declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: taskReducer,
    todoLists: todolistReducer,
    app: appReducer,
    auth: authReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// непосредственно создаём store

export const store = legacy_createStore(rootReducer,  /*composeEnhancers(), */applyMiddleware(thunk))

// определить автоматически тип всего объекта состояния

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppActionTypes = TodolistReducerActionType | TaskToActionType | AuthActionsType

export type AppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;

