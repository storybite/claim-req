import {useState} from "react"
import Label from "../UI/Label"

const DmndResnBox = (props) => {

    const [isChecked, setIsChecked] = useState("")

    const inputHandler = (evt) => {        
        setIsChecked(evt.target.checked);
    }

    return (
        <>
            <Label id={props.title} title={props.title}/>
            <input id={props.title} type="checkbox" name={props.name}  onChange={inputHandler} checked={isChecked}/>
        </>
    )

}

export default DmndResnBox;