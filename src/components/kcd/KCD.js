import styles from "./KCD.module.css";
import { useEffect, useState } from "react";
import Modal from "../UI/Modal";
import Input from "../UI/Input";
import Button from "../UI/Button";
import Panel from "../UI/Panel";
import Table from "../UI/Table";
import { getSpringData } from "../../module/fetch";


const debounce = (func, wait) => {
    let timeout;

    return function (...args) {
        const context = this;

        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
};

function KCD(props) {

    const [lClassData, setLClassData] = useState(props.lClassData);
    const [mClassData, setMClassData] = useState([]);
    const [dClassData, setDClassData] = useState([]);
    const [kcd, setKcd] = useState("");
    const [isPopUped, setIsPopUped] = useState(false);
    const [error, setError] = useState(null);

    const kcdColData = [
        { width: "280px" },
        { width: "80px" },
    ];

    useEffect(() => {
        setKcd(props.data || ""); //경고 표시 제어 Warning: A component is changing a controlled input to be uncontrolled.
    }, [props.data]);
    
    useEffect(() => {
        if (error) {
            alert(error.message);
            //throw error;
        }
    }, [error]);

    
    const inputHandler = (evt) => {
        setIsPopUped(!isPopUped);
    };

    const classRowClickHandler = async (classData, kind, korName, evt) => {
        const rec = classData.filter(item=>item.korName == korName)[0]
        let data = await getSpringData({stddDate : null, dtalKcd: rec.dtalKcd});
        data = data.filter(item=>item.classCode == kind)
        data  = data.map(item=>{return { korName: item['korName'],  dtalKcd: item['dtalKcd']}})
        return data 
        // setMClassData(data);
    };

    const lClassRowClickHandler = async (korName, evt) => {
        const data = await classRowClickHandler(lClassData, "중", korName, evt)
        setMClassData(data);
        setDClassData([]);
    };

    const mClassRowClickHandler = async (korName, evt) => {
        const data = await classRowClickHandler(mClassData, "소", korName, evt)
        setDClassData(data);
    };

    const dClassRowClickHandler = async (kcdCode, evt) => {
        console.log("evt " + evt.target);
        try {
            props.onUpdateKcdGroup({
                kcd: kcdCode,
                itemIndex: props.itemIndex,
            });
            setKcd(kcdCode);
            setIsPopUped(!isPopUped);
        } catch (e) {
            setError(e);
        }
    };

    const closeHandler = (evt) => {
        setIsPopUped(false);
    };

    const clearHandler = (evt) => {
        setIsPopUped(false);
        setKcd("");
    };
    
    return (
        <>
            <Input
                className={styles.kcdInput}
                dict={{
                    id: "kcd",
                    type: "text",
                    name: "kcd",
                    value: kcd,
                    onFocus: inputHandler,
                    readOnly: true
                    //onBlur: blurHandler,
                }} />
            {isPopUped && (
                <>
                    <Modal >
                        <Panel>
                            <Table style={{width:"25rem"}}
                                head={["대분류"]}
                                data={lClassData.map(item=>{return {korName:item['korName']} } )}
                                onRowClickHandler={lClassRowClickHandler}
                                tdStyle={[{textAlign:"left"}]}
                                rtnColIndex={0}
                                hidePanel={true}
                            />
                            <Table style={{width:"30rem"}}
                                head={["중분류"]}
                                data={mClassData.map(item=>{return {korName:item['korName']} } )}
                                onRowClickHandler={mClassRowClickHandler}
                                tdStyle={[{textAlign:"left"}]}
                                rtnColIndex={0}
                                hidePanel={true}
                            />
                            <div style={{width:"1px"}}> </div>
                            <Table style={{width:"30rem"}}
                                head={["소분류","KCD"]}
                                data={dClassData}
                                colWidth={kcdColData}
                                onRowClickHandler={dClassRowClickHandler}
                                tdStyle={[{textAlign:"left"}, {textAlign:"center"}]}
                                rtnColIndex={1}
                                hidePanel={true}
                            />
                        </Panel>
                        <Panel>
                            <Button
                                type="button"
                                style={{ margin: "2rem 0.5rem", backgroundColor: "#aaa" }}
                                onClick={closeHandler}
                            >
                                닫기
                            </Button>
                            <Button
                                type="button"
                                style={{ margin: "2rem 0.5rem", backgroundColor: "#aaa" }}
                                onClick={clearHandler}
                            >
                                Clear
                            </Button>
                        </Panel>
                    </Modal>
                </>
            )}
        </>
    );
}

export default KCD;
