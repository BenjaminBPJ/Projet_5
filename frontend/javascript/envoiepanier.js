// envoie produit vers le panier
function clickForCart(value){
    let cart = document.querySelector('.add-basket')
    cart.addEventListener('click', function (){
    alert('Votre commande a été prise en compte')
    cartNumbers(value)
    setItems(value)
    totalCost(value)
    })
}
// ajoute le produit dans le panier (on met la fonction dans clickForCart pour qu'elle s'effectue à ce moment)
function cartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers')
    if (productNumbers){
        localStorage.setItem('cartNumbers', JSON.parse(productNumbers) + 1)
    }else {
        localStorage.setItem('cartNumbers', 1)}
}
// création de l'objet produit dans le panier
function setItems (value) {
    let productNumbers = localStorage.getItem('cartNumbers')
    let cartItems = {
        [productNumbers] : value
        }
        cartItems = localStorage.getItem('productsInCart')
        cartItems = JSON.parse(cartItems)    
        if (cartItems != null) {
            if (cartItems [productNumbers] == undefined) { // ajoute un produit en plus des autres
                cartItems = {
                    ... cartItems,
                    [productNumbers] : value
                }
            } 
        }else {  // crée un produit dans le panier car carItems = null
            cartItems = {
                [productNumbers] : value
            }
        }
    localStorage.setItem('productsInCart', JSON.stringify(cartItems))
}

// cout total du panier
function totalCost(total){
    let cartCost = localStorage.getItem('totalCost')
    if (cartCost != null){
        cartCost = JSON.parse(cartCost)
        localStorage.setItem('totalCost', cartCost + total.price / 100)
    }else{
        localStorage.setItem('totalCost', total.price / 100)
    }
}

function deleteItem(value){
    let productNumbers = localStorage.getItem('cartNumbers')
    let cartItems = {
        [productNumbers] : value
        }
    let deleted = document.querySelector('button')
    deleted.addEventListener('click', function () {
    localStorage.removeItem('cartNumbers'.value, cartItems)
    })
}