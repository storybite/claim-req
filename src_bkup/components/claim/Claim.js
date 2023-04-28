import AccidentRadio from "../accident/AccidentRadio";
import DsasName from "../accident/DsasName";
import KCDCt from "../kcd/KCDCt";
import AccidentDate from "../accident/AccidentDate";
import ClaimResnContainer from "../claimResn/ClaimResnCt";
import Hospital from "../hospital/Hospital";
import { useEffect, useState, useReducer, useCallback } from "react";
import Button from "../UI/Button";
import styles from "../UI/Button.module.css";
import { deleteData, postData, putData } from "../../module/fetch";
import Account from "../account/Account";
import Insured from "../cust/Insured";

function formatDate(date) {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
}

const initData = {
    id: null,
    no: 0,
    accidentKind: "disease",
    custName: "",
    accidentDate: formatDate(new Date()),
    dsasName: "",
    kcd: ["", "", "", ""],
    hospitalName: "",
    claimResn: { tong: false, hosp: false, oper: false, dead: false },
    accountId : "",
    accidentDetails : "",
    result: "",
};

const Claim = (props) => {
    const reducer = (prev, action) => {
        console.log("reducer prev.kcd " + prev.kcd + ", action.propApplied " + action.propApplied);
        if (action.propApplied) {
            return props.formData == null
                ? { ...initData, no: props.onMaxNo() + 1 }
                : { ...props.formData };
        } else {
            return { ...prev, ...action.entry };
        }
    };

    const [formData, dispatch] = useReducer(reducer, initData);

    useEffect(() => {
        console.log("useEffect befo");
        dispatch({ propApplied: true, formData: props.formData });
        console.log("useEffect aftr");
    }, [props.formData, props.formCount]);

    const updateReqDataHandler = useCallback((dict) => {
        console.log("updateReqaDataHandler dict==> befo ", dict);
        const [key, val] = Object.entries(dict)[0];
        dispatch({ propApplied: false, entry: { [key]: val } });
        console.log("updateReqaDataHandler dict==> aftr ", dict);
    }, []);

    console.log("befo return formData.kcd: " + formData.kcd);
   
    return (
        <form>
        
                <KCDCt
                    data={formData.kcd}
                    onUpdateReqData={updateReqDataHandler}
                />
        </form>
    );
};

export default Claim;
