import React from "react"
import Label from "../UI/Label";
import Input from "../UI/Input";
import { useState, useEffect } from "react";

const AccidentDetails = (props) => {

    const [accidentDetails, setAccidentDetails] = useState("");
    const NAME = "accidentDetails";

    useEffect(() => {
        setAccidentDetails(props.data);
    }, [props.data]);

    const inputHandler = (evt) => {
        setAccidentDetails(evt.target.value);
    };

    const blurHandler = (evt) => {
        props.onUpdateReqData({ accidentDetails: evt.target.value });
    };

    return (
        <>

            <Label htmlFor={NAME}>사고경위</Label>
            <div style={{margin:"0.5rem"}}>
                <textarea cols="118" rows="3"
                    onChange={inputHandler}
                    onBlur={blurHandler}
                    value={accidentDetails}
                />
            </div>
            
            
        </>
    )

}

export default AccidentDetails;