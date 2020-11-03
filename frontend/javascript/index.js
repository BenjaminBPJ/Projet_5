function listeProduct(){
    let data = request(`http://localhost:3000/api/teddies`)
    data.then(products =>{
        products.forEach(product => { // création des cartes produits
            createCardProduct(product) 
         })
    })
}

listeProduct()
    /*fetch(`http://localhost:3000/api/teddies`) // connection à l'API
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {  // vérfication que l'on a bien les données du JSON
        console.log(data);

        data.forEach(product => { // création des cartes produits
            createCardProduct(product)
        })
    })
    .catch((err) => console.log(`pas de serveur:${err}`));*/



