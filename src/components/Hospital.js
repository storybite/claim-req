import classes from "./Hospital.module.css"
import {useState} from "react"
import Label from "./UI/Label"
import Input from "./UI/Input"


const Hospital = (props) => {

    const [hospital, setHospital] = useState(null)
    const NAME = "hospital"

    const inputHandler = (evt) => {
        setHospital(evt.target.value);
    }

    const onBlurHandler = (evt) => {
        console.log("onBlurHandler")
    }

    return (
        <>
            <Label htmlFor={hospital}>병원정보</Label>
            <Input dict={{id:NAME, type:"text", name:NAME, value:hospital, onChange:inputHandler}}/>
            
        </>
    )

}

export default Hospital;