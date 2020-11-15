function cartPage(){
    let data = request(`http://localhost:3000/api/teddies/`)
    data.then(pagePanier =>{ 
            createCart(pagePanier)    
            makingForm(pagePanier)
            removeItem(pagePanier)
    })
    //.catch((err) => console.log(`pas de serveur:${err}`))
}

cartPage()

function makingForm(){
    createForm()
    validForm()
}

 function validForm(){
    let form = document.getElementById("formulaire")
    console.log(form)
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
    let nameRegExp = new RegExp(`^[a-zàâéèëêïîôùüçœ\'’A_Z -]{1,60}$`,'g')
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
      let firstNameRegExp = new RegExp(`^[a-zàâéèëêïîôùüçœ\'’A_Z -]{1,60}$`,'g')
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
        let cityRegExp = new RegExp(`^[a-zàâéèëêïîôùüçœ\'’A_Z -]{1,60}$`,'g')
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
      let adressRegExp = new RegExp(`^[a-zàâéèëêïîôùüçœ\'’A_Z0-9-]+`,'g')
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

// envoie des données collectées à l'api
function sendApi(){
    // je créer un tableau dans lequel je vais push mes produits
    let products = []
    // j'envoie les produit dans mon tableau
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)
    for (let id in cartItems){
        products.push(id)
    }
    console.log(products)
// recuperations des input que je met dans un objet contact
let name = document.getElementById("name").value
let firstName = document.getElementById("firstname").value
let adress = document.getElementById("adress").value
let city = document.getElementById("city").value
let email = document.getElementById("email").value

let contact ={
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
