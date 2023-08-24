export type RequestStatusType = 'idle' | 'succeeded' | 'failed' | 'loading'

const InitialState = {
    status: 'loading' as RequestStatusType
}
export type setStatusACType = ReturnType<typeof setStatusAC>

export type InitialStateType = typeof InitialState
export const appReducer = (state: InitialStateType = InitialState, action: CommonActionType): InitialStateType => {
    switch (action.type) {
        case 'APP-SET-STATUS':
            return {
                ...state, status: action.status
            }
        default:
            return state
    }

}

export const setStatusAC = (status: RequestStatusType) => ({
    type: 'APP-SET-STATUS',
    status
}) as const

type CommonActionType = setStatusACType;