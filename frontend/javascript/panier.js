let nomElt = document.getElementById("lastName");
nomElt.value = "VotreNom";

// Affichage d'un message contextuel pour la saisie du nom
nomElt.addEventListener("focus", function () {
    document.getElementById("aideNom").textContent = "Entrez votre nom";
});
// Suppression du message contextuel pour la saisie du nom
nomElt.addEventListener("blur", function (e) {
    document.getElementById("aideNom").textContent = "";
});


