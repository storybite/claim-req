import {useEffect, useState} from "react"
import styles from "./AccidentRadio.module.css"
import Label from "./UI/Label"
import Input from "./UI/Input"

const AccidentRadio = (props) => { 

    const [isDisease, setIsDisease] = useState(false);

    useEffect(()=>{
        setIsDisease(props.data == "disease")
    }, [props.data])

    const radioHandler = (evt) => {
        setIsDisease(evt.target.value == 'disease')
        props.onUpdateReqData({accidentKind : evt.target.value})
    }

    return (
        <>
            <Label>사고의 종류</Label>
            <span className={styles.radioGroup}>
                <Label htmlFor="disease">질병</Label>
                <Input dict={{id:"disease", type:"radio", name:"disease", value:"disease", checked:isDisease, onChange:radioHandler}}/>
                <Label htmlFor="disaster">재해</Label>
                <Input dict={{id:"disaster", type:"radio", name:"disaster", value:"disaster", checked:!isDisease, onChange:radioHandler}}/>
            </span>
        </>
    )

}

export default AccidentRadio;