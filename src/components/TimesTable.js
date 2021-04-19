import * as React from 'react'
import styles from './TimesTable.module.css'
import { GlobalContext } from '../context/GlobalState'

export function TimesTable() {
    const {
        attempts, isRoundOver
    } = React.useContext(GlobalContext)

    return (
        <aside className={styles.TimesTable}>
            {
                <table>
                    <tbody>
                        {
                            attempts.map((a, i) => (
                                <tr key={i}>
                                    <td>Attempt {i + 1}</td>
                                    <td>{a}ms</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            }
        </aside>
    )

}