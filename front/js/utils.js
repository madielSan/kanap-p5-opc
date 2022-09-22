//FONCTIONS POUR LA PAGE PANIER
const cartSection = document.getElementById("cart__items");
const cartOrder = document.getElementsByClassName("cart__order");
const cartPrice = document.getElementsByClassName("cart__price");
const emptyCart = document.getElementsByTagName("h1");
//fonction permettant de récupérer les données enregistrées dans le localStorage et de les convertir au format JSON
function cart() {
  let items = [];
  if (localStorage.getItem("cart") != null) {
    items = JSON.parse(localStorage.getItem("cart"));
  }
  return items;
}

//permet de récupérer l'id d'un produit et de l'indexer.
function getProductbyId(productsOnCart, product) {
  if (productsOnCart) {
    const indexProduct = productsOnCart.findIndex((item) => {
      return (
        item.productId === product.productId && product.color === item.color
      );
    });
    return indexProduct !== -1 ? productsOnCart[indexProduct] : null;
  }
}

// permet d'ajouter les produits séléctionnés et de renvoyer les données dans le localStorage .
function upsertProduct(productsOnCart, product, isEdit) {
  if (product.quantity === undefined || product.color == "") {
    return;
  }
  const productOnCart = getProductbyId(productsOnCart, product);

  if (productOnCart) {
    // si la quantité d'un produit est modifiée dans le panier, sa donnée sera égale à la quantité + la quantité ajouté.
    const qty = isEdit
      ? product.quantity
      : productOnCart.quantity + product.quantity;
    productOnCart.quantity = qty;
  } else {
    productsOnCart.push({
      productId: product.productId,
      color: product.color,
      quantity: product.quantity,
    });
  }
  return productsOnCart;
}

let cartInStorage = cart();
// permet d'enregistrer les produits dont la quantité a été modifié, dans le localstorage puis d'afficher les nouveaux résultats en retournant le DOM à nouveau.
function quantitySelection(idProduct, color, quantity, price) {
  const product = {
    productId: idProduct,
    color: color,
    quantity: parseInt(quantity),
  };
  const oldproduct = getProductbyId(cartInStorage, product);

  // récupération du total actuelle
  currentTotalPrice = parseInt(document.getElementById("totalPrice").innerText);
  currentTotalQuantity = parseInt(
    document.getElementById("totalQuantity").innerText
  );

  const newTotalQuantity =
    currentTotalQuantity - oldproduct.quantity + parseInt(quantity);
  const newTotalPrice =
    currentTotalPrice -
    oldproduct.quantity * parseInt(price) +
    parseInt(quantity) * parseInt(price);
  cartInStorage = upsertProduct(cartInStorage, product, true);

  localStorage.setItem("cart", JSON.stringify(cartInStorage));
  document.getElementById("totalQuantity").innerHTML = newTotalQuantity;
  document.getElementById("totalPrice").innerHTML = newTotalPrice;

  if (!newTotalQuantity) {
    product.quantity = 0;
    cartInStorage = upsertProduct(cartInStorage, product, true);
    localStorage.setItem("cart", JSON.stringify(cartInStorage));
    document.getElementById("totalQuantity").innerHTML = 0;
    document.getElementById("totalPrice").innerHTML = currentTotalPrice;
    location.reload();
  }
}

// fonction permettant de récupérer la valeur de la quantité choisie du produit séléctionné par l'utilisateur
function chosenQty() {
  let quantity = document.getElementById("quantity");
  return parseInt(quantity.value);
}

// fonction permettant de récupérer la valeur de la couleur choisie du produit séléctionné par l'utilisateur
function chosenColor() {
  let color = document.getElementById("colors");
  return color.value;
}

//variable de récupération des données du panier enregistré dans le localStorage grâce à la fonction cart();

//permet de supprimer un produit du panier
function deleteItem(idProduct, color, quantity, price) {
  const product = {
    productId: idProduct,
    color: color,
    quantity: parseInt(quantity),
  };
  const oldproduct = getProductbyId(cartInStorage, product);

  // récupération du total actuelle
  currentTotalPrice = parseInt(document.getElementById("totalPrice").innerText);
  currentTotalQuantity = parseInt(
    document.getElementById("totalQuantity").innerText
  );

  const newTotalQuantity = currentTotalQuantity - oldproduct.quantity;
  const newTotalPrice =
    currentTotalPrice - oldproduct.quantity * parseInt(price);

  for (i = 0; i < cartInStorage.length; i++) {
    //s'il reste au moins un produit lors de la suppression
    if (newTotalQuantity !== 0 && newTotalPrice !== 0) {
      cartInStorage = cartInStorage.filter(
        (elt) =>
          elt.productId !== product.productId || elt.color !== product.color
      );
      localStorage.setItem("cart", JSON.stringify(cartInStorage));

      document.getElementById("totalQuantity").innerHTML = newTotalQuantity;
      document.getElementById("totalPrice").innerHTML = newTotalPrice;
    } else {
      cartOrder[0].innerHTML = "";
      cartPrice[0].innerHTML = "";
      emptyCart[0].innerHTML += " est tristement vide :( ";
      cartInStorage.splice(i, 1);
      localStorage.setItem("cart", JSON.stringify(cartInStorage));
    }
  }
}
