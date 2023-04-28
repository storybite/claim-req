import React from "react";
import styles from "./AccountPopUp.module.css"; 

const AccountPopUp = (props) => {




    return (
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
                    {props.accountList.map((row, index) => (
                        <tr
                            key={index}
                            onClick={(evt) => {
                                console.log("row:", row);
                                return rowClickHandler(row, evt);
                            }}
                        >
                            <td>{row["name"]}</td>
                            <td>{row["bank"]}</td>
                            <td>{row["account"]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AccountPopUp;
