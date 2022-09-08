const str = window.location;
const url = new URL(str);
const idProduct = url.searchParams.get('id');
const urlProduct = 'http://localhost:3000/api/products/' + idProduct;


function SelectedProductPage() {
    fetch(urlProduct) 
    .then(res => res.json())
    .then(dataProduct => { 
        console.table(dataProduct);
        //Récupération du titre de la page avec le nom du produit
        let productPageTitle = document.querySelector("title");
        productPageTitle.innerHTML  = `${dataProduct.name}`;
        //récupération de l'image du produit
        let imgProduct = document.querySelector(".item__img");
        imgProduct.innerHTML = `<img src="${dataProduct.imageUrl}" alt="${dataProduct.altTxt}"/>`;
        //Récupération du nom du produit
        let productName = document.getElementById("title");
        productName.innerHTML = `${dataProduct.name}`;
        // récupération du prix du produit
        let priceProduct = document.getElementById("price")
        priceProduct.innerHTML = `${dataProduct.price}`;
        //récupération de la description du produit
        let descriptionProduct = document.getElementById("description");
        descriptionProduct.innerHTML = `${dataProduct.description}`;
        // récupération des différentes option de couleurs du produit
        let choiceColor = document.getElementById("colors");
        for (i=0; i < dataProduct.colors.length; i++) {
            choiceColor.innerHTML += `<option value="${dataProduct.colors[i]}"> ${dataProduct.colors[i]}</option>`;
        }
    })

}
SelectedProductPage();



//FONCTIONS POUR LA PAGE PANIER

//fonction permettant de récupérer les données enregistrées dans le localStorage et de les convertir au format JSON

function cart() {
    let items = [];
    if (localStorage.getItem("cart") != null) {
    items = JSON.parse(localStorage.getItem("cart"));
    }
   return items;
}


//Fonction permettant d'ajouter les produits sur la page panier
function addedProduct(idProd, color, quantity) {
    if (quantity <= 0 || color == "") {
        return;
    }
    let productsOnCart = cart();
if (productsOnCart.length === 0 ) {
    productsOnCart = [[idProd, color, quantity]]; 
} else {
    let findItem = false;
    for (let i = 0; i < productsOnCart.length; i++) {
        if (idProd === productsOnCart[i][0] && color === productsOnCart[i][1] ) {
            findItem = true;
            productsOnCart[i][2] += quantity;
        }
    }
    if (findItem === false) {
        let product = [idProd, color, quantity]
        productsOnCart.push(product);
    }
}
    localStorage.setItem("cart", JSON.stringify(productsOnCart));
}


function chosenQty() {
    let quantity = document.getElementById("quantity");
    return quantity.value;

}

function chosenColor() {
    let color = document.getElementById("colors");
    return color.value;

}

const addToCard = document.getElementById("addToCart");

addToCard.addEventListener("click", () => {
    let quantity = parseInt(chosenQty());
    let color = chosenColor();
    if (quantity > 0 && quantity <= 100 && quantity != 0 && color != "") {

    addedProduct(idProduct, color, quantity);
    window.location.href = "./cart.html";
    } else {
        alert('Veuillez saisir correctement les champs requis.')
    }

});


