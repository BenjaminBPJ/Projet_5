fetch(`http://localhost:3000/api/teddies`) // connection à l'API
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {  // vérification que l'on a bien les données du JSON
        console.log(data);

})


