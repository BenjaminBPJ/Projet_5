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





