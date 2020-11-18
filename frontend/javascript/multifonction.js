// envoie produit vers le panier
function clickForCart(value) {
    let cart = document.querySelector('.add-basket')
    cart.addEventListener('click', function () {
        addItems(value)
    })
}

function addItems(data) {
    // envoie des oursons dans le panier
    let items = {
        id: data._id,
        name: data.name,
        price: data.price,
        image: data.imageUrl,
    }

    let cartProduct = localStorage.getItem("productsInCart")
    if (cartProduct) {
        cartProduct = JSON.parse(cartProduct)
        cartProduct.push(items)
        localStorage.setItem("productsInCart", JSON.stringify(cartProduct))
        alert('Produit ajouté au panier')
    } else {
        cartProduct = []
        cartProduct.push(items)
        localStorage.setItem("productsInCart", JSON.stringify(cartProduct))
        alert('Produit ajouté au panier')
    }
}

function postOrder(commande) {
    console.log(commande)
    let data = send(`http://localhost:3000/api/teddies/order`, commande)
    data.then(toApi => {

        console.log(toApi)
        /*let idPostApi = toApi.orderId
        console.log(idPostApi)
        console.log(object)


        let productPostApi = products
        console.log(productPostApi)

        let firstName = contact.firstName
        let lastName = contact.lastName

        window.location = `commande.html?id=${idPostApi}&firstName=${firstName}&lastName=${lastName}&products=${productPostApi}`*/

    })
    .catch((err) => console.log(err))

}

