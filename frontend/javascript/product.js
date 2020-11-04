let getId = window.location.search  // avoir l'Id de connection
let urlParam = getId.replace("?id=", "") // connecter l'ID à la page


let url = `http://localhost:3000/api/teddies/`
let data = request(url + urlParam)
console.log(data)
fetch(url + urlParam) // connection à l'API avec l'ID du bon produit
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {  // vérfication que l'on a bien les données du JSON
        console.log(data);

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
    alert('Votre commande a été prise en compte')
    cartNumbers(data)

// fonction qui permet d'incrémenter le nombre de produit + ensuite produit (setItem)
function cartNumbers (data){
        let productNumbers = localStorage.getItem('cartNumbers')

        if (productNumbers){
            localStorage.setItem('cartNumbers', JSON.parse(productNumbers) + 1)
        }else {
            localStorage.setItem('cartNumbers', 1)}

setItems(data)

// Fonction du dessus qui permet d'ajouter un produit dans le panier
function setItems (data) {
    let productNumbers = localStorage.getItem('cartNumbers')
    let cartItems= {
        [productNumbers] : data
        }

        cartItems = localStorage.getItem('productsInCart')
        cartItems = JSON.parse(cartItems)
    
        if (cartItems != null) {
            if (cartItems [productNumbers] == undefined) { // ajoute un produit en plus des autres
                cartItems = {
                    ... cartItems,
                    [productNumbers] : data
                }
            } 
        }else {  // crée un produit dans le panier car carItems = null
            cartItems = {
                [productNumbers] : data
            }
        }
console.log(cartItems, data.name, data)
    localStorage.setItem('productsInCart', JSON.stringify(cartItems))
            }

            totalCost(data)

function totalCost(data){
    let cartCost = localStorage.getItem('totalCost')
    if (cartCost != null){
        cartCost = JSON.parse(cartCost)
        localStorage.setItem('totalCost', cartCost + data.price / 100)
    }else{
        localStorage.setItem('totalCost', data.price / 100)
    }
}

}

})


})
