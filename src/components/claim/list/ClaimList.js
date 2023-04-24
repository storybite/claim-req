import React from "react";
import styles from "./ClaimList.module.css"

let claimData0 = [
    {no : "1000", date : "2023-04-25" , custName : '이승우', resn : '뇌경색', result : {code: "1", codeName:"지급"}},
];

let claimData = [
    {no : "1000", date : "2023-04-25" , custName : '이승우', resn : '뇌경색', result : "지급"},
    {no : "1000", date : "2023-04-25" , custName : '이승우', resn : '뇌경색', result : "지급"},
    {no : "1000", date : "2023-04-25" , custName : '이승우', resn : '뇌경색', result : "지급"},
    {no : "1000", date : "2023-04-25" , custName : '이승우', resn : '뇌경색', result : "지급"},
    {no : "1000", date : "2023-04-25" , custName : '이승우', resn : '뇌경색', result : "지급"},
]

const columnOrder = ['id', 'accidentDate', 'custName', 'dsasName', 'result']


const ClaimList = (props) => {

    const rowClickHandler = (firstVal, evt) =>{
        alert(evt)
    }

    const clist = props.claimList;

    //claimData = [clist.id, clist.accidentDate, "이승우", clist.dsasName, "지급"]

 

    clist.map(item=>{
        item['custName']  = '이승우'
        item['result']  = '지급'
    })

    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>            
                <thead>
                    <tr>
                        <th>신청번호</th>
                        <th>신청일자</th>
                        <th>신청자</th>
                        <th>신청사유</th>
                        <th>처리결과</th>
                    </tr>
                </thead>
                <tbody>
                    {clist.map((row, index) => (
                        <tr
                            key={index}
                            onClick={(evt) => {
                                    console.log('row:', row);
                                    return rowClickHandler(Object.values(row)[0], evt)
                                }
                            }
                        >
                            <td>{row["id"]}</td>
                            <td>{row["accidentDate"]}</td>
                            <td>{row["custName"]}</td>
                            <td>{row["dsasName"]}</td>
                            <td>{row["result"]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClaimList;
