// DOM DU PANIER
const cartSection = document.getElementById("cart__items");
const cartOrder = document.getElementsByClassName("cart__order");
const cartPrice = document.getElementsByClassName("cart__price");
const emptyCart = document.getElementsByTagName("h1");



function showCart() {
    let totalQuantity= 0;
    let totalPrice = 0;
    cartSection.innerHTML = "";
    if (cartInStorage != 0 && cartInStorage != null) {
        for (let i = 0; i < cartInStorage.length; i++ ) {
            let idProduct = cartInStorage[i].productId;
            let color = cartInStorage[i].color;
            let quantity = cartInStorage[i].quantity;
            let urlPanier = 'http://localhost:3000/api/products/' + idProduct;
            if(quantity > 0) {
            fetch(urlPanier)
            .then(reponse => reponse.json())
            .then(dataPanier => {
                console.table(dataPanier);
                cartSection.innerHTML +=
                `<article class="cart__item" data-id="${idProduct}" data-color="${color}">
                    <div class="cart__item__img">
                        <img src="${dataPanier.imageUrl}" alt="${dataPanier.altTxt}"/>
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>${dataPanier.name}</h2>
                            <p>${color}</p>
                            <p>${dataPanier.price}&euro;</p>
                         </div>
                         <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                                <p>Qté : </p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" oninput="quantitySelection('${idProduct}', '${color}', this.value, '${dataPanier.price}')" value="${cartInStorage[i].quantity}">
                            </div>
                                <div class="cart__item__content__settings__delete">
                                <p class="deleteItem" onclick="deleteItem('${idProduct}', '${color}')">Supprimer</p>
                            </div>
                       </div>
                    </div>
                </article>`;
                totalQuantity += parseInt(cartInStorage[i].quantity);
                document.getElementById("totalQuantity").innerHTML = totalQuantity;

                totalPrice += dataPanier.price * cartInStorage[i].quantity;
                document.getElementById("totalPrice").innerHTML = totalPrice;
       
            });
        } else {
                cartOrder[0].innerHTML = "";
                cartPrice[0].innerHTML = "";
                emptyCart[0].innerHTML += ` est tristement vide :( `
                localStorage.clear();
            }
        }
        
    } else {
        cartOrder[0].innerHTML = "";
        cartPrice[0].innerHTML = "";
        emptyCart[0].innerHTML += ` est tristement vide :( `
        localStorage.clear();
    }

}
showCart();

// Contrôle du formulaire
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");
const orderBtn = document.getElementById("order");
const formUser = document.querySelectorAll("form input");


function dataFormControl() {
    const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
    firstName.addEventListener("change", function (event){
        if (/^[A-Z][A-Za-z\é\è\ê\-]+$/.test(event.target.value)) {
            firstNameErrorMsg.innerHTML = "";
        } else {
            firstNameErrorMsg.innerHTML = "Veuillez saisir un prénom (1ère lettre en majuscule. Chiffres, symboles ou espaces invalides)."
        }

    });

    const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
    lastName.addEventListener("change", function (event){
        if (/^[A-Z][A-Za-z\é\è\ê\-]+$/.test(event.target.value)) {
            lastNameErrorMsg.innerHTML = "";
        } else {
            lastNameErrorMsg.innerHTML = "Veuillez saisir un nom (1ère lettre en majuscule. Chiffres, symboles ou espaces invalides)."
        }

    });

    const addressErrorMsg = document.getElementById("addressErrorMsg");
    address.addEventListener("change", function (event){
        if (/^.{7,128}$/.test(event.target.value)) {
            addressErrorMsg.innerHTML = "";
        } else {
            addressErrorMsg.innerHTML = "Veuillez saisir une adresse valide"
        }

    });
    
    const cityErrorMsg = document.getElementById("cityErrorMsg");
    city.addEventListener("change", function (event){
        if (/^[A-Z][A-Za-z\é\è\ê\-\s]+$/.test(event.target.value)) {
            cityErrorMsg.innerHTML = "";
        } else {
            cityErrorMsg.innerHTML = "Veuillez saisir une ville (1ère lettre en majuscule. Chiffres ou symboles invalides)."
        }

    });

    const emailErrorMsg = document.getElementById("emailErrorMsg");
    const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)/;
    email.addEventListener("change", function (event){
        if ( regexEmail.test(event.target.value)) {
            emailErrorMsg.innerHTML = "";
        } else {
            emailErrorMsg.innerHTML = "Veuillez saisir un email complète et valide."
        }

    });

}


dataFormControl();


