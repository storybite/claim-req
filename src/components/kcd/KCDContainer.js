import { useEffect, useState } from "react";
import KCDBox from "./KCDBox";
import Label from "../UI/Label";

const KCDContainer = (props) => {
    const [kcdGroup, setKcdGroup] = useState(props.data);
    const [error, setError] = useState(null);

    useEffect(() => {
        props.onUpdateReqData({ kcd: kcdGroup });
    }, [kcdGroup]);

    useEffect(()=>{
        if(error) {
            //alert(error.message)
            throw error;
        }
    }, [error])


    const checkValidKCD = (kcd) => {
        kcdGroup.map(item => {
            if(item === kcd) {
                throw new Error("동일한 KCD가 있습니다.")
            }
        })
        
    }
    
    const updateKcdGroup = (entry) => {
        const kcd = entry['kcd'];
        const itemIndex = entry['itemIndex'];        
        
        try {
            checkValidKCD(kcd)
        } catch (e) {
            setError(e)
            return;
        }
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
                        data={props.data[index]}
                        onUpdateKcdData={updateKcdGroup}
                    />
                ))}
            </span>
        </>
    );
};

export default KCDContainer;
