import {useState} from "react"

const Hospital = (props) => {

    const [hospital, setHospital] = useState(null)

    const inputHandler = (evt) => {
        setHospital(evt.target.value);
        alert(evt.target.value)
        evt.target.blur();
    }

    const onBlurHandler = (evt) => {
        console.log("onBlurHandler")
    }

    return (
        <>
            <label>병원
                <input type="text" name="hospital" value={hospital} onFocus={inputHandler} onBlur={onBlurHandler}/>
            </label>
        </>
    )

}

export default Hospital;