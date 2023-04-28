import React from "react";
import styles from "./Textarea.module.css";

const Input = (props) => {
    let defaultStyle = styles.textarea;

    if (props.className != null) {
        defaultStyle = props.className;
    }

    return (
        <span>
            <textarea
                className={defaultStyle}                
                style={{...props.style}}
                {...props.dict}
            />
        </span>
    );
};

export default Input;
