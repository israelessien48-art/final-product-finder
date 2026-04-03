import { getProducts } from "./api.js";

const container = document.getElementById("product-container");
const searchInput = document.getElementById("search-input");

let products = [];

function render(items) {
  container.innerHTML = "";
  items.forEach(p => {
    container.innerHTML += `
      <div>
        <img src="${p.image}" width="100">
        <h3>${p.title}</h3>
        <p>$${p.price}</p>
      </div>
    `;
  });
}

searchInput.addEventListener("input", (e) => {
  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(e.target.value.toLowerCase())
  );
  render(filtered);
});

async function init() {
  products = await getProducts();
  render(products);
}

init();