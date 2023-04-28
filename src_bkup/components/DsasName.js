import { useEffect, useState, memo } from "react";
import Label from "./UI/Label";
import Input from "./UI/Input";

const DsasName = (props) => {
    const [dsasName, setDsasName] = useState("");
    const NAME = "dsasName";

    useEffect(() => {
        setDsasName(props.data);
    }, [props.data]);

    const inputHandler = (evt) => {
        setDsasName(evt.target.value);
    };

    const blurHandler = (evt) => {
        props.onUpdateReqData({ dsasName: evt.target.value });
    };

    return (
        <>
            <Label htmlFor={NAME}>병명</Label>
            <Input
                dict={{
                    id: NAME,
                    type: "text",
                    name: NAME,
                    value: dsasName,
                    onChange: inputHandler,
                    onBlur: blurHandler,
                }}
            />
        </>
    );
};

export default memo(DsasName);
