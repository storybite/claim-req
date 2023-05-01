import React, { useEffect, useState } from "react";
import styles from "./ClaimList.module.css";
import Search from "./ClaimSearch";
import Panel from "../UI/Panel";

const ClaimList = (props) => {
    const rowClickHandler = (firstVal, evt) => {
        props.onFormDataHandler(firstVal);
    };

    const clist = props.claimList;

    return (
        <>
            <Panel type="box2">
                <Search onFilterReqData={props.onFilterReqData} />
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
                                        console.log("row:", row);
                                        return rowClickHandler(row.id, evt);
                                    }}
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
            </Panel>
        </>
    );
};

export default ClaimList;
