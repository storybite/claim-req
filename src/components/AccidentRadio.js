import {useState} from "react"


const AccidentRadio = (props) => {

    
    const [isDisease, setIsDisease] = useState(true)

    const radioHandler = (evt) => {
        alert(evt.target.value)
        setIsDisease(evt.target.value == 'disease')
    }


    return (
        <>
            <label htmlFor="disease">질병</label>
            <input id="disease" type="radio" name="accidentRadio" value="disease" checked={isDisease} onChange={radioHandler} />
            <label htmlFor="disaster">재해</label>
            <input id="disaster" type="radio" name="accidentRadio" value="disaster" checked={!isDisease} onChange={radioHandler}/>        
        </>
    )

}

export default AccidentRadio;