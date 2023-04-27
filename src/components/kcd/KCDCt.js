import { useEffect, useState, useRef, memo } from "react";
import KCD from "./KCD";
import Label from "../UI/Label";

const KCDContainer = (props) => {

    console.log("KCDContainer props.data" + props.data)

    const [kcdGroup, setKcdGroup] = useState("");
    const [isInitialMount, setIsInitialMount] = useState(true); // 추가한 상태

    useEffect(() => {
        setKcdGroup(props.data);
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
        let updtKcd;       
        setKcdGroup((prev) => {
            const rtn = [ ...prev ];
            console.log("rtn >> ", rtn)
            rtn[itemIndex] = kcd;
            updtKcd = [...rtn]
            return rtn;
        })      
        props.onUpdateReqData({ kcd: updtKcd });
    };

    console.log(props.data);

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

export default memo(KCDContainer);
