import styles from "./Claim.module.css"
import AccidentRadio from "../accident/AccidentRadio";
import DsasName from "../accident/DsasName";
import KCDCt from "../kcd/KCDCt";
import AccidentDate from "../accident/AccidentDate";
import ClaimResnCt from "../claimResn/ClaimResnCt";
import AccidentDetails from "../accident/AccidentDetails";
import Hospital from "../hospital/Hospital";
import { useEffect, useState, useReducer, useCallback } from "react";
import Button from "../UI/Button";
import buttonStyles from "../UI/Button.module.css";
import { deleteData, postData, putData } from "../../module/fetch";
import Account from "../account/Account";
import Insured from "../cust/Insured";
import Panel from "../UI/Panel";
import Label from "../UI/Label";

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
            return props.claimData == null
                ? { ...initData, no: props.onMaxNo() + 1, stopCascading: stopCascading}
                : { ...props.claimData, stopCascading: stopCascading} ;
        } else {
            return { ...prev, ...action.entry};
        }
    };

    const [claimData, dispatch] = useReducer(reducer, initData);

    useEffect(() => {
        console.log("useEffect befo");
        dispatch({ propApplied: true, formData: props.claimData });
        console.log("useEffect aftr");
    //}, [props.claimData, props.formCount]);
    }, [props.claimData]);

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
        props.onSaveData({...claimData})       
        alert("성공적으로 저장되었습니다.") 
    };

    const deleteHandler = async (evt) => {
        if (claimData.id == null) {
            alert("저장되지 않은 건입니다.");
            return;
        }
        props.deleteData({...claimData})       
        alert("성공적으로 삭제되었습니다.");
    };

    const clearHandler = (evt) => {
        props.onFormDataHandler(null);
    };

    console.log("befo return formData: " + claimData);

    //console.log("befo return formData.kcd: " + formData.kcd);
    let content = ( 
        <form>
            <div className={styles.no}>{`보험금 신청서 (신청번호: ${claimData.no}번)`}</div>
            <Panel type="box1">
                <Panel type="line" style={{backgroundColor:"transparent"}}>
                    <Insured
                        data={claimData.custName}
                        onUpdateReqData={updateReqDataHandler}
                    />
                </Panel>
                <Panel type="line" style={{backgroundColor:"white"}}>
                    <AccidentRadio
                        data={claimData.accidentKind}
                        onUpdateReqData={updateReqDataHandler}
                    />
                </Panel>
                <Panel type="line" >
                    <AccidentDate
                        data={claimData.accidentDate}
                        onUpdateReqData={updateReqDataHandler}
                    />
                    <DsasName
                        data={claimData.dsasName}
                        onUpdateReqData={updateReqDataHandler}
                    />
                    <KCDCt
                        data={claimData.kcd}
                        stopCascading={claimData.stopCascading}
                        onUpdateReqData={updateKcdHandler}
                    />
                </Panel>
                <Panel type="line" style={{backgroundColor:"white"}}>
                    <AccidentDetails
                        data={claimData.accidentDetails}
                        onUpdateReqData={updateReqDataHandler}
                    />
                </Panel>
                <Panel type="line">
                    <ClaimResnCt
                        data={claimData.claimResn}
                        onUpdateReqData={updateReqDataHandler}
                    />
                    <Hospital
                        data={claimData.hospitalName}
                        onUpdateReqData={updateReqDataHandler}
                    />
                </Panel>
                <Panel type="line" style={{borderBottom:"none", backgroundColor:"transparent"}}>
                    <Account 
                        data={claimData.accountId}
                        onUpdateReqData={updateReqDataHandler}
                    />
                </Panel>
            </Panel>
            <div style={{ border: "0px solid black", textAlign: "center" }}>
                <Button className={buttonStyles.inlineBlock} onClick={submitHandler}>
                    신청하기
                </Button>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <Button
                    className={buttonStyles.inlineBlock}
                    type="button"
                    onClick={clearHandler}
                >
                    Clear
                </Button>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <Button
                    className={buttonStyles.inlineBlock}
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
