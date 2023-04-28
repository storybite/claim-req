import React from "react"
import Modal from "../UI/Modal";
import Input from "../UI/Input";
import Label from "../UI/Label";
import styles from "./Account.module.css"; 
import { useState, useEffect,memo } from "react";
//import { deleteData, postData, putData } from "../../module/fetch";
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
        if(props.data.length > 0 && accountList.length > 0) {
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
        setAccountData(paramAccount)
        setIsPopUped(!isPopUped)
        props.onUpdateReqData({accountId : paramAccount.id})
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
            {isPopUped && (
                <>
                    <Modal>
                        <div className={styles.tableWrapper}>
                            <table className={styles.table}>            
                                <thead>
                                    <tr>
                                        <th>예금주</th>
                                        <th>은행</th>
                                        <th>계좌번호</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {accountList.map((row, index) => (
                                        <tr
                                            key={index}
                                            onClick={(evt) => {
                                                    console.log('row:', row);
                                                    return rowClickHandler(row, evt)
                                                }
                                            }
                                        >
                                            <td>{row["name"]}</td>
                                            <td>{row["bank"]}</td>
                                            <td>{row["account"]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <AddAccount onAddData={addData} onClose={closeHandler}/>
                    </Modal>
                </>
            )}
        </>            
    );
};

export default memo(Account);
