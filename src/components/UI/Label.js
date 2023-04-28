
import styles from "./Label.module.css"

const Label = (props) => {

    let defaultStyle =  styles.label;

    if(props.className !=null) {
        defaultStyle = props.className;
    }


    return (
        <>
            <label className={defaultStyle} htmlFor={props.htmlFor} style={props.style}>{props.children}</label>
        </>
    )
}

export default Label;