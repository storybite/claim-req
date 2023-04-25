import React from "react"
import styles from "./Panel.module.css"

const Panel = (props) => {
    
    const className = props.className ? props.className : styles.layout

    return (
        <div className={className}>
            {props.children}
        </div>
    )
}

export default Panel;
