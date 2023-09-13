export type RequestStatusType = 'idle' | 'succeeded' | 'failed' | 'loading' | 'imLoading'

const InitialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false

}

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
        case 'APP-SET-INIT':
            return {
                ...state, isInitialized: action.isInitialized
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

export const setInitAC = (isInitialized: boolean) => ({
    type: 'APP-SET-INIT',
    isInitialized
}) as const

//types
export type setStatusACType = ReturnType<typeof setStatusAC>
export type setErrorACType = ReturnType<typeof setErrorAC>
export type InitialStateType = typeof InitialState
export type setInitACType = ReturnType<typeof setInitAC>

type CommonActionType = setStatusACType | setErrorACType | setInitACType;