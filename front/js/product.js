const str = window.location;
const url = new URL(str);
const idProduct = url.searchParams.get("id"); /* permet de récupérer l'id du produit pour l'utiliser dans l'URL */
const urlProduct = "http://localhost:3000/api/products/" + idProduct;
//afficher le produit selectionnés
function SelectedProductPage() {
  fetch(urlProduct)
    .then((res) => res.json())
    .then((dataProduct) => {
      //Récupération du titre de la page avec le nom du produit
      let productPageTitle = document.querySelector("title");
      productPageTitle.innerHTML = dataProduct.name;
      //récupération de l'image du produit
      let imgProduct = document.createElement("img");
      document.querySelector(".item__img").appendChild(imgProduct);
      imgProduct.src = dataProduct.imageUrl;
      imgProduct.setAttribute("alt", dataProduct.altTxt);
      //Récupération du nom du produit
      let productName = document.getElementById("title");
      productName.innerHTML = dataProduct.name;
      // récupération du prix du produit
      let priceProduct = document.getElementById("price");
      priceProduct.innerHTML = dataProduct.price;
      //récupération de la description du produit
      let descriptionProduct = document.getElementById("description");
      descriptionProduct.innerHTML = dataProduct.description;
      // récupération des différentes option de couleurs du produit

      for (i = 0; i < dataProduct.colors.length; i++) {
        let choiceColor = document.createElement("option");
        document.getElementById("colors").appendChild(choiceColor);
        choiceColor.setAttribute = ("value", dataProduct.colors[i]);
        choiceColor.innerHTML = dataProduct.colors[i];
      }
    })
}
SelectedProductPage();

const addToCard = document.getElementById("addToCart");
//au click permet d'enregistrer les paramètres (couleurs quantités) choisis dans le localStorage.
addToCard.addEventListener("click", () => {
  let quantity = chosenQty();
  let color = chosenColor();
  const product = {
    productId: idProduct,
    color,
    quantity,
  };
  if (quantity > 0 && quantity <= 100 && quantity != 0 && color != "") {
    let panier = cart();
    panier = upsertProduct(panier, product, false);
    localStorage.setItem("cart", JSON.stringify(panier));
    window.location.href = "./cart.html";
  } else {
    alert("Veuillez saisir correctement les champs requis.");
  }
});
