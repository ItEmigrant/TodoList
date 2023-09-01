import {setErrorAC, setStatusAC} from "../BLL/Reducers/app-reducer";
import {Dispatch} from "redux";
import {AppActionTypes} from "../App/state/store";
import {ResponseType} from "../api/todolistsApi/todoListApi";
import {commonResponseTaskType} from "../api/tasksApi/tasksApi";


export const handleServerNetworkError = ((dispatch: ErrorUtilsDispatchType, error: string) => {
    dispatch(setStatusAC('failed'))
    dispatch(setErrorAC(error))
})

export const handleServerAppError = <T>(dispatch: ErrorUtilsDispatchType, data: ResponseType<T> | commonResponseTaskType) => {
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC('Some Error'))
    }
    dispatch(setStatusAC('idle'))
}

//types
export type ErrorUtilsDispatchType = Dispatch<AppActionTypes>