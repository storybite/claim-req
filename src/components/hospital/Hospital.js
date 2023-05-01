import React, { useEffect, memo } from "react";
import styles from "./Hospital.module.css"; // Import the CSS module
import Modal from "../UI/Modal";
import Label from "../UI/Label";
import Input from "../UI/Input";
import Button from "../UI/Button";
import Panel from "../UI/Panel";
import Table from "../UI/Table";
import { useState } from "react";


const hospitals = [
    {
        name: "삼성메디칼센터",
        addr: "서울특별시 강남구 일원동",
    },
    {
        name: "아산병원",
        addr: "서울특별시 송파구 풍납동",
    },
    {
        name: "세브란스병원",
        addr: "서울특별시 서대문구 연세로",
    },
    {
        name: "이화여자대학교 목동병원",
        addr: "서울시 양천구",
    },
    {
        name: "한양대학교 의료원",
        addr: "서울 동대문구",
    },
    {
        name: "국립의료원",
        addr: "서울 강북구",
    },
    {
        name: "세인트 메리 병원",
        addr: "경기도 고양시 일산서구 삼산동",
    },
    {
        name: "분당차병원",
        addr: "경기도 성남시 분당구",
    },
    {
        name: "인하대학교병원",
        addr: "인천광역시 중구 묵동",
    },
    {
        name: "의정부성모병원",
        addr: "경기도 의정부시 대학로",
    },
];

const korName = { name: "병원명", addr: "주소" };
const NAME = "hospital";

const Hospital = (props) => {
    const data = hospitals;

    const [hospitalName, setHospitalName] = useState("");
    const [isPopUped, setIsPopUped] = useState(false);

    useEffect(()=>{
        setHospitalName(props.data)
    }, [props.data])

    const inputHandler = (evt) => {
        //setHospital(evt.target.value);
        setIsPopUped(!isPopUped)        
    };

    const rowClickHandler = (hospitalName, evt) => {
        setHospitalName(hospitalName)
        setIsPopUped(!isPopUped)
        props.onUpdateReqData({hospitalName: hospitalName})
    }

    const closeHandler = (evt) => {
        setIsPopUped(false)
    }

    const clearHandler = (evt) => {
        setIsPopUped(false);
        setHospitalName("");
    };

    return (
        <>
            <Label htmlFor={NAME}>병원정보</Label>
            <Input
                dict={{
                    id: NAME,
                    type: "text",
                    name: NAME,
                    value: hospitalName,
                    onFocus: inputHandler,  
                    readOnly : true,
                }}
            />
            {isPopUped && (
                <>
                    <Modal>
                        <Table
                            head={["병원명", "주소"]}
                            data={data}
                            onRowClickHandler={rowClickHandler}
                            onCloseHandler={closeHandler}
                            onClearHandler={clearHandler}
                            />
                    </Modal>
                </>
            )}
        </>
    );
};

export default memo(Hospital);
