import React from "react";

const Form = (props) => {

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

    return (
        <form>
            <hr />
            <AccidentRadio
                data={props.accidentKind}
                onUpdateReqData={updateReqDataHandler}
            />
            <hr />
            <div>
                <AccidentDate
                    data={props.accidentDate}
                    onUpdateReqData={updateReqDataHandler}
                />
                <DsasName
                    data={props.dsasName}
                    onUpdateReqData={updateReqDataHandler}
                />
                <KCDContainer
                    data={props.kcd}
                    onUpdateReqData={updateReqDataHandler}
                />
            </div>
            <hr />
            <ClaimResnContainer
                data={props.claimResn}
                onUpdateReqData={updateReqDataHandler}
            />
            <Hospital
                data={props.hospitalName}
                onUpdateReqData={updateReqDataHandler}
            />
            <Button onClick={submitHandler}>신청하기</Button>
        </form>
    );
};

export default Form;
