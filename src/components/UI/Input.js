import React from "react"
import styles from "./Input.module.css"

const Input = (props) => {

    let defaultStyle =  styles.input;

    if(props.className !=null) {
        defaultStyle = props.className;
    }

    return (
        <span>
            <input  className={defaultStyle} {...props.dict}/>
        </span>
    )

}

export default Input;