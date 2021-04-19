export function globalReducer(state, action) {

    switch (action.type) {

        case 'SET_GREEN': {
            return { ...state, isGreen: action.payload }
        }

        case 'SET_FAIL': {
            return { ...state, isFail: action.payload }
        }

        case 'SET_START': {
            return { ...state, startTime: action.payload }
        }

        case 'SET_ATTEMPTS': {
            return { ...state, attempts: action.payload }
        }

        case 'SET_AVG': {
            return { ...state, average: action.payload }
        }

        case 'SET_ROUNDOVER': {
            return { ...state, isRoundOver: action.payload }
        }

        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }

    }

}