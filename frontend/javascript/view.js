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
                         <button class="add-basket">Mettre dans mon panier</button>`
}

// création du déroulant multichoix des couleurs //
function createColorChoice(value){
    let option = document.createElement('option') 
    document.querySelector('select').appendChild(option)           
    let optionDefault = document.createElement('option') // création de l'intitulé, pour dire à l'utilisateur de choisir sa couleur
    document.querySelector('option').appendChild(optionDefault)
    optionDefault.innerHTML = "Choisissez votre couleur"

    for (let i = 0; i < value.colors.length; i = i + 1) {   // boucle pour ajouter les bonnes couleurs pour chaque ourson
        let option = document.createElement('option')
        document.querySelector('main article select').appendChild(option)
        option.setAttribute("value", value.colors[i])   // permet d'avoir les choix multiples pour chaque couleurs grâce à l'attribut donné

        option.innerHTML = `${value.colors[i]}`}
}

// création physique du panier sur la page panier
function createCart(){
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)
    console.log(cartItems)
    let cart = document.createElement('p')
    document.querySelector('main').appendChild(cart)
// création du tableau
    let tableTitle = document.createElement('thead')
    document.querySelector('table').appendChild(tableTitle)
    let row = document.createElement('tbody')
    document.querySelector('table').appendChild(row)
    let tfoot = document.createElement('tfoot')
    document.querySelector('table').appendChild(tfoot)
    let cartCost = localStorage.getItem('totalCost')

if (cartItems == null){
    cart.innerHTML = `<p>Votre panier est vide<br>
                      Veuillez choisir un Ourson<p>`
}else{
    tableTitle.innerHTML = `<tr>
                            <th class="img-panier">Mes achats</th>
                            <th class="produit-name-panier">Ourson</th> 
                            <th class="prix-produit-panier">Prix</th>
                            </tr>`
    Object.values(cartItems).map(items =>{
    row.innerHTML += `<td class="img-panier"><img class="teddy-panier" src="${items.imageUrl}"></td>
                          <td class="produit-name-panier">${items.name}</td>
                          <td class="prix-produit-panier">${items.price / 100} €</td>
                          <td><button class="remove-button">Supprimer</button></td>`
    tfoot.innerHTML =`<td colspan="4">Total de la commande : ${cartCost} €</td>`
    })
    openForm()
}
}

// bouton formulaire
function openForm(){
    let butttonForm = document.createElement('button')
    document.querySelector('main').appendChild(butttonForm)
    butttonForm.innerHTML = `finalisez votre commande`
    butttonForm.addEventListener('click', function (){
        createForm()
    })
}

//création du formulaire
function createForm(){
    let form = document.createElement('form')
    document.querySelector("main").appendChild(form)
    form.innerHTML =`<h5>Veuillez remplir ce formulaire et l'envoyer pour recevoir votre commande</h5>
                     <label for="lastName">Nom</label>
                     <input type="text" id="lastName" name="userLastName" required>
                     <span id="aideNom"></span><br>
                     <label for="firstName">Prénom</label>
                     <input type="text" id="firstName" name="userFirstName" required><br>
                     <label for="address">Adresse</label>
                     <input type="text" id="address" name="userAddress" required><br>
                     <label for="city">Ville</label>
                     <input type="text" id="city" name="userCity" required><br>
                     <label for="email">E-mail</label>
                     <input type="email" id="email" name="userEmail" required><br>
                     <button type="submit" id="submitButton">Envoyer</button>`
}