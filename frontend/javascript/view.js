function createCardProduct(value) {
    let article = document.createElement(`a`)
    document.querySelector(".main-index").appendChild(article)
    article.classList.add("card")
    article.setAttribute(`href`, `produit.html?id=${value._id}`)

    article.innerHTML = `<h3>${value.name}</h3>
                        <img src= ${value.imageUrl} class="teddy"/>
                        <p>${value.description}</p>
                        <p><strong>Couleurs : </strong>${value.colors}</p>
                        <p><strong>Prix : </strong>${value.price /100} €</p>`
}

