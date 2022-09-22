// DOM DU PANIER

// permet de récupérer les données des produits séléctionnés et enregitrés dans le localStorage et de les afficher.
function showCart() {
  let totalQuantity = 0;
  let totalPrice = 0;
//s'il y a des produits enregistrés dans le localStorage
  if (cartInStorage != "") {
    for (let i = 0; i < cartInStorage.length; i++) {
      let idProduct = cartInStorage[i].productId;
      let color = cartInStorage[i].color;
      let quantity = cartInStorage[i].quantity;
      let urlPanier = "http://localhost:3000/api/products/" + idProduct;

      fetch(urlPanier)
        .then((reponse) => reponse.json())
        .then((dataPanier) => {
          let article = document.createElement("article");
          document.getElementById("cart__items").appendChild(article);
          article.className = "cart__item";
          article.setAttribute("data-id", idProduct);
          article.setAttribute("data-color", color);

          let divImgProduct = document.createElement("div");
          article.appendChild(divImgProduct);
          divImgProduct.className = "cart__item__img";

          let imgProduct = document.createElement("img");
          divImgProduct.appendChild(imgProduct);
          imgProduct.src = dataPanier.imageUrl;
          imgProduct.setAttribute("alt", dataPanier.altTxt);

          let cartItemContent = document.createElement("div");
          article.appendChild(cartItemContent);
          cartItemContent.className = "cart__item__content";

          let cartItemContentDescription = document.createElement("div");
          cartItemContent.appendChild(cartItemContentDescription);
          cartItemContentDescription.className =
            "cart__item__content__description";

          let itemTitle = document.createElement("h2");
          cartItemContentDescription.appendChild(itemTitle);
          itemTitle.innerHTML = dataPanier.name;

          let itemColor = document.createElement("p");
          cartItemContentDescription.appendChild(itemColor);
          itemColor.innerHTML = color;

          let itemPrice = document.createElement("p");
          cartItemContentDescription.appendChild(itemPrice);
          itemPrice.innerHTML = dataPanier.price + "&ensp;&euro;";

          let cartItemContentSettings = document.createElement("div");
          cartItemContent.appendChild(cartItemContentSettings);
          cartItemContentSettings.className = "cart__item__content__settings";

          let cartItemContentSettingsQty = document.createElement("div");
          cartItemContentSettings.appendChild(cartItemContentSettingsQty);
          cartItemContentSettingsQty.className =
            "cart__item__content__settings__quantity";

          let qty = document.createElement("p");
          cartItemContentSettingsQty.appendChild(qty);
          qty.innerHTML = "Qté : ";

          let itemQuantity = document.createElement("input");
          cartItemContentSettingsQty.appendChild(itemQuantity);
          itemQuantity.value = quantity;
          itemQuantity.className = "itemQuantity";
          itemQuantity.setAttribute("value", "quantity");
          itemQuantity.setAttribute("type", "number");
          itemQuantity.setAttribute("min", "1");
          itemQuantity.setAttribute("max", "100");
          itemQuantity.setAttribute("name", "itemQuantity");
          itemQuantity.setAttribute("oninput", "validity.valid||(value='');");
          itemQuantity.addEventListener("change", (e) => {
            e.preventDefault;
            quantitySelection(
              idProduct,
              color,
              itemQuantity.value,
              dataPanier.price
            );
          });

          let cartItemContentSettingsDelete = document.createElement("div");
          cartItemContentSettings.appendChild(cartItemContentSettingsDelete);

          let itemDelete = document.createElement("p");
          cartItemContentSettingsDelete.appendChild(itemDelete);
          itemDelete.className = "deleteItem";
          itemDelete.innerHTML = "<br>Supprimer";
          itemDelete.style.cursor = "pointer";

          itemDelete.addEventListener("mouseover", (event) => {
            event.preventDefault;
            itemDelete.style.textDecoration = "underline";
          });
          itemDelete.addEventListener("mouseout", (event) => {
            event.preventDefault;
            itemDelete.style.textDecoration = "";
          });

          itemDelete.addEventListener("click", (event) => {
            event.preventDefault;
            document.getElementById("cart__items").removeChild(article);
            deleteItem(idProduct, color, itemQuantity.value, dataPanier.price);
          });

          totalQuantity += parseInt(quantity);
          document.getElementById("totalQuantity").innerHTML = totalQuantity;

          totalPrice += dataPanier.price * quantity;
          document.getElementById("totalPrice").innerHTML = totalPrice;
        });
    }
  } else {
    cartOrder[0].innerHTML = "";
    cartPrice[0].innerHTML = "";
    emptyCart[0].innerHTML += " est tristement vide :( ";
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
const regexEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)/;

// Fonctions de vérification des valeurs regEx pour chaque entrée dans le formulaire si le formulaire est affichée.

//Vérification du prénom
const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
function firstNameValidation(firstName) {
  if (firstName) {
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
  if (lastName) {
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
  if (address) {
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
  if (city) {
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
  if (email) {
    if (regexEmail.test(email) == false) {
      return false;
    } else {
      emailErrorMsg.innerHTML = "";
      return true;
    }
  }
}

//Si le bouton de confirmation est affichée et que la commande est confirmée grâce au clique sur le bouton d'envoi du formulaire.
if (orderBtn) {
  orderBtn.addEventListener("click", function (event) {
    event.preventDefault();
    let prenom = firstNameValidation(firstName.value);
    let nom = lastNameValidation(lastName.value);
    let adresse = addressValidation(address.value);
    let ville = cityValidation(city.value);
    let mail = emailValidation(email.value);
    /* Vérifie que les entrées respecte bien les fonctions de vérification regEx (!== false)
    et vérifie si les valeurs entrées par l'utilisateur ne sont pas vides (!== "");
    Si c'est le cas alors les données du formulaire rempli seront enregistrées
    et l'utilisateur sera renvoyés vers la page de confirmation (method: POST)... */
    if (
      prenom !== false &&
      firstName.value !== "" &&
      nom !== false &&
      lastName.value !== "" &&
      adresse !== false &&
      address.value !== "" &&
      ville !== false &&
      city.value !== "" &&
      mail !== false &&
      email.value != ""
    ) {
    //tableau des produits
      let productsDetails = [];
      for (let i = 0; i < cartInStorage.length; i++) {
        productsDetails.push(cartInStorage[i].productId);
      }

      //contient l'obet contact et le tableau des produits panier.
      const userDetails = {
        contact: {
          firstName: firstName.value,
          lastName: lastName.value,
          address: address.value,
          city: city.value,
          email: email.value,
        },
        products: productsDetails,
      };
      //contient la requête POST permettant d'envoyer les information de commande vers l'API au format JSON
      const options = {
        method: "POST",
        body: JSON.stringify(userDetails),
        headers: { "Content-type": "application/json" },
      };
      fetch("http://localhost:3000/api/products/order", options)
        .then((reponse) => reponse.json())
        .then((dataConfirm) => {
          localStorage.clear();
          window.location.href = "confirmation.html?orderId=" + dataConfirm.orderId;
        });
    } else {
      /* Si les entrées du formulaire ne correspondent pas, alors l'utilisateur verra les messages d'erreurs suivants sur les champs concernés */
      if (prenom == false || firstName.value === "") {
        firstNameErrorMsg.innerHTML =
          "Entrez un prénom valide sans chiffre, ni symbole ou espace, en commençant par une majuscule.";
      }
      if (nom == false || lastName.value === "") {
        lastNameErrorMsg.innerHTML =
          "Entrez un nom valide sans chiffre, ni symbole ou espace, en commençant par une majuscule.";
      }
      if (adresse == false || address.value === "") {
        addressErrorMsg.innerHTML = "Entrez une adresse valide.";
      }
      if (ville == false || city.value === "") {
        cityErrorMsg.innerHTML =
          "Entrez une commune valide sans chiffre ni symbole, en commençant par une majuscule.";
      }
      if (mail == false || email.value === "") {
        emailErrorMsg.innerHTML =
          "Entrez une adresse e-mail valide (xyz@exemple.com).";
      }
      return;
    }
  });
}
