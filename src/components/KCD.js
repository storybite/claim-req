import styles from "./KCD.module.css"
import {useState} from "react"
import DsasName from "./DsasName"
import Label from "./UI/Label"
import Input from "./UI/Input"

const KCD = (props) => {

    const [kcd, setKcd] = useState("")

    const inputHandler = (evt) => {
        setKcd(evt.target.value);
    }

    return (
        <>            
            <Input className={styles.kcdInput} dict={{id:"kcd", type:"text", name:"kcd", value:kcd, onChange:inputHandler}}/>
        </>
    )

}

export default KCD;