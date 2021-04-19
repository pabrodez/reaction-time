import * as React from 'react'
import styles from './Result.module.css'

import { GlobalContext } from '../context/GlobalState'

export const Result = () => {
    const { isFail, average, startRound } = React.useContext(GlobalContext)

    return (

        <section className={styles.Result}>
            <p>
                {isFail ?
                    "You clicked too soon"
                    : `You achieved an average of ${average}ms`
                }
            </p>

            <button onClick={() => { startRound() }}>New round</button>
        </section>
    )
}