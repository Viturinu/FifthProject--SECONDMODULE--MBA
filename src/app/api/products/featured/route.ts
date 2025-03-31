import data from "../data.json";

export async function GET() {
  const featuredProduct = data.products.filter((product) => product.featured);

  return Response.json(featuredProduct);
}
