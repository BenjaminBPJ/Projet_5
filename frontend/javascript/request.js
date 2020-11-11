async function request(url){
    let response = await fetch(url)
    let data = await response.json()
    return data
}

// variables qui permettent d'avoir un affichage de produit dynamique sur la page produit //
let getId = window.location.search  // avoir l'Id de connection
let urlParam = getId.replace("?id=", "") // connecte l'ID à la page

async function send(url, data){
    let response = await fetch(url, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
    })
    let res = await response.json()
    return res
}
