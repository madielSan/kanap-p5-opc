const itemsSection = document.getElementById('items');
const apiUrl = 'http://localhost:3000/api/products';

function showItems() {
fetch(apiUrl)
.then((reponse) => reponse.json())
.then(dataItems => { console.table(dataItems)
    let sectionItems = document.getElementById("items");
    
    console.log(sectionItems);

    for (i = 0; i < dataItems.length; i++) {
        const item =
       `<a href= "./product.html?id${dataItems[i].__id}">
            <article>
                <img src="${dataItems[i].imageUrl}" alt="${dataItems[i].altTxt}"/>
                <h3 class="productName">${dataItems[i].name}</h3>
                <p class="productDescription">${dataItems[i].description}</p>
            </article>
        </a>`;
        sectionItems.innerHTML += item;
    }
})
.catch(function(error) {
    console.log(error);
  });

};

showItems();

