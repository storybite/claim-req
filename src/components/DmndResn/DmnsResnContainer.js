import {useState} from "react"
import DmndResnBox from "./DmndResnBox";

const DmndResnContainer = (props) => {

    
    return (
        <>
            <label>청구사유</label>
            <DmndResnBox title="통원"/>
            <DmndResnBox title="입원"/>
            <DmndResnBox title="수술"/>
            <DmndResnBox title="사망"/>            
        </>
    )

}

export default DmndResnContainer;