import {useEffect, useState} from "react"
import Label from "./UI/Label"
import Input from "./UI/Input"
const DsasName = (props) => {

    const [dsasName, setDsasName] = useState("")
    const NAME = "dsasName"

    useEffect(()=>{
        setDsasName(props.data)
    },[])

    const inputHandler = (evt) => {
        setDsasName(evt.target.value);
        props.onUpdateReqData({dsasName: evt.target.value})
    }

    return (
        <>
            <Label htmlFor={NAME}>병명</Label>
            <Input dict={{id:NAME, type:"text", name:NAME, value:dsasName, onChange:inputHandler}}/>
        </>
    )

}

export default DsasName;