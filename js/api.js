const BASE_URL = "https://fakestoreapi.com/products";

export async function getProducts() {
  try {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("API Error:", error);

    // 👇 fallback so your site NEVER looks empty
    return [
      {
        id: 1,
        title: "Sample Product",
        price: 100,
        category: "electronics",
        image: "https://via.placeholder.com/150",
        description: "Fallback product (API failed)"
      }
    ];
  }
}