fetch(`http://localhost:3000/api/teddies`) // connection à l'API
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {  // vérification que l'on a bien les données du JSON
        console.log(data);

            let cartItems = localStorage.getItem('productsInCart')
            cartItems = JSON.parse(cartItems)
            console.log(cartItems)

            let cart = document.querySelector(".produit-cart")

            Object.values(cartItems).map(items =>{
               cart.innerHTML  +=`<div class="sous-panier">
               <div class="produit-panier">
               <button class="deleted"> Supprimer </button>
               <img src= ${items.imageUrl} class="teddy-panier"/>
               <p>${items.name}</p>
               </div>
               <div class="prix-panier">
               <p>${items.price /100} €</p></div>`
            })
            

        })
