import { createContext, useReducer } from "react";
import { globalReducer } from './reducer'

const initialState = {
    isGreen: false,
    isFail: false,
    startTime: 0,
    attempts: [],
    average: 0,
    isRoundOver: false,
}
// utils
const generateRandom = (min, max) => Math.round(Math.random() * (max - min) + min);
const getAvg = (times) => times.reduce((a, b) => a + b) / times.length;

export const GlobalContext = createContext(initialState)

export function GlobalProvider({ children }) {

    const [state, dispatch] = useReducer(globalReducer, initialState)
    // we'll use timer to allow cancelling timeouts
    let timer;
    // actions
    const setStartTimeout = () => {
        const randomTime = generateRandom(1_000, 2_000)
        timer = setTimeout(() => {
            dispatch({ type: 'SET_GREEN', payload: true })
            dispatch({ type: 'SET_START', payload: Date.now() })
        }, randomTime)
    }

    const onCircleClick = () => {
        // what determines that the click is too soon is the fact the state is green
        // we check if round is over to avoid setting another timeout
        if (!state.isRoundOver) {

            if (state.isGreen) {
                const now = Date.now()
                // because it could be negative, we could use it to know if the click 
                // occurred before the circle was green
                const reactionTime = now - state.startTime
                dispatch({ type: 'SET_ATTEMPTS', payload: [...state.attempts, reactionTime] })
                dispatch({ type: 'SET_GREEN', payload: false })
                setStartTimeout()
                // reach the maximum number of valid attempts
                if (state.attempts.length === 4) {
                    clearTimeout(timer)
                    const avg = getAvg(state.attempts)
                    dispatch({ type: 'SET_AVG', payload: avg })
                    dispatch({ type: 'SET_ROUNDOVER', payload: true })
                }

            } else {
                clearTimeout(timer)
                dispatch({ type: 'SET_FAIL', payload: true })
                dispatch({ type: 'SET_ROUNDOVER', payload: true })
                dispatch({ type: 'SET_GREEN', payload: false })
            }
        }
    }

    const startRound = () => {
        resetState()
        setStartTimeout()
    }

    const resetState = () => {
        dispatch({ type: 'SET_GREEN', payload: false })
        dispatch({ type: 'SET_FAIL', payload: false })
        dispatch({ type: 'SET_START', payload: 0 })
        dispatch({ type: 'SET_ATTEMPTS', payload: [] })
        dispatch({ type: 'SET_AVG', payload: 0 })
        dispatch({ type: 'SET_ROUNDOVER', payload: false })
    }

    return (
        <GlobalContext.Provider
            value={{
                isGreen: state.isGreen,
                isRoundOver: state.isRoundOver,
                isFail: state.isFail,
                attempts: state.attempts,
                average: state.average,

                startRound,
                onCircleClick
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}