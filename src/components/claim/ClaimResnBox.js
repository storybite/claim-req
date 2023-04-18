import { useState } from "react";
import Label from "../UI/Label";
import classes from "./ClaimResnBox.module.css";

const engName = {통원:"tong", 입원:"hosp", 수술:"oper", 사망:"dead"}

const ClaimResnBox = (props) => {
    const [isChecked, setIsChecked] = useState(props.isChecked);

    const inputHandler = (evt) => {
        setIsChecked(evt.target.checked);
        props.onClick({[engName[props.title]] : evt.target.checked})
    };

    return (
        <>
            <Label htmlFor={props.title}>{props.title}</Label>
            <input
                className={classes.input}
                id={props.title}
                type="checkbox"
                name={props.name}
                onChange={inputHandler}
                checked={isChecked}
            />
        </>
    );
};

export default ClaimResnBox;
