fetch(`http://localhost:3000/api/teddies`) // connection à l'API
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {  // vérfication que l'on a bien les données du JSON
        console.log(data);

        data.forEach(function (value) { // création des cartes produits
            let article = document.createElement(`a`)
            document.querySelector("main").appendChild(article)
            article.classList.add("card")
            article.setAttribute(`href`, `produit.html?id=${value._id}`)

            article.innerHTML = `<h3>${value.name}</h3>
                                         <img src= ${value.imageUrl} class="teddy"/>
                                         <p>${value.description}</p>
                                         <p><strong>Couleurs : </strong>${value.colors}</p>
                                         <p><strong>Prix : </strong>${value.price / 100} €</p>`
        })
    })
    .catch((err) => console.log(`pas de serveur:${err}`));



