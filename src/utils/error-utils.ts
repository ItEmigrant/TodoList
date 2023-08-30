import {setErrorAC, setStatusAC} from "../BLL/Reducers/app-reducer";
import {Dispatch} from "redux";

import {AppActionTypes} from "../App/state/store";


export const handleServerNetworkError = ((dispatch: ErrorUtilsDispatchType, error: { message: string }) => {
    dispatch(setStatusAC('failed'))
    dispatch(setErrorAC(error.message))
})

//types
export type ErrorUtilsDispatchType = Dispatch<AppActionTypes>