import {useState} from "react"
import Label from "../UI/Label"
import classes from "./DmndResnBox.module.css"

const DmndResnBox = (props) => {

    const [isChecked, setIsChecked] = useState("")

    const inputHandler = (evt) => {        
        setIsChecked(evt.target.checked);
    }

    return (
        <>
            <Label id={props.title}>{props.title}</Label>
            <input className={classes.input} id={props.title} type="checkbox" name={props.name}  onChange={inputHandler} checked={isChecked}/>
        </>
    )

}

export default DmndResnBox;