let confirmation = 
    `
        <p>Merci pour votre commande <strong>${localStorage.firstName}</strong></p>
        <p>Commande n° <br><strong>${localStorage.orderId}</strong></p>
        <p>Prix total : <strong>${localStorage.priceTotal}</strong> €</p>
    `

document.getElementById('confirmation').innerHTML = confirmation;

const tr = document.getElementById("retour");
const $thS = document.createElement("div"); 
$thS.setAttribute("style", "text-align: center;");
const $button = document.createElement("button");
$button.innerHTML = `<i class="fas fa-undo-alt"></i> <p>Retour à l'acceuil</p>` 
$button.classList = "btn btn-outline-secondary";
$button.addEventListener("click", function() {
    window.location.href="index.html";
});
$thS.appendChild($button);
tr.appendChild($thS);
localStorage.clear();
