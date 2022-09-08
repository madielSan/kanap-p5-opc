
const cartInStorage = JSON.parse(localStorage.getItem("cart"));

function quantitySelection(idProduct, color, quantity) {
    for(let i = 0; i < cartInStorage.length; i++) {
        if (idProduct === cartInStorage[i][0] && color === cartInStorage[i][1]) {
            cartInStorage[i][2] = quantity;
        }
       localStorage.setItem("cart", JSON.stringify(cartInStorage));
       window.location.href = "./cart.html";
    }
}


function deleteItem() {
    for (i=0; i < cartInStorage.length; i++) {
        cartInStorage.splice(i, 1); 
        localStorage.setItem("cart", JSON.stringify(cartInStorage));
        window.location.href = "./cart.html";
    }
}

console.log(cartInStorage);
// DOM DU PANIER
const cartSection = document.getElementById("cart__items");
const cartOrder = document.getElementsByClassName("cart__order");
const cartPrice = document.getElementsByClassName("cart__price");
const emptyCart = document.getElementsByTagName("h1")



//fonction fetch afin de récupérer et d'afficher les produits ajoutés dans le panier


function showCart() {
    let totalQuantity= 0;
    let totalPrice = 0;
    if (cartInStorage.length != 0) {
        for (let i = 0; i < cartInStorage.length; i++ ) {
            let idProduct = cartInStorage[i][0];
            let color = cartInStorage[i][1];
            let quantity = cartInStorage[i][2];
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
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" onchange="quantitySelection('${idProduct}', '${color}', this.value)" value="${cartInStorage[i][2]}">
                            </div>
                                <div class="cart__item__content__settings__delete">
                                <p class="deleteItem" onclick="deleteItem('${idProduct}', '${color}')">Supprimer</p>
                            </div>
                       </div>
                    </div>
                </article>`;
                totalQuantity += parseInt(cartInStorage[i][2]);
                document.getElementById("totalQuantity").innerHTML = totalQuantity;
                totalPrice += dataPanier.price * cartInStorage[i][2];
                console.log(totalPrice);
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
    }

}
showCart();




