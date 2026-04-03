// js/app.js
import { getProducts } from "./api.js";

const container = document.getElementById("product-container");
const searchInput = document.getElementById("search-input");

let allProducts = [];

// Render products
function renderProducts(products) {
  container.innerHTML = "";

  if (products.length === 0) {
    container.innerHTML = "<p>No products found</p>";
    return;
  }

  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>$${product.price}</p>
    `;

    container.appendChild(card);
  });
}

// Filter products
function filterProducts(searchTerm) {
  const filtered = allProducts.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  renderProducts(filtered);
}

// Search event
searchInput.addEventListener("input", (e) => {
  filterProducts(e.target.value);
});

// Initialize app
async function init() {
  allProducts = await getProducts();
  renderProducts(allProducts);
}

init();