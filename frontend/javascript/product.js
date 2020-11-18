function productPage(){
    let data = request(`http://localhost:3000/api/teddies/` + urlParam)
    data.then(pageProduit =>{ 
            createCardProductDetail(pageProduit) // création de la carte produit detail
            createColorChoice(pageProduit)  // création menu deroulant couleur    
            clickForCart(pageProduit) // envoie un produit au clique bouton dans le local storage (panier)           
    })
    .catch((err) =>{ 
        let article = document.createElement(`article`) // création de l'article principal
        document.querySelector("main").appendChild(article)
        let message = document.createElement(`div`) // création de l'article principal
        document.querySelector("article").appendChild(message)
        message.innerHTML = `Ce produit n'existe pas ou est indisponible, veuillez nous excuser`
        div.remove(message)
        console.log(`pas de serveur:${err}`)
    })
}

productPage()

