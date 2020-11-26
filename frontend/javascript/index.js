function listeProduct() {
    let data = request(`http://localhost:3000/api/teddies`)
    data.then(products => {
        products.forEach(product => { // création des cartes produits
            createCardProduct(product)
        })
    })
        .catch(() => {
            serverDown()
        })
}

listeProduct()




