import classes from "./AccidentDate.module.css"
import {useState} from "react"
import Label from "./UI/Label"
import Input from "./UI/Input"

const AccidentDate = (props) => {

    const [accidentDate, setAccidentDate] = useState("")
    const NAME = "accidentDate"

    const inputHandler = (evt) => {
        setAccidentDate(evt.target.value);
    }

    return (
        <>
            <Label htmlFor="accidntDate">사고난 날짜</Label>
            <Input dict={{id:NAME, type:"date", name:NAME, value:accidentDate, onChange:inputHandler}}/>
        </>
    )

}

export default AccidentDate;