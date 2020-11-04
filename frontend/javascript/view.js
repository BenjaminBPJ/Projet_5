// Création des cartes produit de la page d'accueil //
function createCardProduct(value) {
    let article = document.createElement(`a`)
    document.querySelector(".main-index").appendChild(article)
    article.classList.add("card")
    article.setAttribute(`href`, `produit.html?id=${value._id}`)

    article.innerHTML = `<h3>${value.name}</h3>
                        <img src= ${value.imageUrl} class="teddy"/>
                        <p>${value.description}</p>
                        <p><strong>Couleurs : </strong>${value.colors}</p>
                        <p><strong>Prix : </strong>${value.price /100} €</p>
                        <button>Cliquez pour plus d'infos</button>`
}

// création de carte dynamique page produit //
function createCardProductDetail(value){
    let article = document.createElement(`article`) // création de l'article principal
    document.querySelector("main").appendChild(article)
    article.classList.add("card-produit")

    article.innerHTML = `<h3>${value.name}</h3> 
                         <img src= ${value.imageUrl} class="teddy"/>
                         <p>${value.description}<p>
                         <p><strong>Couleur : </strong></p>
                         <select></select>
                         <p><strong>Prix : </strong>${value.price / 100} €</p>
                         <button>Mettre dans mon panier</button>`
}

// création du déroulant multichoix des couleurs //