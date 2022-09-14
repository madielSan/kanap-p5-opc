//récupérer l'id de la commande dans l'url de la page de confirmation.
const urlId = window.location.href;
const url = new URL(urlId);
const orderId = url.searchParams.get("orderId");


// Affiche le numéro de commande (order id) sur la page de confirmation
document.getElementById("orderId").innerHTML = orderId;