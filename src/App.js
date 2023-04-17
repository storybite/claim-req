import logo from "./logo.svg";
import "./App.css";
import AccidentRadio from "./components/AccidentRadio";
import DsasName from "./components/DsasName";
import Label from "./components/UI/Label";
import KCD from "./components/KCD";
import AccidentDate from "./components/AccidentDate";
import DmndResnContainer from "./components/DmndResn/DmnsResnContainer";
import Hospital from "./components/Hospital";
import { useEffect, useState } from "react";

function App() {
    const reqDB = [
        {
            // accidentKind : "disaster",
            accidentKind: "disaster",
            // accidentDate : new Date(2023, 1, 1),
            accidentDate: "2023-04-01",
            dsasName: "맹장염",
            kcd: ["A01", "A02", "A03", "A04"],
            clamResn: ["hosp", "oper"],
        },
    ];

    const [reqData, setReqData] = useState(reqDB);

    const updateReqDataHandler0 = (dict) => {
        console.log("updateReqaDataHandler dict==> ", dict);
        const [key, val] = Object.entries(dict)[0];
        reqData[0][key] = val;
        console.log("updateReqaDataHandler rec==> ", rec);
    };

    const updateReqDataHandler = (dict) => {
        console.log("updateReqaDataHandler dict==> ", dict);
        const [key, val] = Object.entries(dict)[0];
        setReqData((prev) => {
            const updatedReq = [...prev]            
            updatedReq[0][key] = val;
            return updatedReq;
        });
        console.log("updateReqaDataHandler2 rec==> ", rec);
    };

    const updateKcdDataHandler = (dict) => {
      console.log("updateReqaDataHandler dict==> ", dict);
      const [key1, val1] = Object.entries(dict)[0];
      const [key2, val2] = Object.entries(dict)[1];
      setReqData((prev) => {
          const updatedReq = [...prev]            
          updatedReq[0][key1][val2] = val1;
          return updatedReq;
      });
      console.log("updateReqaDataHandler3 rec==> ", rec);
  };

    const rec = reqData[0];
    console.log("rec==> ", rec);
    rec.kcd.map((item, index)=>{console.log("kcdmap " + item + ", " + index)})
    return (
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
                <Label>질병코드</Label>{
                  rec.kcd.map((item, index)=>
                    <KCD key={index} itemIndex={index} data={item} onUpdateKcdData={updateKcdDataHandler}/>    
                  )}
            </div>
            <hr />
            {/* <DmndResnContainer/> */}
            <Hospital />
        </form>
    );
}

export default App;
