import {useEffect, useState, memo} from "react"

import Label from "../UI/Label";
import Input from "../UI/Input";

const formatDate = (vDate) => {
    const formattedDate = `${vDate.getFullYear()}-${(vDate.getMonth() + 1).toString().padStart(2, "0")}-${vDate.getDate().toString().padStart(2, "0")}`;
    return formattedDate;
}

const NAME = "accidentDate"
let callCnt=0;

const AccidentDate = (props) => {

    console.log(NAME + ">: callCnt " + callCnt++)
    console.log(NAME + ">: props.data " + props.data)

    const [accidentDate, setAccidentDate] = useState("")

    useEffect(()=>{
        console.log("accidntDate useEffect> ", accidentDate)
        setAccidentDate(props.data)
    },[props.data])

    const inputHandler = (evt) => {
        setAccidentDate(evt.target.value);
        props.onUpdateReqData({accidentDate: evt.target.value})
    }

    return (
        <>
            <Label htmlFor="accidntDate">사고난 날짜</Label>
            <Input dict={{id:NAME, type:"date", name:NAME, value:accidentDate, onChange:inputHandler}}/>
        </>
    )

}

export default memo(AccidentDate);