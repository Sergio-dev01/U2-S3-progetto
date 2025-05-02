const endpoint = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE0ODU1ZDFjMjUwNDAwMTUxYWI2NzQiLCJpYXQiOjE3NDYxNzUzMjYsImV4cCI6MTc0NzM4NDkyNn0.hSfUZaK--8TG8yfIrnCvC3TzFrcm7D_LBs2d6MqAKxM";

const fetchProducts = () => {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "inline-block";
  fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Errore nel recupero dei prodotti");
      }
    })
    .then((products) => {
      console.log(products);
      const row = document.getElementById("productsRow");
      products.forEach((product) => {
        const col = document.createElement("div");
        col.className = "col-md-4 mb-4";

        col.innerHTML = `
          <div class="card h-100">
            <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}" />
            <div class="card-body d-flex">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${product.description}</p>
              <p class="card-text"><strong>Brand:</strong> ${product.brand}</p>
              <p class="card-text"><strong>Prezzo:</strong> €${product.price}</p>
              <div class="mt-auto">
                <a href="backoffice.html?productId=${product._id}" class="btn btn-warning me-2">Modifica</a>
                <a href="details.html?productId=${product._id}" class="btn btn-primary">Scopri di più</a>
              </div>
            </div>
          </div>
        `;

        row.appendChild(col);
      });
    })
    .catch((error) => {
      console.error(error);
      alert("Si è verificato un errore nel caricamento dei prodotti.");
    })
    .finally(() => {
      spinner.style.display = "none";
    });
};

window.onload = () => {
  fetchProducts();
};
