import React from "react"
import styles from "./Panel.module.css" 

const Panel = (props) => {
    
    let className = props.className ? props.className : styles.layout

    if(props.type=="line") {
        className = styles.line
    } else if(props.type=="box1") {
        className = styles.box1
    } else if(props.type=="box2") {
        className = styles.box2
    }

    return (
        <div className={className} style={props.style}>
            {props.children}
        </div>
    )
}

export default Panel;
