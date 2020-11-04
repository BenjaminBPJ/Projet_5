function productPage(){
    let data = request(`http://localhost:3000/api/teddies/` + urlParam)
    data.then(products =>{ // création des cartes produits
            createCardProductDetail(products) 
    })
}

productPage()