import { getCatalogGraphQL } from "@/actions/GetCatalogGraphql";
import { ProductCard } from "@/components/menu/MenuProductCard";
import type { Product } from "@/shared/types/cart";

function formatPrice(amount: number): string {
  return `$${(amount / 100).toFixed(2)} CAD`;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&");
}

export default async function MenuPage() {
  const catalogData = await getCatalogGraphQL();
  const nodes = catalogData?.catalog?.nodes || [];

  const products: Product[] = nodes.map((item) => {
    const firstVariation = item.variations?.[0];
    const priceAmount = firstVariation?.priceMoney?.amount || 0;

    return {
      id: item.id,
      title: item.name?.trim() || "",
      variant: firstVariation?.name || "Regular",
      description: item.descriptionHtml ? stripHtml(item.descriptionHtml) : "",
      price: formatPrice(priceAmount),
      priceValue: priceAmount / 100,
      image: item.images?.[0]?.url || "/placeholder.jpg",
    };
  });

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-10xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <header className="my-5 text-center lg:text-left">
          <h1 className="mt-4 text-5xl lg:text-9xl font-legquinne text-neutral-900">
            Candles
          </h1>
        </header>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
