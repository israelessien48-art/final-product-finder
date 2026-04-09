// js/product.js

const container = document.getElementById("product-details");

// get product ID from URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function getProduct() {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await res.json();

    renderProduct(product);
  } catch (error) {
    console.error("Error loading product:", error);
    container.innerHTML = "<p>Failed to load product</p>";
  }
}

function renderProduct(product) {
  container.innerHTML = `
    <div class="product-detail">
      <img src="${product.image}" alt="${product.title}">
      <h2>${product.title}</h2>
      <p>${product.description}</p>
      <p><strong>$${product.price}</strong></p>
      <button onclick="goBack()">⬅ Back</button>
    </div>
  `;
}

// go back to homepage
function goBack() {
  window.location.href = "index.html";
}

getProduct();