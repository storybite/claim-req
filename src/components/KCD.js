import {useState} from "react"

const KCD = (props) => {

    const [kcd, setKcd] = useState("")

    const inputHandler = (evt) => {
        setKcd(evt.target.value);
    }

    return (
        <>
            <input id="kcd" type="text" name="dsasName" value={kcd} onChange={inputHandler}/>
        </>
    )

}

export default KCD;