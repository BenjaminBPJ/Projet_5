let url = `http://localhost:3000/api/teddies`
fetch (url) // connection à l'API
    .then(function(response){
        return response.json()
    })
    .then(function(data){  // vérfication que l'on a bien les données du JSON
        console.log(data);