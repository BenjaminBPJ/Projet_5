function productPage(){
    let data = request(`http://localhost:3000/api/teddies/` + urlParam)
    data.then(pageProduit =>{ 
            createCardProductDetail(pageProduit) // création de la carte produit detail
            createColorChoice(pageProduit)  // création menu deroulant couleur    
            clickForCart(pageProduit) // envoie un produit au clique bouton dans le local storage (panier)
    })
    .catch((err) => console.log(`pas de serveur:${err}`))
}

productPage()

