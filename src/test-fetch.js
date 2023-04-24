const END_POINT = [
    "https://test-1-db70d-default-rtdb.asia-southeast1.firebasedatabase.app/claim[?].json",
    "https://test-1-db70d-default-rtdb.asia-southeast1.firebasedatabase.app/account[?].json",
];
//const uptPoint = "https://test-1-db70d-default-rtdb.asia-southeast1.firebasedatabase.app/movie/${updateKey}.json"

const getData = async (id, index = 0) => {
    const endPoint = END_POINT[index].replace("[?]", "");

    console.log("endPoint >> ", endPoint);

    const response = await fetch(endPoint);

    if (!response.ok) {
        throw Error("response error");
    }

    let jsonData = await response.json();

    if (jsonData == null) {
        return [];
    }

    jsonData = Object.values(jsonData);

    if (id != undefined) {
        jsonData = jsonData.filter((item) => item.id === id)[0];
    }

    console.log("jsonData:", jsonData);

    return jsonData;
};

const postData = async (data, index=0) => {
    const endPoint = END_POINT[index].replace("[?]", "");

    console.log("endPoint >> ", endPoint);

    const response = await fetch(endPoint, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw Error("response error");
    }

    // Get the generated key from the response
    const responseData = await response.json();
    return responseData.name; // The generated key is stored in the 'name' field
};

const putData = async (data, key, index = 0) => {
    const endPoint = END_POINT[index].replace("[?]", "/" + key);
    console.log("update endPoint ", endPoint);

    const response = await fetch(endPoint, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw Error("response error");
    }
};

const deleteData = async (key, index = 0) => {
    const endPoint = END_POINT[index].replace("[?]", "/" + key);

    const response = await fetch(endPoint, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw Error("response error");
    }
};

const accountList = [
    { id: null, name: "이승우", bank: "우리은행", account: "01-0001-12345" },
    { id: null, name: "이승우", bank: "국민은행", account: "02-0002-67890" },
    { id: null, name: "음현아", bank: "제일은행", account: "03-0001-12345" },
    { id: null, name: "음현아", bank: "외환은행", account: "04-0002-67890" },
];

try {
    accountList.forEach(async (item) => {
        item.id = await postData(item, 1);
        await putData(item, item.id, 1);
    });
} catch (e) {
    console.log(e.message);
}
