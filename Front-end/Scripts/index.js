
// fetch('http://localhost:3000/api/cameras')
//   .then(function(res) {
//     if (res.ok) {
//         console.log("ok");
//         document.getElementById('')
//       return myJson;
//     }
//   })
//   .then(function(value) {
//     console.log(value);
//   })
//   .catch(function(err) {
//     // Une erreur est survenue
//   });

//   function afficheProduit (myJson) {
//         // creation des articles
//         const cloneElt = document.importNode(template.content, true); 
//         console.log("le clone est crée");
//         console.log(cloneElt);
//         // mettre en forme
//         cloneElt.getElementById('ImageProduit').src = MyJson.imageUrl;
//   }
; (async () => {

  const products = await ConnexionServer()
  HydrateTheProduct(products);
  panier();
})()
async function ConnexionServer() {
  return fetch("http://localhost:3000/api/cameras")
    .then(response => response.json())
    .then((products) => products)
    .catch(error => alert("Erreur : " + error));
}
function HydrateTheProduct(products) {
  document.getElementById('productList').innerHTML = '';
  products.forEach(product => {
    DisplayProduct(product);

  });
};
const container = document.getElementById('productList');
function DisplayProduct(product) {

  const div = document.createElement("div")
  div.setAttribute("class", "card-wrapper col-lg-4 col-md-6 col-xs-12");
  div.innerHTML =
    `
              <a class="card linkCard" href="product.html?id=${product._id}">
                  <div class="card-img-wrapper">
                      <img class="card-img-top" src='${product.imageUrl}' alt='Photo d'un ours en peluche' title='Ours en peluche ${product.name}'/>
                  </div>
                  <div class="card-body">
                      <h2 class="card-title">${product.name}</h2>
                      <div class="card-content">
                          <div class="starScore">
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                          </div>
                          <p class="card-text">${product.description}</p>
                          <p class="card-text price">${product.price / 100} €</p>
                      </div>
                  </div>
              </a>  
      
      `
  container.append(div)
}

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
