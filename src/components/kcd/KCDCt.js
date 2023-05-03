import { useEffect, useState, useRef, memo, useReducer } from "react";
import KCD from "./KCD";
import Label from "../UI/Label";
import { getSpringData } from "../../module/fetch";

const KCDCt = (props) => {

    console.log("KCDContainer props.data" + props.data)

    const [lClassData, setLClassData] = useState("");
    const [kcdGroup, setKcdGroup] = useState([]);

    useEffect(()=>{
        const fetchData = async() => {
            const data = await getSpringData({stddDate : null, dtalKcd: ""});
            if (data == null) {
            } else {
                let lClass = data.map(item=>{return {...item, classCode:"대분류"}})
                lClass = lClass.map(item=>{return { korName: item['korName'],  dtalKcd: item['dtalKcd']}})
                setLClassData(lClass);
            }
            //console.log('lClass:', lClass);
        }
        fetchData();
    }, [])

    
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
            {lClassData && (
                <>  
                    <Label>질병코드</Label>
                    <span>
                        {Array.from({ length: 4 }, (_, index) => (
                            <KCD
                                key={index}
                                itemIndex={index}
                                data={kcdGroup[index]}
                                lClassData={lClassData}
                                onUpdateKcdGroup={updateKcdGroupHandler}
                            />
                        ))}                    
                    </span>
                </>
                )
            }
        </>
    );
};

export default memo(KCDCt);
