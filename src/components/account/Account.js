import React from "react"
import Modal from "../UI/Modal";
import Input from "../UI/Input";
import Label from "../UI/Label";
import Table from "../UI/Table";
import styles from "./Account.module.css"; 
import { useState, useEffect,memo } from "react";
import { getData } from "../../module/fetch";
import AddAccount from "./AddAccount";


//git test
const Account = (props) => {
   
//"국민은행" -NTsidfudzbNSBevyPYQ"
//"제일은행" -NTsidg6SXOpnybgeZtd"

    const [accountList, setAccountList] = useState([]);
    const [accountData, setAccountData] = useState(null);
    const [isPopUped, setIsPopUped] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(()=>{
        fetchData()
    }, [])

    useEffect(()=>{
        if(props.data && props.data.length > 0 && accountList.length > 0) {
            setAccountData(accountList.filter(item => item.id == props.data)[0]);
        } else {
            setAccountData(null)
        }
    }, [props.data, accountList])
    //}, [props.data]) 

    const fetchData = async () => {
        const data = await getData(1);
        if (data == null) {
        } else {
            setAccountList(data);
        }
        setIsLoaded(true);
    };

    const addData = (data) => {
        //accountList.push(data) //렌더링안됨.
        
        // setAccountList(prev=>{
        //     return [...prev, data]
        // })

        setAccountList((prev) => prev.concat(data));
    }


    const inputHandler = (evt) => {
        setIsPopUped(!isPopUped)        
    };

    const rowClickHandler = (paramAccount, evt) => {
        const fiteredAccount= accountList.filter(item=>item.account == paramAccount)[0]
        setAccountData(fiteredAccount)
        setIsPopUped(!isPopUped)
        props.onUpdateReqData({accountId : fiteredAccount.id})
    }

    const closeHandler = (evt) => {
        setIsPopUped(false)
    }

    const concatAccountInfo = accountData ? accountData.bank + ": "  + accountData.account : ""

    return (
        <>
            <Label htmlFor={"account"} style={{margin:"0 1rem 0 0.3rem"}}>계좌 정보</Label>
            <Input
                dict={{
                    id: "account",
                    type: "text",
                    name: "account",
                    value : concatAccountInfo,
                    onFocus: inputHandler,
                    readOnly: true
                    //onBlur: blurHandler,
                }}
            />
            {console.log('accountList:', accountList)}
            {isPopUped && (
                <>
                    <Modal>
                        <Table
                            head={["계좌변호", "은행", "이름"]}
                             data={accountList.map(({ account, bank, name }) => ({ account, bank, name }))}                            
                            // data={accountList}
                            onRowClickHandler={rowClickHandler}
                            hidePanel={true}
                            />
                        <div style={{height:"20px"}}></div>
                        <AddAccount onAddData={addData} onClose={closeHandler}/>
                    </Modal>
                </>
            )}
        </>            
    );
};

export default memo(Account);
