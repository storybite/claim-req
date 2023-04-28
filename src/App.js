import "./App.css";
import ClaimList from "./components/claimList/ClaimList";
import comm from "./module/common";
import { useEffect, useState } from "react";
import { getData, postData, putData } from "./module/fetch";
import Claim from './components/claim/Claim';

let save;

//git test1
function App() {
    const [reqData, setReqData] = useState([]);
    const [claimData, setClaimData] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isFiltered, setIsFiltered] = useState(false);

    useEffect(() => {
        setIsLoaded(false);
        fetchData();
    }, []);

    useEffect(() => {
        if(isFiltered && claimData) {
            setIsFiltered(false);
            formDataHandler(claimData.id)
        }
    }, [isFiltered]);

    
    const fetchData = async () => {
        const data = await getData();
        if (data == null) {
        } else {
            setReqData(data);
        }
        setIsLoaded(true);
    };

    const filterReqData = async (name, accidentDate, result) => {
        setIsLoaded(false);
        let filteredList = await getData();
        setIsLoaded(true);
        if (filteredList == null) return
        
        filteredList = filteredList.filter(item=> name.length == 0 || item.custName == name)
        filteredList = filteredList.filter(item=> accidentDate.length == 0 || item.accidentDate == accidentDate)
        filteredList = filteredList.filter(item=> result.length == 0 || item.result == result)
        
        setReqData(filteredList);
        setIsFiltered(true);
    }
    
    const saveData = async (paramClaimData) => {
        if (paramClaimData.id === null) {
            paramClaimData.id = await postData(paramClaimData);
        }
        await putData(paramClaimData, paramClaimData.id);
        fetchData();
        setClaimData(paramClaimData)
    };    

    const deleteData = async (paramClaimData) => {
        if (paramClaimData.id == null) {
            alert("저장되지 않은 건입니다.");
            return;
        }
        await deleteData(paramClaimData.id);
        formDataHandler(null);
        fetchData();
    };
    
    const getMaxNo = () => {
        console.log("maxInDict:", comm.maxInDictList(reqData, "no"));
        return comm.maxInDictList(reqData, "no");
    };

    const formDataHandler = (id) => {

        if (id == null) {
            setClaimData(null);
            return
        }

        save = claimData;
        const vData = reqData.filter((item) => item.id == id);
        setClaimData(vData[0]);
        console.log("claimData >:", claimData);
    };

    let content = (
        <>
            <ClaimList
                claimList={reqData}
                onFormDataHandler={formDataHandler}
                onFilterReqData={filterReqData}
            ></ClaimList>
            <Claim
                claimData={claimData}
                onFetchData={fetchData}
                onMaxNo={getMaxNo}
                onFormDataHandler={formDataHandler}
                onSaveData={saveData}
                onDeleteData={deleteData}
            />
        </>
    );

    if (!isLoaded) {
        content = <h1 style={{ textAlign: "center" }}>Loading...</h1>;
    }

    return content;
}

export default App;
