async function request(url){
    let response = await fetch(url)
    let data = await response.json()
    return data
}

async function requestId (url, urlParam){
    let responseId = await fetch(url + urlParam)
    let dataId = await response.json()
    return dataId
}


