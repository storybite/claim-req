import { useEffect, useState, useRef, memo, useReducer } from "react";
import KCD from "./KCD";
import Label from "../UI/Label";

const KCDCt = (props) => {

    console.log("KCDContainer props.data" + props.data)

    const [kcdGroup, setKcdGroup] = useState([]);
    
    useEffect(() => {
        setKcdGroup(props.data)
    }, [props.data]);

    const checkValidKCD = (kcd) => {
        kcdGroup.map(item => {
            if(kcd.length > 0 && item === kcd) {
                throw new Error("동일한 KCD가 있습니다.")
            }
        })
    }

    const updateKcdGroupHandler = (entry) => {
        const kcd = entry['kcd'];
        const itemIndex = entry['itemIndex'];                
        checkValidKCD(kcd)        
        const kcdGroupForUpdt = [ ...kcdGroup ];        
        kcdGroupForUpdt[itemIndex] = kcd;        
        props.onUpdateReqData({kcd:kcdGroupForUpdt})
    };

    return (
        <>
            <Label>질병코드</Label>
            <span>
                {Array.from({ length: 4 }, (_, index) => (
                    <KCD
                        key={index}
                        itemIndex={index}
                        data={kcdGroup[index]}
                        onUpdateKcdGroup={updateKcdGroupHandler}
                    />
                ))}
            </span>
        </>
    );
};

export default memo(KCDCt);
