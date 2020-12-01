function productPage() {
    // variables qui permettent d'avoir un affichage de produit dynamique sur la page produit //
    let urlParam = (new URL(window.location.href)).searchParams.get('id') // connecte l'ID à la page
    let data = request(`http://localhost:3000/api/teddies/` + urlParam)
    data.then(pageProduit => {
        if (pageProduit === null) {
            serverDown()
            console.log('not found')
        } else {
            createCardProductDetail(pageProduit) // création de la carte produit detail
            createColorChoice(pageProduit)  // création menu deroulant couleur    
            clickForCart(pageProduit) // envoie un produit au clique bouton dans le local storage (panier) 
        }
    })
        .catch(() => {
            serverDown()
        })
}

productPage()

