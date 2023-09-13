import {Dispatch} from 'redux'
import {setErrorACType, setInitAC, setInitACType, setStatusAC, setStatusACType} from "./app-reducer";
import {FormValuesType} from "../../features/Login/Login";
import {auth} from "../../api/loginApi/loginApi";
import {ResultCode} from "../../api/todolistsApi/todoListApi";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";


const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: FormValuesType) => async (dispatch: Dispatch<AuthActionsType>) => {
    dispatch(setStatusAC('loading'));
    try {
        const res = await auth.postLogin(data);
        if (res.data.resultCode === ResultCode.success) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setStatusAC("succeeded"));
        } else {
            handleServerAppError(dispatch, res.data);
        }
    } catch (err) {
        handleServerNetworkError(dispatch, (err as { message: string }).message)
    }
}
export const meTC = () => async (dispatch: Dispatch<AuthActionsType>) => {
    dispatch(setStatusAC('loading'));
    try {
        const res = await auth.getMe();
        if (res.data.resultCode === ResultCode.success) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setStatusAC("succeeded"));
        } else {
            handleServerAppError(dispatch, res.data);
        }
    } catch (err) {
        handleServerNetworkError(dispatch, (err as { message: string }).message)
    }
    finally {
        dispatch(setInitAC(true))
    }
}


// types
export type AuthActionsType = ReturnType<typeof setIsLoggedInAC> | setStatusACType | setErrorACType |setInitACType