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
    return [];
  }
}