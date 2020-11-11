function listeProduct(){
    let data = request(`http://localhost:3000/api/tedies`)
    data.then(products =>{
        products.forEach(product => { // création des cartes produits
            createCardProduct(product) 
         })
    })
    .catch((err) =>{ 
        serveurDown()
        console.log(`pas de serveur:${err}`)
})
}

listeProduct()




