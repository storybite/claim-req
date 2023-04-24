const maxInDictList = (dictList, key) => {
    if(dictList.length == 0) {
        return 0;
    }
    return Math.max(...dictList.map(item=>item[key]));
}

// const hospitals = [
//     {
//         name: "카톨릭 성모병원",
//         addr: "서울시 반포구 반포동",
//     },
//     {
//         name: "김안과",
//         addr: "서울시 영등포구 영듣포동",
//     },
//     {
//         name: "서울대학교병원",
//         addr: "서울시 관악구 신림동",
//     },
// ];


// const prev = { tong: false, hosp: false };

// const addDmndResnGroup = (keyVal) => {
//     const rtn = { ...prev };
//     console.log("rtn ", rtn)
//     console.log("Object.keys(keyVal)[0] ", Object.keys(keyVal)[0])
//     console.log("Object.values(keyVal)[0] ", Object.values(keyVal)[0])
//     rtn[Object.keys(keyVal)[0]] = Object.values(keyVal)[0]
//     return rtn;
// };


// const rtn1 = addDmndResnGroup({tong : true})
// console.log(rtn1)

// console.log(prev['tong'])


// const entry1 = {a : 10}


// entry1['a'] = 20;
// console.log(entry1)


//

//클로저란, 중첩 함수에서 어떤 함수가 자신(함수)의 외부에서 선언된 지역 변수를 참조하도록 선언되어, 
//외부 실행 컨텍스트가 종료되었음에도 불구하고 그 Lexical Environment 정보가 남아 있어 이에 
// 접근할 수 있는 함수 또는 그 현상

let a = 10;

function f1() {
    let aa = a * 5
    function getAA() {
        return aa;
    }    
    return getAA;
}

//f1 스택 인스턴스에서 aa는 지역변수(따라서 휘발성)이며 이때 aa 값은 50을 갖는다. f1의 렉시컬 환경 생성
//f1의 스택에 있던 aa는 f1 종료와 함께 사라지지만 my_getAA는 getAA의 외부함수(f1)의 렉시컬 환경인 aa를 보관하게된다.
const my_getAA1 = f1(); 
                         

a = a * -1;

const my_getAA2 = f1();

console.log(my_getAA1())
console.log(my_getAA2())
console.log("my_getAA1 === my_getAA2 ", my_getAA1 === my_getAA2)


//GPT 질의 응답
//1번 질문: 렉시컬 환경의 정의와 생성을 다른 의미인가? => 다른 의미면 추가 설명 필요.
//답변: 렉시컬 환경의 '정의'와 '생성'은 다른 의미입니다. 
//렉시컬 환경은 함수의 스코프와 변수에 대한 정보를 포함하는 구조입니다. 
//이 정보는 함수가 선언되는 시점에 결정됩니다. 따라서 렉시컬 환경이 '정의'되는 것은 함수의 선언 시점입니다. 
//그러나 렉시컬 환경은 함수가 호출될 때마다 '생성'되는 것으로, 각 함수 호출마다 새로운 렉시컬 환경 인스턴스가 
//생성되며, 이때 함수 호출 시점의 변수 상태를 기억하게 됩니다.

//2번 질문: 렉실컬 환경의 생성은 함수의 실행시점이야, 아니면 함수의 선언시점이야?
//답변: 렉시컬 환경의 '생성'은 함수의 실행 시점입니다. 함수가 호출될 때마다 새로운 렉시컬 환경 인스턴스가 생성되며, 
//이때 함수 호출 시점의 변수 상태를 기억하게 됩니다. 이와는 별개로 렉시컬 환경이 '정의'되는 것은 함수의 선언 시점입니다.

/*
let a = 10;

function f1() { // f1의 정의 시작 시점(외부변수 "a"에 대한 렉시컬 환경의 구조를 f1이 가지고 있다는 정보가 메모리 공간에 생성)
    let aa = a * 5
    function getAA() { //getAA의 정의 시작 시점(외부변수 "aa"에 대한 렉시컬 환경의 구조를 getAA가 가지고 있다는 정보가 메모리 공간에 생성)
        return aa;
    } //getAA의 정의 끝 시점
	
    return getAA;
} // f1의 정의 끝 시점

const my_getAA1 = f1(); //f1의 실행시점으로 렉시컬에 대한 구체적 인스턴스가 생성(a=10), my_getAA1는 이 시점의 f1 인스턴스에 대한 렉시컬 정보를 참조하게 됨.
                         
a = a * -1;

const my_getAA2 = f1();//f1의 실행시점으로 렉시컬에 대한 구체적 인스턴스가 생성(a=-10), my_getAA2는 이 시점의 f1 인스턴스에 대한 렉시컬 정보를 참조하게 됨.

my_getAA1() //my_getAA1이 참조하는 렉시컬에 정보는 aa=50
my_getAA2() //my_getAA2가 참조하는 렉시컬에 정보는 aa=-50
*/

let a1 = {name:"lsw", age:50}
let a2 = {addr:"seoul", sex:1}

console.log('a1:', a1);
console.log('a2:', a2);

let a3 = {...a1, ...a2}
console.log('a3:', a3);

let a4 = {...a1, name:"emh"}
console.log('a4:', a4);


console.log('"abc".includes("b"):', "abc".includes("e"));


let a5 = [{name:"lsw", age:"50"},{name:"lsw2", age:"40"}]

let a6 = [];

a5.map(item=>a6.push(Object.values(item)))

console.log('a6:', a6);



const columnOrder = ['id', 'accidentDate', 'custName', 'dsasName', 'result']

console.log('columnOrder:', columnOrder.indexOf('accidentDate'));




function formatDate(date) {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
  
    return `${year}-${month}-${day}`;
  }
  
const today = new Date();
const formattedDate = formatDate(today);
console.log(formattedDate);

var v1 = {name:"lsw", age:"50"};
  
for (const [key, value] of Object.entries(v1)) {
    console.log(`${key}: ${value}`);
}
  

var a7 = [{name:"lsw", age:50},{name:"lsw2", age:60}]

console.log(Math.max(a7.map(item=>item.age)));

var a7 = a7.map(item=>item.age);
console.log('a7:', Math.max(...a7));


var a7 = [{name:"lsw", age:50},{name:"lsw2", age:60}]


console.log(maxInDictList(a7, "age"));

var a7 = []

console.log('a7.length:', a7.length);


function add(a, b=1) {
    return a + b;
}

console.log('add(10):', add(10));