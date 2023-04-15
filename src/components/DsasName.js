import {useState} from "react"

const DsasName = (props) => {

    const [dsasName, setDsasName] = useState("")

    const inputHandler = (evt) => {
        setDsasName(evt.target.value);
    }

    return (
        <>
            <label htmlFor="dsasName">병명</label>
            <input id="dsasName" type="text" name="dsasName" value={dsasName} onChange={inputHandler}/>
        </>
    )

}

export default DsasName;