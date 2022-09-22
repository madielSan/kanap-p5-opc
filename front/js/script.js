const apiUrl = "http://localhost:3000/api/products"; //lien vers l'API
// fonctions permettant d'afficher les produits de l'API sur la page d'accueil
function showItems() {
  fetch(apiUrl)
    .then((reponse) => reponse.json())
    .then((dataItems) => {
      let sectionItems = document.getElementById("items");
      for (i = 0; i < dataItems.length; i++) {
        let linkItem = document.createElement("a");
        sectionItems.appendChild(linkItem);
        linkItem.href = "./product.html?id=" + dataItems[i]._id;

        let articleItem = document.createElement("article");
        linkItem.appendChild(articleItem);

        let imgItem = document.createElement("img");
        articleItem.appendChild(imgItem);
        imgItem.src = dataItems[i].imageUrl;
        imgItem.setAttribute("alt", dataItems[i].altTxt);

        let itemName = document.createElement("h3");
        articleItem.appendChild(itemName);
        itemName.className = "productName";
        itemName.innerHTML = dataItems[i].name;

        let itemDescription = document.createElement("p");
        articleItem.appendChild(itemDescription);
        itemDescription.className = "productDescription";
        itemDescription.innerHTML = dataItems[i].description;
      }
    });
}

showItems();
