; (async () => {

    const productId = RecupUrl()
    console.log(productId)
    const productURL = await ConnexionServer(productId)
    //console.log(productURL)
    HydrateTheProduct(productURL);
    Click(productURL);
    panier(); 
})()


function RecupUrl() {
    const params = (new URL(document.location)).searchParams;
    const Id = params.get('id');
    console.log(Id)
    return Id

}
async function ConnexionServer(productId) {
    return fetch(`http://localhost:3000/api/cameras/${productId}`)
        .then(response => response.json())
        .then((products) => products)
        .catch(error => alert("Erreur : " + error));
}

const $buttonr = document.getElementById("retour"); 
$buttonr.addEventListener("click", function() {
    window.location.href="index.html";
});

//-------------------------------------------------------------------

//-------------------------------------------------------------------

//-------------------------------------------------------------------
// cette fonction permet de générer en quelque sorte le code html de la page, celui s'adaptera à n'importe quelle
// produit. 

function HydrateTheProduct(productURL) {
    const container = document.getElementById('contain');
    let lense = ""
    productURL.lenses.forEach(element => {
        lense += `<option value="${element}">${element}</option>`
    });

    const divProduit = document.createElement("div")
    divProduit.innerHTML =
        `
        <div class="container">
        <div class="product__card">
        
        <div class="container">
            <div class="row">
            <!-- Image -->
            <div class="col-12 col-lg-6">
                <div class="card bg-light mb-3">
                    <div class="card-body">
                        <a href="" data-toggle="modal" data-target="#productModal">
                        <img class="img-fluid" src='${productURL.imageUrl}' alt="Photo d'une camera" title ="Camera ${productURL.name}">
                            <p class="text-center">Zoom</p>
                        </a>
                    </div>
                </div>
            </div>
        </div> 
        </div>
        <div class="prduct__card__text">
            <h1 id="name">${productURL.name}</h1>
            <br>
            <p>${productURL.description}</p>
            <br>
            <div class="product__card__lenses">
                <label for="head"> Lentilles : </label>
                <select name="lense" id="lense-select">
                ${lense}
                </select>
            </div>
            <br>
            <p> Prix : ${productURL.price / 100} € </p>

        </div>
    </div>
    </div>
    `
    container.append(divProduit);
}
//-------------------------------------------------------------------
function Click(productURL) {
    let elt = document.getElementById("commander")
    //console.log("hello");
    elt.onclick = function () {
        let itemCart = localStorage.getItem("cart")
        let cart = JSON.parse(itemCart) || [];
        let nbr = document.getElementById("quantity").value;
        let chx = document.getElementById("lense-select").value;
        let produit = productURL.name;
        let prixU = productURL.price / 100;
        let price = nbr * productURL.price / 100;
        let id = productURL._id;
        let objet = { name: produit, choix: chx, quantity: nbr, prix: prixU, priceTotal: price, _id: id };
        console.log(cart);

        cart.push(objet);
        localStorage.setItem("cart", JSON.stringify(cart))
        location.reload();
        alert(nbr);
    }
}

$(document).ready(function () {
    var quantity = 1;

    $('.quantity-right-plus').click(function (e) {
        e.preventDefault();
        var quantity = parseInt($('#quantity').val());
        $('#quantity').val(quantity + 1);
    });

    $('.quantity-left-minus').click(function (e) {
        e.preventDefault();
        var quantity = parseInt($('#quantity').val());
        if (quantity > 1) {
            $('#quantity').val(quantity - 1);
        }
    });

});

function panier() {
    let objet = localStorage.getItem("cart");
    let objJson = JSON.parse(objet);
    const nbrPanier = document.getElementById("cartp");
    const productCart = objJson.length;
    console.log(objJson.length);
  
    nbrPanier.innerHTML =
      `
        <a class="btn btn-success btn-sm ml-3" id="cartp" href="panier.html">
          <i class="fa fa-shopping-cart"></i> Panier
          <span class="badge badge-light" id="nbrPanier">${productCart}</span>
      </a>
    `
}




