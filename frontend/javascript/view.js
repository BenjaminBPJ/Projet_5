// Création des cartes produit de la page d'accueil //
function createCardProduct(value) {
    let article = document.createElement(`a`)
    document.querySelector("main").appendChild(article)
    article.classList.add("card")
    article.setAttribute(`href`, `produit.html?id=${value._id}`)

    article.innerHTML = `<h3>${value.name}</h3>
                        <img src= ${value.imageUrl} class="teddy"/>
                        <p>${value.description}</p>
                        <p><strong>Couleurs : </strong>${value.colors}</p>
                        <p><strong>Prix : </strong>${decimNumber(value)} €</p>
                        <button>Cliquez pour plus d'infos</button>`
}

// création de carte dynamique page produit //
function createCardProductDetail(value) {
    let article = document.createElement(`article`) // création de l'article principal
    document.querySelector("main").appendChild(article)
    article.classList.add("card-produit")

    article.innerHTML = `<h3>${value.name}</h3> 
                         <img src= ${value.imageUrl} class="teddy"/>
                         <p>${value.description}<p>
                         <p><strong>Couleur : </strong></p>
                         <select></select>
                         <p><strong>Prix : </strong>${decimNumber(value)} €</p>
                         <button class="add-basket">Mettre dans mon panier</button>`
}

// création du déroulant multichoix des couleurs //
function createColorChoice(value) {
    let option = document.createElement('option')
    document.querySelector('select').appendChild(option)
    let optionDefault = document.createElement('option') // création de l'intitulé, pour dire à l'utilisateur de choisir sa couleur
    document.querySelector('option').appendChild(optionDefault)
    optionDefault.innerHTML = "Choisissez votre couleur"

    for (let i = 0; i < value.colors.length; i = i + 1) {   // boucle pour ajouter les bonnes couleurs pour chaque ourson
        let option = document.createElement('option')
        document.querySelector('main article select').appendChild(option)
        option.setAttribute("value", value.colors[i])   // permet d'avoir les choix multiples pour chaque couleurs grâce à l'attribut donné

        option.innerHTML = `${value.colors[i]}`
    }
}

// création physique du panier sur la page panier
function createCart() {
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)
    let cart = document.createElement('p')
    document.querySelector('main').appendChild(cart)
    // création du tableau
    let tableTitle = document.createElement('thead')
    document.querySelector('table').appendChild(tableTitle)
    let row = document.createElement('tbody')
    row.setAttribute('id', 'affichage-panier')
    document.querySelector('table').appendChild(row)
    let tfoot = document.createElement('tfoot')
    document.querySelector('table').appendChild(tfoot)
    tfoot.setAttribute('id', 'prix-total')

    if (cartItems.length == 0) {
        cart.innerHTML = `<p>Votre panier est vide<br>
                        Veuillez choisir un Ourson<p>`
    } else {
        tableTitle.innerHTML = `<tr>
                                <th class="img-panier">Mes achats</th>
                                <th class="produit-name-panier">Ourson</th> 
                                <th class="prix-produit-panier">Prix</th>
                                </tr>`
        for (let i in cartItems) {
            row.innerHTML += `<td class="img-panier"><img class="teddy-panier" src="${cartItems[i].image}"></td>
                              <td class="produit-name-panier">${cartItems[i].name}</td>
                              <td class="prix-produit-panier">${decimNumber(cartItems[i])} €</td>
                              <td><button class="remove-button">Supprimer</button></td>`


            let sumVal = 0
            for (i = 0; i < row.rows.length; i++) {
                sumVal = sumVal + parseInt(row.rows[i].cells[2].innerHTML)
            }
            console.log(sumVal)

            tfoot.innerHTML = `<td colspan="4">Total de la commande : ${sumVal.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €<br>
                          <button id="clean-cart">Vider le panier</button></td>`
            cleanCart()
        }
    }
}


//création du formulaire
function createForm() {
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)
    let form = document.createElement('form')
    document.querySelector("main").appendChild(form)
    form.setAttribute("id", "formulaire")
    form.classList.add('hidden')
    form.innerHTML = `<h5>Veuillez remplir ce formulaire et l'envoyer pour recevoir votre commande</h5>
                     <form action="" method="POST">
                     <label for="name">Nom</label>
                     <input type="text" id="name" ></input><br>
                     <small id="small-name"></small><br>
                     <label for="firstname">Prénom</label>
                     <input type="text" id="firstname" ></input><br>
                     <small id="small-firstname"></small><br>
                     <label for="adress">Adresse</label>
                     <input type="text" id="adress" ></input><br>
                     <small id="small-adress"></small><br>
                     <label for="city">Ville</label>
                     <input type="text" id="city" ></input><br>
                     <small id="small-city"></small><br>
                     <label for="email">E-mail</label>
                     <input type="texte" id="email" ></input><br>
                     <small id="small-email"></small><br>
                     <button type ="submit" id="send">Cliquez ici, pour passer votre commande</button>
                     </form>`


    let butttonForm = document.createElement('button')
    document.querySelector('main').appendChild(butttonForm)
    if (cartItems.length < 1) {
        butttonForm.classList.add('hidden')
    } else {
        butttonForm.innerHTML = `finalisez votre commande`
    }

    butttonForm.addEventListener('click', function () {
        form.classList.remove('hidden')
        butttonForm.classList.add('hidden')
    })
}

// fonction pour mettre nos nombres en décimal
function decimNumber(data) {
    let price = data.price / 100
    let endPrice = price.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    return endPrice
}

function createGrateful() {
    let searchParam = new URLSearchParams(window.location.search)
    let firstName = searchParam.get('firstName')
    let lastName = searchParam.get('lastName')
    let idPostApi = searchParam.get('id')
    let productPostApi = searchParam.get('products')

    let article = document.createElement(`article`)
    document.querySelector("main").appendChild(article)

    article.innerHTML = `Bonjour, <span class="color">${firstName + ' ' + lastName}</span>,<br>
                        Nous vous remercions pour votre commande numéro ${idPostApi}.<br>
                        Vos produits seront livrés dans un délais de 3 jours.<br>
                        Amicalement${productPostApi}`
}

function serverDown() {
    let article = document.createElement(`article`) // création de l'article principal
    document.querySelector("main").appendChild(article)
    article.innerHTML = `Serveur momentanément indisponible, veuillez nous excuser`
}
