import React, { useReducer } from "react";
import Input from "../UI/Input";
import Label from "../UI/Label";
import { useState } from "react";
import Button from "../UI/Button";
import { postData, putData } from "../../module/fetch";
import Panel from "../UI/Panel";

const AddAccount = (props) => {
    const [name, setName] = useState("");
    const [bank, setBank] = useState("");
    const [account, setAccount] = useState("");

    const nameChangeHandler = (evt) => {
        setName(evt.target.value);
    };

    const bankChangeHandler = (evt) => {
        setBank(evt.target.value);
    };

    const accontChangeHandler = (evt) => {
        setAccount(evt.target.value);
    };

    const submitHandler = async (evt) => {
        evt.preventDefault();
        if (name.length == 0 || bank.length == 0 || account.length == 0) {
            alert("예금주, 은행명, 계좌번호를 모두 입력하세요.");
            return;
        }

        const newAccount = {
            id: "",
            name: name,
            bank: bank,
            account: account
        }
        newAccount.id = await postData(newAccount, 1);
        await putData(newAccount, newAccount.id, 1);
        props.onAddData(newAccount)
        alert("정상적으로 저장되었습니다.");
    };

    const close = () => {
        props.onClose();
    }

    return (
        <>
            <Label htmlFor={"name"}>예금주</Label>
            <Input
                style={{ width: "15%" }}
                dict={{
                    id: "name",
                    type: "text",
                    name: "name",
                    //value : concatAccountInfo,
                    onChange: nameChangeHandler,
                    //onBlur: blurHandler,
                }}
            />
            <Label htmlFor={"name"}>은행</Label>
            <Input
                style={{ width: "15%" }}
                dict={{
                    id: "bank",
                    type: "text",
                    name: "bank",
                    //value : concatAccountInfo,
                    onChange: bankChangeHandler,
                    //onBlur: blurHandler,
                }}
            />
            <Label htmlFor={"name"}>계좌번호</Label>
            <Input
                dict={{
                    id: "account",
                    type: "text",
                    name: "bank",
                    //value : concatAccountInfo,
                    onChange: accontChangeHandler,
                    //onBlur: blurHandler,
                }}
            />
            <Panel>
                <Button onClick={submitHandler} style={{margin:"1rem 0.5rem"}}>저장</Button>
                <Button type="button" style={{margin:"1rem 0.5rem"}} onClick={close}>닫기</Button>
            </Panel>
        </>
    );
};

export default AddAccount;
