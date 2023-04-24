import "./App.css";
import AccidentRadio from "./components/AccidentRadio";
import DsasName from "./components/DsasName";
import KCDContainer from "./components/kcd/KCDContainer";
import AccidentDate from "./components/AccidentDate";
import ClaimResnContainer from "./components/claim/ClaimResnContainer";
import ClaimList from "./components/claim/list/ClaimList";

import Hospital from "./components/hosp/Hospital";
import { useEffect, useState } from "react";
import Button from "./components/UI/Button";
import { getData, postData, putData } from "./module/fetch";


function formatDate(date) {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
  
    return `${year}-${month}-${day}`;
}
  

function App() {
    const reqEmptyDB = {
        id: null,
        no : '0',
        accidentKind: "disease",
        accidentDate: formatDate(new Date()),
        dsasName: "",
        kcd: ["","","",""],
        hospitalName: "",
        claimResn: { tong: false, hosp: false, oper: false, dead: false },
    };

    const [reqData, setReqData] = useState([reqEmptyDB]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(false);
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await getData(null);
        if (data.length == 0) {
            setReqData(reqEmptyDB);
        } else {
            setReqData(data);
        }
        setIsLoaded(true);
    }

    const updateReqDataHandler = (dict) => {
        let v1 = reqData;
        console.log("updateReqaDataHandler dict==> ", dict);
        const [key, val] = Object.entries(dict)[0];
        reqData[0][key] = val;
        let v2 = reqData;
        console.log("updateReqaDataHandler rec==> ", rec);
        console.log("v1 === v2", v1===v2);
    };

    const submitHandler = async (evt) => {
        evt.preventDefault();
        for (const req of reqData) {
            if (req.id === null) {
                req.id = await postData(req);
                updateReqDataHandler({ id: req.id });
            }
            await putData(req, req.id);
        }
        alert("db 저장 성공!!");
        fetchData();
    };

    // let rec = reqData[0];
    let rec = reqEmptyDB;

    let content = (
        <>
            <ClaimList claimList={reqData}></ClaimList>
            <form>
                <hr />
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
        </>
    );

    if (!isLoaded) {
        content = <h1 style={{ textAlign: "center" }}>Loading...</h1>;
    }

    return content;
}

export default App;
