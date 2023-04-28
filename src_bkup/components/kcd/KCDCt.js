import { useEffect, useState, memo } from "react";
import KCDBox from "./KCDBox";
import Label from "../UI/Label";

const KCDCt = (props) => {

    console.log("KCDContainer props.data" + props.data)

    const [kcdGroup, setKcdGroup] = useState("");
    const [isInitialMount, setIsInitialMount] = useState(true); // 추가한 상태

    useEffect(() => {
        setKcdGroup(props.data);
    }, [props.data]);

    useEffect(() => {          
        if (!isInitialMount) {
            props.onUpdateReqData({ kcd: kcdGroup });
        } else {
            setIsInitialMount(false); // 최초 마운트 상태를 false로 변경
        }
    }, [kcdGroup]);

    
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
        setKcdGroup((prev) => {
            const rtn = [ ...prev ];
            console.log("rtn >> ", rtn)
            rtn[itemIndex] = kcd;
            return rtn;
        })
    };

    console.log(props.data);

    return (
        <>
            <Label>질병코드</Label>
            <span>
                {Array.from({ length: 4 }, (_, index) => (
                    <KCDBox
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
