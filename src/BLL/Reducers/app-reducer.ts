export type RequestStatusType = 'idle' | 'succeeded' | 'failed' | 'loading'

const InitialState = {
    status: 'loading' as RequestStatusType
}

type InitialStateType = typeof InitialState
export const appReducer = (state: InitialStateType = InitialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {
                ...state, status: action.status
            }
        default:
            return state
    }

}
type ActionType = any