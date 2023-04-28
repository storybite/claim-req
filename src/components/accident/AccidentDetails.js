import React from "react"
import Label from "../UI/Label";

import { useState, useEffect } from "react";
import Panel from "../UI/Panel";
import Textarea from "../UI/Textarea";

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
            <Panel>
                <Label htmlFor={NAME} style={{width:"5.3rem"}}>사고난 경위</Label>
                <Textarea
                    style={{margin:"0.2rem"}}
                    dict={{
                        cols:"103",
                        rows: "3",
                        onChange: inputHandler,
                        onBlur: blurHandler,
                        value: accidentDetails
                    }}
                />
            </Panel>
        </>
    )

}

export default AccidentDetails;