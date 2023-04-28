import AccidentRadio from "../accident/AccidentRadio";
import DsasName from "../accident/DsasName";
import KCDCt from "../kcd/KCDCt";
import AccidentDate from "../accident/AccidentDate";
import ClaimResnCt from "../claimResn/ClaimResnCt";
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
    stopCascading : false
};

const Claim = (props) => {
    const reducer = (prev, action) => {
        // console.log("reducer prev.kcd " + prev.kcd + ", action.propApplied " + action.propApplied);
        let stopCascading = action.stopCascading == null ? false : action.stopCascading ;
        if (action.propApplied) {
            return props.formData == null
                ? { ...initData, no: props.onMaxNo() + 1, stopCascading: stopCascading}
                : { ...props.formData, stopCascading: stopCascading} ;
        } else {
            return { ...prev, ...action.entry};
        }
    };

    const [formData, dispatch] = useReducer(reducer, initData);

    useEffect(() => {
        console.log("useEffect befo");
        dispatch({ propApplied: true, formData: props.formData });
        console.log("useEffect aftr");
    //}, [props.formData, props.formCount]);
    }, [props.formData]);

    const updateReqDataHandler = useCallback((dict) => {
        console.log("updateReqaDataHandler dict==> befo ", dict);
        const [key, val] = Object.entries(dict)[0];
        dispatch({ propApplied: false, entry: { [key]: val }});
        console.log("updateReqaDataHandler dict==> aftr ", dict);
    }, []);

    const updateKcdHandler = useCallback((dict) => {
        console.log("updateKcdHandler dict==> befo ", dict);
        dispatch({ propApplied: false, entry: {...dict}});
        console.log("updateKcdHandler dict==> aftr ", dict);
    }, []);

    const submitHandler = async (evt) => {
        evt.preventDefault();
        if (formData.id === null) {
            formData.id = await postData(formData);
            updateReqDataHandler({ id: formData.id });
        }
        await putData(formData, formData.id);

        alert("db 저장 성공!!");
        props.onFetchData();
    };

    const deleteHandler = async (evt) => {
        if (formData.id == null) {
            alert("저장되지 않은 건입니다.");
            return;
        }
        await deleteData(formData.id);
        props.onFormDataHandler(null);
        alert("삭제 성공!!");
        props.onFetchData();
    };

    const clearHandler = (evt) => {
        props.onFormDataHandler(null);
    };

    console.log("befo return formData: " + formData);

    //console.log("befo return formData.kcd: " + formData.kcd);
    let content = ( 
        <form>
            <hr />
            <Insured
                data={formData.custName}
                onUpdateReqData={updateReqDataHandler}
            />
            <hr />
            <AccidentRadio
                data={formData.accidentKind}
                onUpdateReqData={updateReqDataHandler}
            />
            <hr />
            <div>
                <AccidentDate
                    data={formData.accidentDate}
                    onUpdateReqData={updateReqDataHandler}
                />
                <DsasName
                    data={formData.dsasName}
                    onUpdateReqData={updateReqDataHandler}
                />
                <KCDCt
                    data={formData.kcd}
                    stopCascading={formData.stopCascading}
                    onUpdateReqData={updateKcdHandler}
                />
            </div>
            <hr />
            <ClaimResnCt
                data={formData.claimResn}
                onUpdateReqData={updateReqDataHandler}
            />
            <Hospital
                data={formData.hospitalName}
                onUpdateReqData={updateReqDataHandler}
            />
            <hr />
            <div>
                <Account 
                    data={formData.accountId}
                    onUpdateReqData={updateReqDataHandler}
                />
            </div>
            <hr />
            <div style={{ border: "0px solid black", textAlign: "center" }}>
                <Button className={styles.inlineBlock} onClick={submitHandler}>
                    신청하기
                </Button>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <Button
                    className={styles.inlineBlock}
                    type="button"
                    onClick={clearHandler}
                >
                    Clear
                </Button>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <Button
                    className={styles.inlineBlock}
                    type="button"
                    onClick={deleteHandler}
                >
                    삭제
                </Button>
            </div>
        </form>
    )

    //return formData.no > 0 && content;
    return content;
};

export default Claim;
