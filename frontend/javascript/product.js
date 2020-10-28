let getId = window.location.search
let urlParam = getId.replace("?id=", "")

let id = function (){ 
return urlParam
}

let url = `http://localhost:3000/api/teddies/`
fetch(url + urlParam) // connection à l'API
    .then(function(response){
        return response.json()
    })
    .then(function(data){  // vérfication que l'on a bien les données du JSON
        console.log(data);

        let article = document.createElement(`article`)
        document.querySelector("main").appendChild(article)
        article.classList.add("card-produit")

            article.innerHTML = `<h3>${data.name}</h3>
                                 <img src= ${data.imageUrl} class="teddy"/>
                                 <p>${data.description}</p>
                                 <p><strong>Prix : </strong>${data.price/100} €</p>
                                 <button>Mettre dans mon panier</button>`
                      
        })