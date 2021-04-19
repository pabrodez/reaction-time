import * as React from 'react'
import styles from './Circle.module.css';

import { GlobalContext } from '../context/GlobalState'

export const Circle = () => {
    const { onCircleClick, isGreen } = React.useContext(GlobalContext)

    return (
        <section
            className={styles.Circle}
            style={{ backgroundColor: isGreen ? 'green' : 'transparent'}}
            onClick={() => onCircleClick()}
        ></section>
    )
}