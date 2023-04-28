import styles from "./KCDBox.module.css";
import { useEffect, useState } from "react";
import Modal from "../UI/Modal";
import Input from "../UI/Input";

const debounce = (func, wait) => {
    let timeout;

    return function (...args) {
        const context = this;

        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
};

const kcds = [
    {
        code: "",
        name: "clear",
    },
    {
        code: "A01",
        name: "장티푸스 및 파라티푸스",
    },
    {
        code: "B01",
        name: "바이러스성 질환의 기타 장티푸스",
    },
    {
        code: "C01",
        name: "암종(전체의 1/3 이상)",
    },
    {
        code: "D01",
        name: "림프종 및 유사종",
    },
    {
        code: "E01",
        name: "뇌전증(전신성, 간질성, 간진성)",
    },
    {
        code: "F01",
        name: "정신장애",
    },
    {
        code: "G01",
        name: "신경계 질환의 기타 장애",
    },
    {
        code: "H01",
        name: "눈의 질환",
    },
    {
        code: "I01",
        name: "심장 및 혈관계 질환",
    },
    {
        code: "J01",
        name: "호흡기계 및 흉곽골 질환",
    },
    {
        code: "K01",
        name: "소화계 질환",
    },
    {
        code: "L01",
        name: "피부 질환",
    },
    {
        code: "M01",
        name: "근골격계 질환",
    },
    {
        code: "N01",
        name: "비뇨생식계 질환",
    },
    {
        code: "O01",
        name: "임신, 출산 및 산욕기 질환",
    },
    {
        code: "P01",
        name: "산태 및 새생아 질환",
    },
    {
        code: "Q01",
        name: "선천성 기형 및 변형",
    },
    {
        code: "R01",
        name: "종양의 진단적 검사 및 교정",
    },
    {
        code: "S01",
        name: "부상 및 외상의 질환",
    },
    {
        code: "T01",
        name: "독성 및 약제 작용에 의한 질환",
    },
    {
        code: "U01",
        name: "특별한 질환 및 상태",
    },
    {
        code: "V01",
        name: "운반사고",
    },
    {
        code: "W01",
        name: "수면 중 장애",
    },
    {
        code: "X01",
        name: "의료조작 및 수술 중 발생한 합병증",
    },
    {
        code: "Y01",
        name: "의료행위, 검사 및 수술 중 발생한 합병증"
    },
    {
        code: "Z01",
        name: "의학적 검사와 검사 결과의 질환",
    }
];


const korName = { code: "표준질병분류코드", name: "질병명" };

const KCDBox = (props) => {

    const data = kcds;

    const [kcd, setKcd] = useState("");
    const [isPopUped, setIsPopUped] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {        
        setKcd(props.data || ""); //경고 표시 제어 Warning: A component is changing a controlled input to be uncontrolled.
    }, [props.data]);

    useEffect(()=>{
        if(error) {
            alert(error.message)
            //throw error;
        }
    }, [error])


    const inputHandler = (evt) => {
        setIsPopUped(!isPopUped)        
    };

    const rowClickHandler = (kcdCode, evt) => {
        console.log("evt " + evt.target)
        try {
            props.onUpdateKcdGroup({
                kcd: kcdCode,
                itemIndex: props.itemIndex,
            });
            setKcd(kcdCode);
            setIsPopUped(!isPopUped)
        } catch (e) {
            setError(e)
        }
    }

    const closeHandler = (evt) => {
        setIsPopUped(false)
    }

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
                }}
            />
            {isPopUped && (
                <>
                    <Modal>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    {Object.keys(data[0]).map((key, index) => (
                                        <th key={index}>{korName[key]}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row, index) => (
                                    //<tr key={index} onClick={rowClickHandler}>
                                    <tr key={index}
                                        onClick={(evt)=>rowClickHandler(Object.values(row)[0], evt)}
                                    >
                                        {Object.values(row).map((value, i) => (
                                            <td key={i}>{value}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button className={styles.button} onClick={closeHandler}>닫기</button>
                    </Modal>
                </>
            )}
        </>
    );
};

export default KCDBox;
