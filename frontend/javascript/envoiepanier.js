
// envoie produit vers le panier
function clickForCart(value){
    let cart = document.querySelector('.add-basket')
    cart.addEventListener('click', function (){
    addItems(value)
    })   
}

function addItems(data){
// envoie des oursons dans le panier
    let items = {
        id : data._id,
        name : data.name,
        price : data.price,
        image : data.imageUrl,
    }

    let cartProduct = localStorage.getItem("productsInCart")
    if (cartProduct){
        cartProduct = JSON.parse(cartProduct)
        cartProduct.push(items)
        localStorage.setItem("productsInCart", JSON.stringify(cartProduct))
        alert('Produit ajouté au panier')
    }else{
        cartProduct = []
        cartProduct.push(items)
        localStorage.setItem("productsInCart", JSON.stringify(cartProduct))
        alert('Produit ajouté au panier')
    } 
}

function removeItem() { // fonction servant à supprimer un élément du tableau
    let removeItemButton = document.getElementsByClassName('remove-button')
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)
    for (i = 0; i < removeItemButton.length; i++) {  // on selectionne là ou on va appliquer notre supression
        let button = removeItemButton[i]
        button.addEventListener('click', function (event) {
            let deleteItem = event.target
            deleteItem.parentElement.parentElement.remove() // supression de la page
            deleteClick(event) // supression du localStorage
            reloadPrice(event)
        })
    }
}

function deleteClick(i){
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)
    cartItems.splice(i, 1) //suppression de l'element i du tableau (= le bouton sur lequel on va avoir le addEventListener) 
    localStorage.clear() //on vide le storage avant de le mettre à jour
    localStorage.setItem("productsInCart", JSON.stringify(cartItems)) //maj du panier sans l'élément i
}

function reloadPrice(){
    let row = document.getElementById('affichage-panier')
    let tfoot = document.getElementById('prix-total')  
    let sumVal = 0
        for (i = 0 ; i < row.rows.length ; i ++){
            sumVal = sumVal + parseInt(row.rows[i].cells[2].innerHTML)
        }
        console.log(sumVal)

        tfoot.innerHTML =`<td colspan="4">Total de la commande : ${sumVal.toLocaleString("fr", {minimumFractionDigits: 2, maximumFractionDigits: 2})} €</td>`
}
