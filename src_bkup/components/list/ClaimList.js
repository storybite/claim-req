import React from "react";
import styles from "./ClaimList.module.css"
import Search from "./Search";


let claimData = [
    {no : "1000", date : "2023-04-25" , custName : '이승우', resn : '고혈압', result : "지급"},
    {no : "1000", date : "2023-04-25" , custName : '이승우', resn : '고혈압', result : "지급"},
    {no : "1000", date : "2023-04-25" , custName : '이승우', resn : '고혈압', result : "지급"},
]

const columnOrder = ['id', 'accidentDate', 'custName', 'dsasName', 'result']

const ClaimList = (props) => {

    const rowClickHandler = (firstVal, evt) =>{
        props.onFormDataHandler(firstVal)
    }

    const clist = props.claimList;

    const clickHandler = (evt) => {
        
    }

    return (
        <>  
            <Search onFilterReqData={props.onFilterReqData}/>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>            
                    <thead>
                        <tr>
                            <th>신청번호</th>
                            <th>사고난 날짜</th>
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
                                        return rowClickHandler(row.id, evt)
                                    }
                                }
                            >
                                <td>{row["no"]}</td>
                                <td>{row["accidentDate"]}</td>
                                <td>{row["custName"]}</td>
                                <td>{row["dsasName"]}</td>
                                <td>{row["result"]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ClaimList;
