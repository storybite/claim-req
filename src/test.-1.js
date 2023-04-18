const hospitals = [
    {
        name: "카톨릭 성모병원",
        addr: "서울시 반포구 반포동",
    },
    {
        name: "김안과",
        addr: "서울시 영등포구 영듣포동",
    },
    {
        name: "서울대학교병원",
        addr: "서울시 관악구 신림동",
    },
];

{
}

const prev = { tong: false, hosp: false };

const addDmndResnGroup = (keyVal) => {
    const rtn = { ...prev };
    console.log("rtn ", rtn)
    console.log("Object.keys(keyVal)[0] ", Object.keys(keyVal)[0])
    console.log("Object.values(keyVal)[0] ", Object.values(keyVal)[0])
    rtn[Object.keys(keyVal)[0]] = Object.values(keyVal)[0]
    return rtn;
};


const rtn1 = addDmndResnGroup({tong : true})
console.log(rtn1)

console.log(prev['tong'])