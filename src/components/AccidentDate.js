import {useState} from "react"

const AccidentDate = (props) => {

    const [accidntDate, setAccidentDate] = useState("")

    const inputHandler = (evt) => {
        setAccidentDate(evt.target.value);
    }

    return (
        <>
            <label htmlFor="accidntDate">사고난 날짜</label>
            <input id="accidntDate" type="date" name="accientDate" value={accidntDate} onChange={inputHandler}/>
        </>
    )

}

export default AccidentDate;