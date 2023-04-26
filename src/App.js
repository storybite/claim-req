import "./App.css";
import ClaimList from "./components/list/ClaimList";
import comm from "./module/common";
import { useEffect, useState } from "react";
import { getData, postData, putData } from "./module/fetch";
import Form from "./components/form/Form";
import Account from "./components/account/Account";

let save;

//git test1
function App() {
    const [reqData, setReqData] = useState([]);
    const [formData, setFormData] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [formCount, setFormCount] = useState(0);

    useEffect(() => {
        setIsLoaded(false);
        fetchData();
    }, []);

    
    const fetchData = async () => {
        const data = await getData();
        if (data == null) {
        } else {
            setReqData(data);
        }
        setIsLoaded(true);
    
        setFormCount(prev=>prev+1)    
    };

    const filterReqData = async (name, accidentDate, result) => {
        let filteredList = await getData();
        if (filteredList == null) return
        
        filteredList = filteredList.filter(item=> name.length == 0 || item.custName == name)
        filteredList = filteredList.filter(item=> accidentDate.length == 0 || item.accidentDate == accidentDate)
        filteredList = filteredList.filter(item=> result.length == 0 || item.result == result)
        
        setReqData(filteredList);
    }

    const getMaxNo = () => {
        console.log("maxInDict:", comm.maxInDictList(reqData, "no"));
        return comm.maxInDictList(reqData, "no");
    };

    const formDataHandler = (id) => {

        setFormCount(prev=>prev+1)

        if (id == null) {
            setFormData(null);
            return
        }

        save = formData;
        const vData = reqData.filter((item) => item.id == id);
        setFormData(vData[0]);
        console.log("formData >:", formData);
    };

    let content = (
        <>
            <ClaimList
                claimList={reqData}
                onFormDataHandler={formDataHandler}
                onFilterReqData={filterReqData}
            ></ClaimList>
            <Form
                formData={formData}
                onFetchData={fetchData}
                onMaxNo={getMaxNo}
                onFormDataHandler={formDataHandler}
                formCount={formCount}
            />
        </>
    );

    if (!isLoaded) {
        content = <h1 style={{ textAlign: "center" }}>Loading...</h1>;
    }

    if (save == formData) {
        console.log("save == formData");
    } else {
        console.log("save != formData");
    }

    console.log('formCount:', formCount);

    return content;
}

export default App;
