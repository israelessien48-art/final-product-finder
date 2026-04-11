const container = document.getElementById("product-details");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function getProduct() {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);

    if (!res.ok) throw new Error("Failed");

    const product = await res.json();

    renderProduct(product);

  } catch (error) {
    console.error(error);
    container.innerHTML = `
      <div class="product-detail">
        <img src="./images/product1.jpg">
        <h2>Fallback Product</h2>
        <p>Unable to load product details.</p>
        <button onclick="goBack()">⬅ Back</button>
      </div>
    `;
  }
}

function renderProduct(product) {
  container.innerHTML = `
    <div class="product-detail">
      <img src="${product.image || './images/product1.jpg'}">
      <h2>${product.title}</h2>
      <p>${product.description}</p>
      <p><strong>$${product.price}</strong></p>
      <button onclick="goBack()">⬅ Back</button>
    </div>
  `;
}

function goBack() {
  window.location.href = "index.html";
}

getProduct();