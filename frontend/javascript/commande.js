createGrateful()
cleanTheCart()

function cleanTheCart(i) {
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)
    cartItems.splice(i, cartItems.length) //suppression de l'element i du tableau (= le bouton sur lequel on va avoir le addEventListener) 
    localStorage.clear() //on vide le storage avant de le mettre à jour
    localStorage.setItem("productsInCart", JSON.stringify(cartItems)) //maj du panier sans l'élément i
}