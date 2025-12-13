import { ProductCard } from "@/components/menu/MenuProductCard";
import { menuItems } from "@/shared/data/menu";

export default function MenuPage() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-10xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <header className="my-5 text-center lg:text-left">
          <h1 className="mt-4 text-5xl lg:text-9xl font-legquinne text-neutral-900">
            Candles
          </h1>
        </header>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-10">
          {menuItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
