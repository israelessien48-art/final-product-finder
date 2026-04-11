import { getProducts } from "./api.js";

const container = document.getElementById("product-container");
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");

let allProducts = [];

// Save favorites
function saveFavorite(product) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (!favorites.find(p => p.id === product.id)) {
    favorites.push(product);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Added to favorites ❤️");
  }
}

// Render products
function renderProducts(products) {
  container.innerHTML = "";

  if (!products || products.length === 0) {
    container.innerHTML = "<p>No products found</p>";
    return;
  }

  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${product.image || './images/product1.jpg'}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>$${product.price}</p>
      <button class="fav-btn">❤️</button>
    `;

    card.addEventListener("click", () => {
      window.location.href = `product.html?id=${product.id}`;
    });

    card.querySelector(".fav-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      saveFavorite(product);
    });

    container.appendChild(card);
  });
}

// Filters
function applyFilters() {
  const searchTerm = searchInput.value.toLowerCase();
  const category = categoryFilter.value;

  let filtered = allProducts;

  if (searchTerm) {
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(searchTerm)
    );
  }

  if (category !== "all") {
    filtered = filtered.filter(p => p.category === category);
  }

  renderProducts(filtered);
}

// Events
searchInput.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);

// Init
async function init() {
  container.innerHTML = "<p>Loading products...</p>";
  allProducts = await getProducts();
  renderProducts(allProducts);
}

init();