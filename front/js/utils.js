//FONCTIONS POUR LA PAGE PANIER

//fonction permettant de récupérer les données enregistrées dans le localStorage et de les convertir au format JSON

function cart() {
    let items = [];
    if (localStorage.getItem("cart") != null) {
    items = JSON.parse(localStorage.getItem("cart"));
    }
   return items;
}

function getProductbyId (productsOnCart, product) {
    const indexProduct = productsOnCart.findIndex(item => {
        return item.productId === product.productId && product.color === item.color
    });
    return indexProduct !== -1 ? productsOnCart[indexProduct] : null;
}


function upsertProduct(productsOnCart, product, isEdit) {
    if (product.quantity <= 0 || product.color == "") {
        return;
    }
    const productOnCart = getProductbyId(productsOnCart, product);

    if(productOnCart) {
        const qty = isEdit ? product.quantity : productOnCart.quantity + product.quantity;
        productOnCart.quantity = qty;
    } else {
        productsOnCart.push({
            productId : product.productId,
            color : product.color,
            quantity : product.quantity
        });
    }
    return productsOnCart;
}


function chosenQty() {
    let quantity = document.getElementById("quantity");
    return parseInt(quantity.value);

}

function chosenColor() {
    let color = document.getElementById("colors");
    return color.value;

}


let cartInStorage = cart();

function quantitySelection(idProduct, color, quantity, price) {
    const product = {
        productId : idProduct,
        color : color,
        quantity : parseInt(quantity),
        price: price
      }

    // const oldProduct = getProductbyId(cartInStorage, product);
    cartInStorage = upsertProduct(cartInStorage, product, true);
    localStorage.setItem("cart", JSON.stringify(cartInStorage));
    showCart();
    }


function deleteItem() {
    for (i=0; i < cartInStorage.length; i++) {
        cartInStorage.splice(i, 1); 
        localStorage.setItem("cart", JSON.stringify(cartInStorage));
        window.location.href = "./cart.html";
    }
}






