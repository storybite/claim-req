import React from "react";
import styles from "./Table.module.css"
import Panel from "./Panel";
import Button from "./Button";


const Table = (props) => {


    return (
        <>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            {props.head.map((colName, index) => (
                                <th key={index}>{colName}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {props.data.map((row, index) => (
                            //<tr key={index} onClick={rowClickHandler}>
                            <tr
                                key={index}
                                onClick={(evt) =>
                                    props.onRowClickHandler(Object.values(row)[0], evt)
                                }
                            >
                                {Object.values(row).map((value, i) => (
                                    <td key={i}>{value}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {!props.hidePanel && 
                <Panel>
                    <Button
                        type="button"
                        style={{ margin: "2rem 0.5rem", backgroundColor: "#aaa" }}
                        onClick={props.onCloseHandler}
                    >
                        닫기
                    </Button>
                    <Button
                        type="button"
                        style={{ margin: "2rem 0.5rem", backgroundColor: "#aaa" }}
                        onClick={props.onClearHandler}
                    >
                        Clear
                    </Button>
                </Panel>
            }
        </>
    );
};

export default Table;
