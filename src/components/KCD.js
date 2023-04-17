import styles from "./KCD.module.css";
import { useEffect, useState } from "react";
import DsasName from "./DsasName";
import Label from "./UI/Label";
import Input from "./UI/Input";

const debounce = (func, wait) => {
    let timeout;

    return function (...args) {
        const context = this;

        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
};

const KCD = (props) => {
    const [kcd, setKcd] = useState("");

    console.log("kcd key " + props.itemIndex);

    useEffect(() => {
        setKcd(props.data);
    }, []);

    const inputHandler = (evt) => { //keyInHandler로 이름 변경
        evt.target.value = evt.target.value.toUpperCase();
        setKcd(evt.target.value);
    };

    const blurHandler = (evt) => {        
        console.log("BLUR HANDLER " + evt.target.value) 
        props.onUpdateKcdData({
            kcd: evt.target.value,
            itemIndex: props.itemIndex,
        });
    };

    return (
        <>
            <Input
                className={styles.kcdInput}
                dict={{
                    id: "kcd",
                    type: "text",
                    name: "kcd",
                    value: kcd,
                    onChange: inputHandler,
                    onBlur: blurHandler,
                }}
            />
        </>
    );
};

export default KCD;
