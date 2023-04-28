import React from "react";
import Label from "./UI/Label";
import Input from "./UI/Input";
import { useState, useEffect, memo } from "react";

const ClaimCust = (props) => {
    const [custName, setCustName] = useState("");
    const NAME = "custName";

    useEffect(() => {
        setCustName(props.data);
    }, [props.data]);

    const inputHandler = (evt) => {
        setCustName(evt.target.value);
    };

    const blurHandler = (evt) => {
        props.onUpdateReqData({ custName: evt.target.value });
    };

    return (
        <>
            <Label htmlFor={NAME}>사고자 이름</Label>
            <Input
                dict={{
                    id: NAME,
                    type: "text",
                    name: NAME,
                    value: custName,
                    onChange: inputHandler,
                    onBlur: blurHandler,
                }}
            />
        </>
    );
};

export default memo(ClaimCust);
