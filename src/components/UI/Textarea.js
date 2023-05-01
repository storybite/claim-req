import React from "react";
import styles from "./Textarea.module.css";

const Textarea = (props) => {
    let defaultStyle = styles.textarea;

    if (props.className != null) {
        defaultStyle = props.className;
    }

    return (
        
            <textarea
                className={defaultStyle}                
                style={{...props.style}}
                {...props.dict}
            />
        
    );
};

export default Textarea;
