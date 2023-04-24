import {useEffect, useState, memo} from "react"
import styles from "./ClaimResnContainer.module.css"
import ClaimResnBox from "./ClaimResnBox";
import Label from "../UI/Label";


const ClaimResnContainer = (props) => {

    const [claimResnGroup, setClaimResGroup] = useState("");

    useEffect(()=>{
        //props.onUpdateReqData({claimResn: props.data}) 
        setClaimResGroup(props.data)
    }, [props.data])


    useEffect(()=>{
        props.onUpdateReqData({claimResn: claimResnGroup}) 
    }, [claimResnGroup])

    const updateClaimResnGroup = (entry) => {
        setClaimResGroup((prev)=>{
            const rtn = {...prev}
            rtn[Object.keys(entry)[0]] = Object.values(entry)[0]
            return rtn;
        })
    }

    //console.log("ClaimResnContainer props.data " + props.data)

    return (
        <>
            <Label>청구할 사유</Label>
            <span className={styles.DmndResnGroup}>
                <ClaimResnBox title="통원" isChecked={props.data['tong']} onClick={updateClaimResnGroup}/>
                <ClaimResnBox title="입원" isChecked={props.data['hosp']} onClick={updateClaimResnGroup}/>
                <ClaimResnBox title="수술" isChecked={props.data['oper']} onClick={updateClaimResnGroup}/>
                <ClaimResnBox title="사망" isChecked={props.data['dead']} onClick={updateClaimResnGroup}/>            
            </span>
        </>
    )

}

export default memo(ClaimResnContainer);