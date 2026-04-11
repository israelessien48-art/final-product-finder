const BASE_URL = "https://fakestoreapi.com/products";

export async function getProducts() {
  try {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return await response.json();

  } catch (error) {
    console.error("API Error:", error);

    // ✅ fallback (guarantees products show)
    return [
      {
        id: 1,
        title: "Sample Product 1",
        price: 50,
        category: "electronics",
        image: "./images/product1.jpg",
        description: "Local fallback product"
      },
      {
        id: 2,
        title: "Sample Product 2",
        price: 80,
        category: "men's clothing",
        image: "./images/product2.jpg",
        description: "Local fallback product"
      }
    ];
  }
}