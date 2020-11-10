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
                     <button type ="submit" id="send">Envoyer</button>
                     </form>`  
             
// validation du formulaire
form.name.addEventListener('change',function(){
    nameValide(this)
})
form.firstname.addEventListener('change',function(){
    firstNameValide(this)
})
form.adress.addEventListener('change',function(){
    adressValide(this)
})
form.city.addEventListener('change',function(){
    cityValide(this)
})
form.email.addEventListener('change',function(){
    emailValide(this)
})

// validation du formulaire avec le bouton //
form.addEventListener('submit',function(e){
    if (nameValide(form.name) && firstNameValide(form.firstname) && adressValide(form.adress) && cityValide(form.city) && emailValide(form.email)){
        e.preventDefault()
        sendApi()   
    }
    })


function emailValide(inputEmail){
    let emailRegExp = new RegExp(`^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,3})$`,'g') 
// teste de l'expression régulière dans l'input
    let testEmail = emailRegExp.test(inputEmail.value)
    let small = document.getElementById(`small-email`)
    console.log(small)
    if (testEmail){
        small.innerHTML = `Adresse valide`
        return true
    }else {
        small.innerHTML = `Adresse non valide`
        return false
    }
}

function nameValide(inputName){
    let nameRegExp = new RegExp(`^[a-zA_Z]+$`,'g')
    let testName = nameRegExp.test(inputName.value)
    let small = document.getElementById(`small-name`)
    if (testName){
        small.innerHTML = `Prénom valide`
        return true
    }else {
        small.innerHTML = `Merci d'écrire votre prénom en toutes lettres`
        return false
    }
}
function firstNameValide(inputFirstName){
    let firstNameRegExp = new RegExp(`^[a-zA_Z]+$`,'g')
    let testFirstName = firstNameRegExp.test(inputFirstName.value)
    let small = document.getElementById(`small-firstname`)
    if (testFirstName){
        small.innerHTML = `Nom valide`
        return true
    }else {
        small.innerHTML = `Merci d'écrire votre nom en toutes lettres`
        return false
    }
}
function cityValide(inputCity){
    let cityRegExp = new RegExp(`^[a-zA_Z]+$`,'g')
    let testCity = cityRegExp.test(inputCity.value)
    let small = document.getElementById(`small-city`)
    if (testCity){
        small.innerHTML = `Ville valide`
        return true
    }else {
        small.innerHTML = `Merci d'écrire votre ville en toutes lettres`
        return false
    }
}
function adressValide(inputAdress){
    let adressRegExp = new RegExp(`^[a-zA_Z0-9-]+`,'g')
    let testAdress = adressRegExp.test(inputAdress.value)
    let small = document.getElementById(`small-adress`)
    if (testAdress){
        small.innerHTML = `Adresse valide`
        return true
    }else {
        small.innerHTML = `Merci d'écrire une adresse correcte`
        return false
    }
}
}


function sendApi(){
    // je créer un tableau dans lequel je vais push mes produits
    let products = []
    // j'envoie les produit dans mon tableau
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)
    for (let name in cartItems){
        products.push(name)
    }
    console.log(products)
// recuperations des input que je met dans un objet contact
let name = document.getElementById("name").value
let firstName = document.getElementById("firstname").value
let adress = document.getElementById("adress").value
let city = document.getElementById("city").value
let email = document.getElementById("email").value

let contact ={
    name: name,
    firstName: firstName,
    adress: adress,
    city: city,
    email: email,
}

let object = {
    contact,
    products,
}

console.log(object)

let postApiUrl = `http://localhost:3000/api/teddies/order`
let postDataApi = JSON.stringify(object)

let postDataCart = async function(){
    try{
        let response = await fetch(postApiUrl,{
            method : "POST",
            headers : {
                "content-type": "application/json"
            },
            body : postDataApi
        })
        console.log(response)
// récupération des données de l'api
        if (response.ok){
            let data = await response.json()
console.log("infos recup :")
console.log(data)

let idPostApi = data["orderId"]
console.log(idPostApi)

let productsPostApi = products
console.log(productsPostApi)

// renvoi sur la page de confirmation
window.location =`confirmation.html?id=${data["orderId"]}&price=${productsPostApi}`
        }else{
            console.error("serveur hs :", response.status)
        }
    }catch(e){
        console.log(e)
    }
    postDataCart()
}
}




