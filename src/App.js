import "./App.css";
import AccidentRadio from "./components/AccidentRadio";
import DsasName from "./components/DsasName";
import KCDContainer from "./components/kcd/KCDContainer";
import AccidentDate from "./components/AccidentDate";
import ClaimResnContainer from "./components/claim/ClaimResnContainer";

import Hospital from "./components/hosp/Hospital";
import { useEffect, useState } from "react";
import Button from "./components/UI/Button";
import {getData, postData, putData} from './module/fetch';

function App() {
    const reqDB = [
        {
            id : null,
            accidentKind : "disease", 
            //accidentKind: "disaster",
            // accidentDate : new Date(2023, 1, 1),
            accidentDate: "2023-04-02",
            dsasName: "맹장염",
            kcd: ["A01", "B01", "C01", "D01"],
            hospitalName: "세브란스병원",
            claimResn: {tong:false, hosp:false, oper:false, dead:false}
        },
    ];

    
    const [reqData, setReqData] = useState(() => reqDB);

    useEffect(()=>{
        async function fetchData() { 
            const data = await getData(null);
            if (data.length == 0) {
                setReqData(reqDB);
            } else {
                setReqData(data);
            }
        }
        fetchData();
    }, [])


    const updateReqDataHandler = (dict) => {
        console.log("updateReqaDataHandler dict==> ", dict);
        const [key, val] = Object.entries(dict)[0];
        setReqData((prev) => {
            const updatedReq = [...prev];
            updatedReq[0][key] = val;
            return updatedReq;
        });
        console.log("updateReqaDataHandler2 rec==> ", rec);
    };

    const submitHandler = async (evt) => {
        evt.preventDefault();
        for (const req of reqData) {
            if (req.id === null) {
                req.id = await postData(req)
                updateReqDataHandler({id : req.id})
            } 
            await putData(req, req.id)            
        }
        alert("db 저장 성공!!")
    }

    let rec = reqData[0];

    const content = (
        
        <form>
            <AccidentRadio
                data={rec.accidentKind}
                onUpdateReqData={updateReqDataHandler}
            />
            <hr />
            <div>
                <AccidentDate
                    data={rec.accidentDate}
                    onUpdateReqData={updateReqDataHandler}
                />
                <DsasName
                    data={rec.dsasName}
                    onUpdateReqData={updateReqDataHandler}
                />
                <KCDContainer
                    data={rec.kcd}
                    onUpdateReqData={updateReqDataHandler}
                />
            </div>
            <hr />
            <ClaimResnContainer
                data={rec.claimResn}
                onUpdateReqData={updateReqDataHandler}
            />
            <Hospital
                data={rec.hospitalName}
                onUpdateReqData={updateReqDataHandler}
            />                
            <Button onClick={submitHandler}>신청하기</Button>
        </form>
    )
    
    return content
    
}

export default App;
