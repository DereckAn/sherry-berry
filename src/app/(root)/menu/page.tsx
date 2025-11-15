import { ProductCard } from "@/components/menu/MenuProductCard";
import { menuItems } from "@/shared/data/menu";

export default function MenuPage() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <header className="mb-14 text-center lg:text-left">
          <p className="text-[12px] uppercase tracking-[0.4em] text-neutral-400">
            Colección permanente
          </p>
          <h1 className="mt-4 text-4xl sm:text-5xl font-serif text-neutral-900">
            Shop all candles
          </h1>
          <p className="mt-4 text-base text-neutral-600 max-w-2xl mx-auto lg:mx-0">
            Velas inspiradas en lugares y recuerdos. Tonos neutros, fotografía
            limpia y un grid ordenado para que tus clientas encuentren su aroma
            favorito de un vistazo.
          </p>
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
