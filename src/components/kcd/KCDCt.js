import { useEffect, useState, useRef, memo, useReducer } from "react";
import KCD from "./KCD";
import Label from "../UI/Label";

const initState = {
    initLoaded : false,
    data : "",
}

const reducer = (prev, action) => {    
    
    if(action.type == "set-props") {
        return {
            //initLoaded : action.data.map((v,x)=>v + x.length, 0) > 0 ? true : false,
            initLoaded : true,
            data : action.data
        }
    } else if(action.type == "set-updt") { //현재 필요없음.
        return {
            initLoaded : true,
            data : action.data
        }
    } else if(action.type == "add-kcd") {
        let updatedState = [ ...prev.data ];
        updatedState[action.itemIndex] = action.kcd;
        return {
            initLoaded : true,
            data : updatedState,
        }
    } 
    return { ...prev }
}

const KCDCt = (props) => {

    console.log("KCDContainer props.data" + props.data)

    const [kcdGroupState, dispatch] = useReducer(reducer, initState);
    
    useEffect(() => {
        if(!props.stopCascading) {
            dispatch({type : "set-props", data : props.data})
        }
    }, [props.data]);

    useEffect(() => {          
        //위의 초기값 설정에 의해서 바로위의 useEffect가 완료되기 전에 먼저 세팅(공백)이 될 수도 있다.
        if(kcdGroupState.initLoaded) { 
            //dispatch({type : "set-updt", data : kcdGroupState.data})
            props.onUpdateReqData({ kcd: kcdGroupState.data, stopCascading:true });
        }
    }, [kcdGroupState.data, kcdGroupState.initLoaded]);

    const checkValidKCD = (kcd) => {
        kcdGroupState.data.map(item => {
            if(kcd.length > 0 && item === kcd) {
                throw new Error("동일한 KCD가 있습니다.")
            }
        })
    }
    
    // const updateKcdGroupHandler = (entry) => {
    //     const kcd = entry['kcd'];
    //     const itemIndex = entry['itemIndex'];                
    //     checkValidKCD(kcd) 
    //     let updtKcdGroup;       
    //     setKcdGroup((prev) => {
    //         const rtn = [ ...prev ];
    //         console.log("rtn >> ", rtn)
    //         rtn[itemIndex] = kcd;
    //         updtKcdGroup = [...rtn]
    //         return rtn;
    //     })      
    //     props.onUpdateReqData({ kcd: updtKcdGroup });
    // };

    const updateKcdGroupHandler = (entry) => {
        const kcd = entry['kcd'];
        const itemIndex = entry['itemIndex'];                
        checkValidKCD(kcd)        
        dispatch({type:"add-kcd",kcd:kcd, itemIndex,itemIndex})
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
                        data={kcdGroupState.data[index]}
                        onUpdateKcdGroup={updateKcdGroupHandler}
                    />
                ))}
            </span>
        </>
    );
};

export default memo(KCDCt);
