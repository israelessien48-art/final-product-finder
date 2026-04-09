// js/app.js
import { getProducts } from "./api.js";

const container = document.getElementById("product-container");
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");

let allProducts = [];

// 🔹 Render products
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

    // ✅ CLICK → go to product page
    card.addEventListener("click", () => {
      window.location.href = `product.html?id=${product.id}`;
    });

    container.appendChild(card);
  });
}

// 🔹 Combined filter (search + category)
function applyFilters() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;

  let filtered = allProducts;

  // filter by search
  if (searchTerm) {
    filtered = filtered.filter(product =>
      product.title.toLowerCase().includes(searchTerm)
    );
  }

  // filter by category
  if (selectedCategory !== "all") {
    filtered = filtered.filter(product =>
      product.category === selectedCategory
    );
  }

  renderProducts(filtered);
}

// 🔹 Events
searchInput.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);

// 🔹 Initialize app
async function init() {
  allProducts = await getProducts();
  renderProducts(allProducts);
}

init();