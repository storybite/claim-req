import React from "react";
import styles from "./Input.module.css";

const Input = (props) => {
    let defaultStyle = styles.input;

    if (props.className != null) {
        defaultStyle = props.className;
    }

    return (
        <span>
            <input
                className={defaultStyle}
                //style={inputStyle}
                style={{...props.style}}
                {...props.dict}
            />
        </span>
    );
};

export default Input;
