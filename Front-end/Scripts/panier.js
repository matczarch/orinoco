let objet = localStorage.getItem("cart")

let objJson = JSON.parse(objet)
console.log(objJson);


if (objet == '{}' || objet == null || objet == "[]" ) {
let message = 
`
     <td colspan="6" style="text-align: center;"> Votre panier est vide </td> 
`
 
document.getElementById("panier").innerHTML = message;
document.getElementById("Formule").style.display = "none";
document.getElementById("totalTabl").style.display = "none";  
} 
else {
    
    const tableau = document.getElementById("tab");
    for(let i = 0; i < objJson.length; i++) {
        console.log(objJson[i].name);
        const tr = document.createElement("tr");

        
        // affichage du nom dans le panier 
        const $th0 = document.createElement("th");
        $th0.setAttribute("style", "text-align: center;");
        $th0.innerHTML = objJson[i].name;
        tr.appendChild($th0);
        console.log($th0);
        console.log(tr)
        // affichage du choix dans le panier
        const $th1 = document.createElement("th");
        $th1.setAttribute("style", "text-align: center;");
        $th1.innerHTML = objJson[i].choix; 
        tr.appendChild($th1);
        //affichage de la quantité et modification de la quantité
        const $th2 = document.createElement("th");
        $th2.setAttribute("style", "text-align: center;");
        const $input = document.createElement("input");
        $input.type = "number";
        $input.defaultValue = objJson[i].quantity; 
        $input.min = "1";
        const index = i; 
        $input.addEventListener("change", function() {
            AjoutProduit(index, this.value);
        });
        $th2.appendChild($input);
        tr.appendChild($th2);
        

        //code pour 
        

        //affichage du prix unitaire 
        const $th3 = document.createElement("th"); 
        $th3.setAttribute("style", "text-align: center;");
        $th3.innerHTML = objJson[i].prix;
        tr.appendChild($th3);
        // Affichage du prix total. 
        const $th5 = document.createElement("th");
        $th5.setAttribute("style", "text-align: center;");
        $th5.id = `priceTotal-${i}`;
        $th5.innerHTML = `${objJson[i].priceTotal} €`;  
    
        const $thS = document.createElement("th"); 
        $thS.setAttribute("style", "text-align: center;");
        const $button = document.createElement("button");
        $button.innerHTML = `<i class="fas fa-trash-alt"></i>`; 
        $button.classList = "btn btn-outline-danger";
        $button.addEventListener("click", function() {
            deleteItem(index);
        });
        $thS.appendChild($button);
        tr.appendChild($thS);



        tableau.append(tr); 
    }
}

document.getElementById("CommandForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
    Valid();
});

function Valid () {
    console.log(document.forms.CommandForm);
    if(document.forms.CommandForm.length > 0) {
        console.log("hy"); 
        const fields = {
            firstName: document.getElementById("firstName"), 
            lastName: document.getElementById("lastName"),
            email: document.getElementById("email"), 
            address: document.getElementById("address"), 
            city: document.getElementById("city")
        };
        const contact = {
            firstName: fields.firstName.value, 
            lastName: fields.lastName.value,
            email: fields.email.value, 
            address: fields.address.value, 
            city: fields.city.value
        };
        if (!ValidForm(contact, fields)) {return;}
        
        const products = objJson.map(function(camera){return camera._id})
        const command = {contact, products};
        console.log(command);
        const options = {
          method: "POST",
          body: JSON.stringify(command),
          headers: {
            "Content-Type" : "application/json"
        }
        };
        fetch('http://localhost:3000/api/cameras/order', options)
        .then(res => {
            console.log(res);
            return res.json()})
        .then(res => { 
          if (res.orderId) {
            alert(`Votre commande numéro ${res.orderId} à bien été passée.`)
            localStorage.setItem("orderId", res.orderId)
            localStorage.setItem("firstName", res.contact.firstName)
            window.location = `confirmation.html`
          } else {
            alert(`Erreur de commande`);
          }
        });
        
  }
    else {
        console.log("ho");
        alert("Veuilliez remplir le formulaire");
    }
}

CalculTotal();
function CalculTotal() {
    let price = localStorage.getItem("cart");
    let priceJson = JSON.parse(price);  
    let priceT = 0; 
    for (let i = 0; i < priceJson.length; i++) 
    {
        priceT = priceT + priceJson[i].priceTotal; 
    }
    document.getElementById("Total").innerHTML = ''; 
    document.getElementById("Total").innerHTML = `${priceT} €`
    console.log(priceT);
    localStorage.priceTotal = priceT;  
}

function AjoutProduit(index, valueQ) {
    console.log(index);
    objJson[index].quantity = valueQ;
    objJson[index].priceTotal = objJson[index].quantity*objJson[index].prix;
    console.log(objJson[index].quantity, objJson[index].prix)
    document.getElementById(`priceTotal-${index}`).innerHTML = `${objJson[index].priceTotal} € `;
    localStorage.setItem("cart", JSON.stringify(objJson));
    CalculTotal();

}

function deleteItem (index) {
    delete objJson.splice(index, 1); 
    localStorage.setItem("cart", JSON.stringify(objJson)); 
    location.reload();
}

function ValidForm ({lastName, firstName, address, email, city}, fields) {

    for (const key in fields) {
        fields[key].style.border = null; 
    }; 
    const border = function(field) {field.style.border = "2px solid red"}; 

    let error = false; 

    if (lastName.trim().length == 0)                                  
    {  
        border(fields.lastName); 
        alert("Mettez votre nom."); 
        error = true; 
    }   
    if (firstName.trim().length == 0) 
    {
        border(fields.firstName);
        alert("Mettez votre prenom"); 
        error = true; 
    } 
    if (address.trim().length == 0)                               
    { 
        border(fields.address);
        alert("Mettez votre adresse.");
        error = true; 
    }        
    if (email.trim().length == 0)                                   
    { 
        border(fields.email);
        alert("Mettez une adresse email valide."); 
        error = true; 
    }    
    if (email.indexOf("@", 0) < 0)                 
    { 
        alert("Mettez une adresse email valide.");
        return false;  
        
    }    
    if (email.indexOf(".", 0) < 0)                 
    {
        alert("Mettez une adresse email valide."); 
        return false; 
         
    }    
    if (city.trim().length == 0 )                           
    { 
        border(fields.city);
        alert("Mettez votre numéro de téléphone."); 
        error = true; 
    }    
    return error === false; 
 
}



