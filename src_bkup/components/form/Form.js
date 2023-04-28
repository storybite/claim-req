import AccidentRadio from "../AccidentRadio";
import DsasName from "../DsasName";
import KCDContainer from "../kcd/KCDContainer";
import AccidentDate from "../AccidentDate";
import ClaimResnContainer from "../claim/ClaimResnContainer";
import Hospital from "../hosp/Hospital";
import { useEffect, useState, useReducer, useCallback } from "react";
import Button from "../UI/Button";
import styles from "../UI/Button.module.css";
import { deleteData, postData, putData } from "../../module/fetch";
import ClaimCust from "../ClaimCust";
import Account from "../account/Account";

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
    result: "",
};

const Form = (props) => {
    const reducer = (prev, action) => {
        if (action.propApplied) {
            return props.formData == null
                ? { ...initData, no: props.onMaxNo() + 1 }
                : props.formData;
        } else {
            return { ...prev, ...action.entry };
        }
    };

    const [formData, dispatch] = useReducer(reducer, initData);

    useEffect(() => {
        dispatch({ propApplied: true, formData: props.formData });
    }, [props.formData, props.formCount]);

    const updateReqDataHandler = useCallback((dict) => {
        console.log("updateReqaDataHandler dict==> ", dict);
        const [key, val] = Object.entries(dict)[0];
        dispatch({ propApplied: false, entry: { [key]: val } });
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

    return (
        <form>
            <hr />
            <ClaimCust
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
                <KCDContainer
                    data={formData.kcd}
                    onUpdateReqData={updateReqDataHandler}
                />
            </div>
            <hr />
            <ClaimResnContainer
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
    );
};

export default Form;
