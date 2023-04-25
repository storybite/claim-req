import React from "react";
import Panel from "../UI/Panel";
import { useState } from "react";
import Label from "../UI/Label";
import Input from "../UI/Input";
import panelStyles from "../UI/Panel.module.css"
import SearchButton from "../UI/SearchButton";

const Search = (props) => {

    const [name, setName] = useState("");
    const [accidentDate, setAccidentDate] = useState("");
    const [result, setResult] = useState("");

    const nameChangeHandler = (evt) => {
        setName(evt.target.value);
    };

    const acDateChangeHandler = (evt) => {
        setAccidentDate(evt.target.value);
    };

    const resultChangeHandler = (evt) => {
        setResult(evt.target.value);
    }; 

    const search = (evt) => {
        props.onFilterReqData(name, accidentDate, result)
        setName("")
        setAccidentDate("")
        setResult("")
    }

    return (
        <Panel className={panelStyles.between}>
            <div>
                <Label htmlFor={"name"}>신청자</Label>
                <Input
                    style={{width:"4rem"}}
                    dict={{
                        id: "name",
                        type: "text",
                        name: "name",
                        value : name,
                        onChange: nameChangeHandler,
                    }}
                />
                <Label htmlFor={"name"}>사고난 날짜</Label>
                <Input
                    style={{width:"6rem"}}
                    dict={{
                        id: "accidentDate",
                        type: "date",
                        name: "accidentDate",
                        value : accidentDate,
                        onChange: acDateChangeHandler,
                    }}
                />
                <Label htmlFor={"result"}>처리결과</Label>
                <Input
                    style={{width:"6rem"}}
                    dict={{
                        id: "result",
                        type: "text",
                        name: "result",
                        value: result,
                        onChange: resultChangeHandler,
                    }}
                />
            </div>
            <SearchButton onClick={search}>조회</SearchButton>
        </Panel>
    );
};

export default Search;
