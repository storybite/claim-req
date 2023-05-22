const END_POINT = [
    "https://test-1-db70d-default-rtdb.asia-southeast1.firebasedatabase.app/claim[?].json",
    "https://test-1-db70d-default-rtdb.asia-southeast1.firebasedatabase.app/account[?].json",
];

// const SPRING_END_POINT = "http://localhost:8080/portal/baseKcds"
const SPRING_END_POINT = "http://upmootong.com/portal/baseKcds"



//const uptPoint = "https://test-1-db70d-default-rtdb.asia-southeast1.firebasedatabase.app/movie/${updateKey}.json"

export const getData = async (index = 0) => {
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

    console.log("jsonData:", jsonData);

    return jsonData;
};

export const postData = async (data, index=0) => {
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

export const putData = async (data, key, index = 0) => {
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

export const deleteData = async (key, index = 0) => {
    const endPoint = END_POINT[index].replace("[?]", "/" + key);

    const response = await fetch(endPoint, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw Error("response error");
    }
};



export const getSpringData = async (inptJson) => {
    const endPoint = SPRING_END_POINT;
    
    console.log("endPoint >> ", endPoint);

    let httpMessage = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(inptJson)
    }

    const response = await fetch(endPoint, httpMessage);

    if (!response.ok) {
        throw Error("response error");
    }

    let jsonData = await response.json();

    if (jsonData == null) {
        return [];
    }

    jsonData = Object.values(jsonData);

    console.log("jsonData:", jsonData);

    return jsonData;
};