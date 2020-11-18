function cartPage() {
    let data = request(`http://localhost:3000/api/teddies/`)
    data.then(pagePanier => {
        createCart(pagePanier)
        makingForm(pagePanier)
        removeItem(pagePanier)
    })
    /*.catch((err) =>{ 
        serverDown()
        console.log(`pas de serveur:${err}`)
    })*/
}

cartPage()

function removeItem() { // fonction servant à supprimer un élément du tableau
    let removeItemButton = document.getElementsByClassName('remove-button')
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)
    for (i = 0; i < removeItemButton.length; i++) {  // on selectionne là ou on va appliquer notre supression
        let button = removeItemButton[i]
        button.addEventListener('click', function (event) {
            let deleteItem = event.target
            deleteItem.parentElement.parentElement.remove() // supression de la page
            deleteClick(event) // supression du localStorage
            reloadPrice(event)
        })
    }
}

function deleteClick(i) {
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)
    cartItems.splice(i, 1) //suppression de l'element i du tableau (= le bouton sur lequel on va avoir le addEventListener) 
    localStorage.clear() //on vide le storage avant de le mettre à jour
    localStorage.setItem("productsInCart", JSON.stringify(cartItems)) //maj du panier sans l'élément i
    window.location.reload()
}

function reloadPrice() {
    let row = document.getElementById('affichage-panier')
    let tfoot = document.getElementById('prix-total')
    let sumVal = 0
    for (i = 0; i < row.rows.length; i++) {
        sumVal = sumVal + parseInt(row.rows[i].cells[2].innerHTML)
    }
    console.log(sumVal)

    tfoot.innerHTML = `<td colspan="4">Total de la commande : ${sumVal.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</td>`
}
function makingForm() {
    createForm()
    validForm()
}

function validForm() {
    let form = document.getElementById("formulaire")
    console.log(form)
    // validation du formulaire
    form.name.addEventListener('change', function () {
        nameValide(this)
    })
    form.firstname.addEventListener('change', function () {
        firstNameValide(this)
    })
    form.adress.addEventListener('change', function () {
        adressValide(this)
    })
    form.city.addEventListener('change', function () {
        cityValide(this)
    })
    form.email.addEventListener('change', function () {
        emailValide(this)
    })

    // validation du formulaire avec le bouton //
    form.addEventListener('submit', function (e) {
        e.preventDefault()
        //if (nameValide(form.name) && firstNameValide(form.firstname) && adressValide(form.adress) && cityValide(form.city) && emailValide(form.email)) {
        createItemForApi()
        localStorage.clear()
        //}
    })

    function emailValide(inputEmail) {
        let emailRegExp = new RegExp(`^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,3})$`, 'g')
        // teste de l'expression régulière dans l'input
        let testEmail = emailRegExp.test(inputEmail.value)
        let small = document.getElementById(`small-email`)
        if (testEmail) {
            small.innerHTML = `Adresse valide`
            return true
        } else {
            small.innerHTML = `Adresse non valide`
            return false
        }
    }

    function nameValide(inputName) {
        let nameRegExp = new RegExp(`^[A-Za-zÀ-ÖØ-öø-ÿ-]+( {0,1}[A-Za-zÀ-ÖØ-öø-ÿ-]?){1,60}$`, 'g')
        let testName = nameRegExp.test(inputName.value)
        let small = document.getElementById(`small-name`)
        if (testName) {
            small.innerHTML = `Prénom valide`
            return true
        } else {
            small.innerHTML = `Merci d'écrire votre prénom en toutes lettres`
            return false
        }
    }

    function firstNameValide(inputFirstName) {
        let firstNameRegExp = new RegExp(`^[A-Za-zÀ-ÖØ-öø-ÿ-]+( {0,1}[A-Za-zÀ-ÖØ-öø-ÿ-]?){1,60}$`, 'g')
        let testFirstName = firstNameRegExp.test(inputFirstName.value)
        let small = document.getElementById(`small-firstname`)
        if (testFirstName) {
            small.innerHTML = `Nom valide`
            return true
        } else {
            small.innerHTML = `Merci d'écrire votre nom en toutes lettres`
            return false
        }
    }
    function cityValide(inputCity) {
        let cityRegExp = new RegExp(`^[A-Za-zÀ-ÖØ-öø-ÿ-]+( {0,1}[A-Za-zÀ-ÖØ-öø-ÿ-]?){1,60}$`, 'g')
        let testCity = cityRegExp.test(inputCity.value)
        let small = document.getElementById(`small-city`)
        if (testCity) {
            small.innerHTML = `Ville valide`
            return true
        } else {
            small.innerHTML = `Merci d'écrire votre ville en toutes lettres`
            return false
        }
    }
    function adressValide(inputAdress) {
        let adressRegExp = new RegExp(`^[a-zàâéèëêïîôùüçœ\'’A_Z0-9-]+`, 'g')
        let testAdress = adressRegExp.test(inputAdress.value)
        let small = document.getElementById(`small-adress`)
        if (testAdress) {
            small.innerHTML = `Adresse valide`
            return true
        } else {
            small.innerHTML = `Merci d'écrire une adresse correcte`
            return false
        }
    }
}

// envoie des données collectées à l'api
function createItemForApi() {
    // je créer un tableau dans lequel je vais push mes produits
    let products = []
    // j'envoie les produit dans mon tableau
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)
    for (i = 0; i < cartItems.length; i++) {
        products.push(cartItems[i].id)
    }
    console.log(products)
    // recuperations des input que je met dans un objet contact
    let name = document.getElementById("name").value
    let firstName = document.getElementById("firstname").value
    let adress = document.getElementById("adress").value
    let city = document.getElementById("city").value
    let email = document.getElementById("email").value

    let contact = {
        firstName: name,
        lastName: firstName,
        adress: adress,
        city: city,
        email: email,
    }

    let object = {
        contact,
        products,
    }
    postOrder(object)
}

function cleanCart(i) {
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)

    let button = document.getElementById("clean-cart")
    button.addEventListener('click', function () {
        cartItems.splice(i, cartItems.length) //suppression de l'element i du tableau (= le bouton sur lequel on va avoir le addEventListener) 
        localStorage.clear() //on vide le storage avant de le mettre à jour
        localStorage.setItem("productsInCart", JSON.stringify(cartItems)) //maj du panier sans l'élément i
        window.location.reload()
    })
}

function postOrder(commande) {
    console.log(commande)
    let data = send(`http://localhost:3000/api/teddies/order`, commande)
    data.then(toApi => {

        console.log(toApi)
        /*let idPostApi = toApi.orderId
        console.log(idPostApi)
        console.log(object)


        let productPostApi = products
        console.log(productPostApi)

        let firstName = contact.firstName
        let lastName = contact.lastName

        window.location = `commande.html?id=${idPostApi}&firstName=${firstName}&lastName=${lastName}&products=${productPostApi}`*/

    })
        .catch((err) => console.log(err))

}


