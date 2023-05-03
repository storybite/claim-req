import React from "react";
import styles from "./Table.module.css"
import Panel from "./Panel";
import Button from "./Button";
import { useState, useRef } from "react";

const Table = (props) => {

    const rowRefs = useRef([]);
    const [selectedIndex, setSelectedIndex] = useState(null);

    let tableStyle = styles.table;

    if (props.type == "textLeft") {
        tableStyle = styles.table1;
    }

    const rowClickHandler = (index, evt) => {
        //setSelectedRowIndex(index);
        //props.onRowClickHandler(Object.values(props.data[index])[props.rtnColIndex], evt);
        if (rowRefs.current[index]) {
            rowRefs.current[index].style.backgroundColor = "rgb(180, 230, 230)";
          }
      
          // Reset the background color of the previously selected row
          if (selectedIndex !== null && rowRefs.current[selectedIndex]) {
            rowRefs.current[selectedIndex].style.backgroundColor = "";
          }
      
          setSelectedIndex(index);
          props.onRowClickHandler(Object.values(props.data[index])[props.rtnColIndex], evt);
    };

    return (
        <div>
            <div className={styles.tableWrapper} style={props.style}>
                <table className={tableStyle} style={props.style}>
                    <colgroup>
                        {
                            props.colWidth && props.colWidth.map((col, index) => (
                                <col key={index} width={col.width} />
                            ))
                        }
                    </colgroup>
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
                                ref={(el) => (rowRefs.current[index] = el)}
                                onClick={(evt) => {
                                        rowClickHandler(index, evt)
                                    }
                                }
                                // style={selectedRowIndex === index ? { backgroundColor: "rgb(180, 230, 230)" } : {}}
                            >
                                {Object.values(row).map((value, i) => (
                                    props.tdStyle && !console.log("props.tdStyle[i]" + value + " " + props.tdStyle[i]) &&
                                    <td key={i} style={props.tdStyle[i]}>{value}</td> ||
                                    !props.tdStyle && 
                                    <td key={i} >{value}</td>
                                    
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
        </div>
    );
};

export default Table;
