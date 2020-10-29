let getId = window.location.search  // avoir l'Id de connection
let urlParam = getId.replace("?id=", "") // connecter l'ID à la page

let id = function () {
    return urlParam
}

let url = `http://localhost:3000/api/teddies/`
fetch(url + urlParam) // connection à l'API avec l'ID du bon produit
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {  // vérfication que l'on a bien les données du JSON
        console.log(data);

        let article = document.createElement(`article`)
        document.querySelector("main").appendChild(article)
        article.classList.add("card-produit")

        article.innerHTML = `<h3>${data.name}</h3> 
                             <img src= ${data.imageUrl} class="teddy"/>
                             <p>${data.description}<p>
                             <p><strong>Couleur : </strong></p>
                             <select></select>
                             <p><strong>Prix : </strong>${data.price / 100} €</p>
                             <p><strong>Quantité :</strong><input class="quantite"></input></p>
                             <button>Mettre dans mon panier</button>`


        for (let i = 0; i < data.colors.length; i = i + 1) {   // boucle pour ajouter les bonnes couleurs pour chaque ourson
            let option = document.createElement('option')
            document.querySelector('main article select').appendChild(option)
            option.setAttribute("value", data.colors[i])   // permet d'avoir les choix multiples pour chaque couleurs grâce à l'attribut donné

            option.innerHTML = `${data.colors[i]}`

        }
    }
    )
