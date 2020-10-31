let getId = window.location.search  // avoir l'Id de connection
let urlParam = getId.replace("?id=", "") // connecter l'ID à la page

let id = function () {
    return urlParam
}

let url = `http://localhost:3000/api/teddies/`
fetch(url + urlParam) // connection à l'API avec l'ID du bon produit
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {  // vérfication que l'on a bien les données du JSON
        console.log(data);

        let article = document.createElement(`article`) // création de l'article principal
        document.querySelector("main").appendChild(article)
        article.classList.add("card-produit")

        article.innerHTML = `<h3>${data.name}</h3> 
                             <img src= ${data.imageUrl} class="teddy"/>
                             <p>${data.description}<p>
                             <p><strong>Couleur : </strong></p>
                             <select></select>
                             <p><strong>Prix : </strong>${data.price / 100} €</p>
                             <button>Mettre dans mon panier</button>`

        // création du déroulant multichoix des couleurs //
        let option = document.createElement('option') 
        document.querySelector('main article select').appendChild(option)           
        let optionDefault = document.createElement('option') // création de l'intitulé, pour dire à l'utilisateur de choisir sa couleur
        document.querySelector('option').appendChild(optionDefault)
        optionDefault.innerHTML = "Choisissez votre couleur"

        for (let i = 0; i < data.colors.length; i = i + 1) {   // boucle pour ajouter les bonnes couleurs pour chaque ourson
            let option = document.createElement('option')
            document.querySelector('main article select').appendChild(option)
            option.setAttribute("value", data.colors[i])   // permet d'avoir les choix multiples pour chaque couleurs grâce à l'attribut donné

            option.innerHTML = `${data.colors[i]}`}

// création du panier (cart)
let cart = document.querySelector('button')

cart.addEventListener('click', function (){
    cartNumbers()
function cartNumbers (){
        let productNumbers = localStorage.getItem('cartNumbers')

        if (productNumbers){
            localStorage.setItem('cartNumbers', JSON.parse(productNumbers) + 1)
        }else {
            localStorage.setItem('cartNumbers', 1)}}
})


})



    
