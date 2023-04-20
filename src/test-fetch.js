

const END_POINT = "https://test-1-db70d-default-rtdb.asia-southeast1.firebasedatabase.app/req[?].json"
//const uptPoint = "https://test-1-db70d-default-rtdb.asia-southeast1.firebasedatabase.app/req/${updateKey}.json"

const getData = async (data) => {

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

const postData = async (data) => {

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

const putData = async (data, key) => {
    
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

const deleteData = async (key) => {
    
    const endPoint = END_POINT.replace("[?]", "/"+key)

    const response = await fetch(endPoint, {
        method : 'DELETE',
    });

    if(!response.ok) {
        throw Error("response error")
    }
}

const myData = [
    {id : null, name : "lsw1", addr : "seoul-1", age : "31"},
    {id : null, name : "lsw2", addr : "seoul-2", age : "32"},
    {id : null, name : "lsw3", addr : "seoul-3", age : "33"},
]


try {

    const gotData = getData();

    gotData.then(data=>data.map(row=> {
        for(key in row) {
            console.log("key " + key)
            console.log("val " + row[key]);
            console.log("-------------------")
        }
    }));
    

    myData.forEach(async item => {
        item.id = await postData(item, 'POST');        
        console.log(myData)
        item.name = "emh0"
        await putData(item, item.id);
        //respData = await deleteData(item.id);
    })
} catch (e) {
    console.log(e.message)
}

