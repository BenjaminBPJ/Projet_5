
// envoie produit vers le panier
function clickForCart(value){
    let cart = document.querySelector('.add-basket')
    cart.addEventListener('click', function (){
    addItems(value)
    totalCost(value)
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

// cout total du panier
function totalCost(data){
    let cartCost = localStorage.getItem('totalCost')  
    if (cartCost == null){
        localStorage.setItem('totalCost', decimNumber(data))
    }else{
        localStorage.setItem('totalCost', (data.price / 100 + JSON.parse(cartCost)))
    }
    console.log(cartCost)
}

/*function deleteItem(){
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)
    let deleted = document.getElementsByClassName('remove-button')
    console.log(deleted)
    console.log(cartItems)
    
    deleted.addEventListener('click', function(){
        for (let id in cartItems){
        localStorage.removeItem(id)
        console.log(id)
    }
    })
}*/