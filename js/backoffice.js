const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE0ODU1ZDFjMjUwNDAwMTUxYWI2NzQiLCJpYXQiOjE3NDYxNzUzMjYsImV4cCI6MTc0NzM4NDkyNn0.hSfUZaK--8TG8yfIrnCvC3TzFrcm7D_LBs2d6MqAKxM";
const endpoint = "https://striveschool-api.herokuapp.com/api/product/";

const form = document.getElementById("productForm");
const params = new URLSearchParams(window.location.search);
const productId = params.get("productId");

if (productId) {
  fetch(endpoint + productId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore nel caricamento");
      }
    })
    .then((product) => {
      document.getElementById("name").value = product.name;
      document.getElementById("description").value = product.description;
      document.getElementById("brand").value = product.brand;
      document.getElementById("imageUrl").value = product.imageUrl;
      document.getElementById("price").value = product.price;

      const backBtn = document.getElementById("backToHomeBtn");
      document.getElementById("backToHomeBtn").classList.remove("d-none");
      document.getElementById("backToHomeBtn").addEventListener("click", () => {
        window.location.href = "index.html";
      });

      document.getElementById("deleteBtn").classList.remove("d-none");
      document.getElementById("deleteBtn").addEventListener("click", () => {
        const confirmDelete = confirm("Sei sicuro di voler eliminare questo prodotto?");
        if (confirmDelete) {
          fetch(endpoint + productId, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => {
              if (res.ok) {
                alert("Prodotto eliminato con successo!");
                window.location.href = "index.html";
              } else {
                throw new Error("Errore nell'eliminazione");
              }
            })
            .catch((err) => {
              console.error(err);
              alert("Errore durante l'eliminazione.");
            });
        }
      });
    })
    .catch((err) => {
      console.error(err);
      alert("Errore nel caricamento del prodotto.");
    });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const newProduct = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("imageUrl").value,
    price: parseFloat(document.getElementById("price").value),
  };

  const method = productId ? "PUT" : "POST";
  const url = productId ? endpoint + productId : endpoint;

  fetch(url, {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore nel salvataggio");
      }
    })
    .then(() => {
      alert("Prodotto salvato con successo!");
      form.reset();
    })
    .catch((err) => {
      console.error(err);
      alert("Errore nel salvataggio.");
    });
});

const resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", function (e) {
  const confirmReset = confirm("Sei sicuro di voler resettare il modulo? I dati inseriti andranno persi.");
  if (!confirmReset) {
    e.preventDefault();
  }
});
