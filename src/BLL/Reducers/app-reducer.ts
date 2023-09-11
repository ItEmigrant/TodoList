export type RequestStatusType = 'idle' | 'succeeded' | 'failed' | 'loading' | 'imLoading'

const InitialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string

}
export type setStatusACType = ReturnType<typeof setStatusAC>
export type setErrorACType = ReturnType<typeof setErrorAC>
export type InitialStateType = typeof InitialState
export const appReducer = (state: InitialStateType = InitialState, action: CommonActionType): InitialStateType => {
    switch (action.type) {
        case 'APP-SET-STATUS':
            return {
                ...state, status: action.status
            }
        case 'APP-SET-ERROR':
            return {
                ...state, error: action.error
            }
        default:
            return state
    }

}

export const setStatusAC = (status: RequestStatusType) => ({
    type: 'APP-SET-STATUS',
    status
}) as const

export const setErrorAC = (error: null | string) => ({
    type: 'APP-SET-ERROR',
    error
}) as const

type CommonActionType = setStatusACType | setErrorACType;