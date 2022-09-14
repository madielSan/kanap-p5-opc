// DOM DU PANIER
const cartSection = document.getElementById("cart__items");
const cartOrder = document.getElementsByClassName("cart__order");
const cartPrice = document.getElementsByClassName("cart__price");
const emptyCart = document.getElementsByTagName("h1");

// permet de récupérer les données des produits séléctionnés et enregitrés dans le localStorage et de les afficher.
function showCart() {
    let totalQuantity = 0;
    let totalPrice = 0;
        cartSection.innerHTML = "";
    if (cartInStorage != 0 && cartInStorage != null) {
        for (let i = 0; i < cartInStorage.length; i++ ) {
            let idProduct = cartInStorage[i].productId;
            let color = cartInStorage[i].color;
            let quantity = cartInStorage[i].quantity;
            let urlPanier = 'http://localhost:3000/api/products/' + idProduct;
            if(quantity >= 0 && quantity != null) {
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
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" onchange="quantitySelection('${idProduct}', '${color}', this.value)" value="${cartInStorage[i].quantity}">
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

// objets du formulaire
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");
const orderBtn = document.getElementById("order");
const formUser = document.querySelectorAll("form input");

// regEx 
const regexName = /^[A-Z][A-Za-z\é\è\ê\-]+$/;
const regexCity = /^[A-Z][A-Za-z\é\è\ê\-\s]+$/;
const regexAddress = /^.{1,128}$/;
const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)/;


// Fonctions de vérification des valeurs regEx pour chaque entrée dans le formulaire si le formulaire est affichée.

//Vérification du prénom
    const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
    function firstNameValidation(firstName) {
        if(firstName) {
            if (regexName.test(firstName) == false) {
                return false;
            } else {
                firstNameErrorMsg.innerHTML = "";
                return true;
            }
        }
    }
    //Vérification du nom
    const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
    function lastNameValidation(lastName) {
        if(lastName) {
            if (regexName.test(lastName) == false) {
                return false;
            } else {
                lastNameErrorMsg.innerHTML = "";
                return true;
            }
        }
    }
    //vérification de l'adresse
    const addressErrorMsg = document.getElementById("addressErrorMsg");
    function addressValidation(address) {
        if(address) {
            if (regexAddress.test(address) == false) {
                return false;
            } else {
                addressErrorMsg.innerHTML = "";
                return true;
            }
        }
    }
    //vérification de la ville
    const cityErrorMsg = document.getElementById("cityErrorMsg");
    function cityValidation(city) {
        if(city) {
            if (regexCity.test(city) == false) {
                return false;
            } else {
                cityErrorMsg.innerHTML = "";
                return true;
            }
        }
    }
    //vérification de l'adresse e-mail
    const emailErrorMsg = document.getElementById("emailErrorMsg");
    function emailValidation(email) {
        if(email) {
            if (regexEmail.test(email) == false) {
                return false;
            } else {
                emailErrorMsg.innerHTML = "";
                return true;
            }
        }
    }

//Si le bouton de confirmation est affichée et que la commande est confirmée grâce au clique sur le bouton d'envoi du formulaire. 
if(orderBtn) {
orderBtn.addEventListener("click", function (event) {
    event.preventDefault();
    let prenom = firstNameValidation(firstName.value);
    let nom = lastNameValidation(lastName.value);
    let adresse = addressValidation(address.value);
    let ville = cityValidation(city.value);
    let mail = emailValidation(email.value);
    /* Vérifie que les entrées respecte bien les fonctions de vérification regEx (!== false) et vérifie si les valeurs entrées par l'utilisateur ne sont pas vides (!== "");
    Si c'est le cas alors les données seront enregistrées et l'utilisateur sera renvoyés vers la page de confirmation... */
    if(prenom !== false && firstName.value !== "" && nom !== false && lastName.value !== "" && adresse !== false && address.value !== "" && ville !== false && city.value !== "" && mail !== false && email.value != "") {
        
        let productsDetails = [];

        for (let i = 0; i < cartInStorage.length; i++) {
            productsDetails.push(cartInStorage[i].productId);
        }

    const userDetails = {
        contact: {
            firstName : firstName.value,
            lastName : lastName.value,
            address : address.value,
            city : city.value,
            email : email.value
        },
        products : productsDetails
    }

    const options = {
        method: "POST",
        body: JSON.stringify(userDetails),
        headers : {"Content-type": "application/json"}
    }
     fetch('http://localhost:3000/api/products/order', options)
     .then(reponse => reponse.json())
     .then(dataConfirm => {
        localStorage.clear();
         window.location.href = `confirmation.html?orderId=${dataConfirm.orderId}`;
         
     })
     .catch(error => {
        console.log(error)
     })
    } else { /* Si les entrées du formulaire ne correspondent pas, alors l'utilisateur verra les messages d'erreurs suivants sur les champs concernés */
          if (prenom == false || firstName.value === "") {
            firstNameErrorMsg.innerHTML = "Entrez un prénom valide sans chiffre, ni symbole ou espace.";
          }
          if (nom == false || lastName.value === "") {
            lastNameErrorMsg.innerHTML = "Entrez un nom valide sans chiffre, ni symbole ou espace.";
          }
          if (adresse == false || address.value === "") {
            addressErrorMsg.innerHTML = "Entrez une adresse valide.";
          }
          if (ville == false || city.value === "") {
            cityErrorMsg.innerHTML = "Entrez une commune valide sans chiffre ni symbole.";
          }
          if (mail == false || email.value === "") {
            emailErrorMsg.innerHTML = "Entrez une adresse e-mail valide (xyz@exemple.com).";
          }
          return;
    }

}
)}