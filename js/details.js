const endpoint = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE0ODU1ZDFjMjUwNDAwMTUxYWI2NzQiLCJpYXQiOjE3NDYxNzUzMjYsImV4cCI6MTc0NzM4NDkyNn0.hSfUZaK--8TG8yfIrnCvC3TzFrcm7D_LBs2d6MqAKxM";

const params = new URLSearchParams(window.location.search);
const productId = params.get("productId");

if (productId) {
  fetch(`${endpoint}${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((resp) => {
      if (resp.ok) return resp.json();
      else throw new Error("Errore nel recupero del prodotto");
    })
    .then((product) => {
      document.getElementById("productName").innerText = product.name;
      document.getElementById("productBrand").innerText = `Marca: ${product.brand}`;
      document.getElementById("productDescription").innerText = `Descrizione prodotto: ${product.description}`;
      document.getElementById("productPrice").innerText = product.price;
      document.getElementById("productImage").src = product.imageUrl;
      document.getElementById("productImage").alt = product.name;
    })
    .catch((err) => {
      console.error(err);
      alert("Errore nel caricamento del prodotto.");
    });
} else {
  alert("Nessun ID prodotto trovato.");
}
