const END_POINT = "https://test-1-db70d-default-rtdb.asia-southeast1.firebasedatabase.app/movie[?].json"
//const uptPoint = "https://test-1-db70d-default-rtdb.asia-southeast1.firebasedatabase.app/movie/${updateKey}.json"

export const getData = async (data) => {

    const endPoint = END_POINT.replace("[?]", "")

    console.log("endPoint >> ", endPoint)

    const response = await fetch(endPoint);

    if(!response.ok) {
        throw Error("response error")
    }

    let jsonData = await response.json();
    jsonData = Object.values(jsonData);
    return jsonData

}

export const postData = async (data) => {

    const endPoint = END_POINT.replace("[?]", "")

    console.log("endPoint >> ", endPoint)

    const response = await fetch(endPoint, {
        method : 'POST',
        body : JSON.stringify(data),
        headers : {
            'Content-Type' : 'application/json'
        }
    });

    if(!response.ok) {
        throw Error("response error")
    }

     // Get the generated key from the response
     const responseData = await response.json();
     return responseData.name; // The generated key is stored in the 'name' field
}

export const putData = async (data, key) => {
    
    const endPoint = END_POINT.replace("[?]", "/"+key)
    console.log("update endPoint ", endPoint)

    const response = await fetch(endPoint, {
        method : 'PUT',
        body : JSON.stringify(data),
        headers : {
            'Content-Type' : 'application/json'
        }
    });

    if(!response.ok) {
        throw Error("response error")
    }
}

export const deleteData = async (key) => {
    
    const endPoint = END_POINT.replace("[?]", "/"+key)

    const response = await fetch(endPoint, {
        method : 'DELETE',
    });

    if(!response.ok) {
        throw Error("response error")
    }
}


