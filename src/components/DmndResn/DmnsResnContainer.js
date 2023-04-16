import {useState} from "react"
import styles from "./DmndResnContainer.module.css"
import DmndResnBox from "./DmndResnBox";
import Label from "../UI/Label";


const DmndResnContainer = (props) => {

    
    return (
        <>
            <Label>청구할 사유</Label>
            <span className={styles.DmndResnGroup}>
                <DmndResnBox title="통원"/>
                <DmndResnBox title="입원"/>
                <DmndResnBox title="수술"/>
                <DmndResnBox title="사망"/>            
            </span>
        </>
    )

}

export default DmndResnContainer;