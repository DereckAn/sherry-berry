import Image from "next/image";

const menuItems = [
  {
    id: "mountain-air",
    title: "Mountain Air | Lata Pintada",
    variant: "Colección esencial",
    price: "$32.00 CAD",
    image: "/images/nvela.png",
  },
  {
    id: "vineyard",
    title: "The Vineyard | Lata Pintada",
    variant: "Edición floral",
    price: "$32.00 CAD",
    image: "/images/velas2.webp",
  },
  {
    id: "laundry-day",
    title: "Laundry Day | Lata Pintada",
    variant: "Notas frescas",
    price: "$32.00 CAD",
    image: "/images/velas3.webp",
  },
  {
    id: "hey-beautiful",
    title: "Hey Beautiful | Lata Pintada",
    variant: "Colección floral",
    price: "$32.00 CAD",
    image: "/images/velas4.webp",
  },
  {
    id: "tobacco-flower",
    title: "Tobacco Flower | Lata Pintada",
    variant: "Blend especiado",
    price: "$32.00 CAD",
    image: "/images/velas5.webp",
  },
  {
    id: "lakehouse",
    title: "Lakehouse | Lata Pintada",
    variant: "Notas acuáticas",
    price: "$32.00 CAD",
    image: "/images/velas6.webp",
  },
  {
    id: "alpine-meadow",
    title: "Alpine Meadow | Lata Pintada",
    variant: "Herbal & verde",
    price: "$32.00 CAD",
    image: "/images/velas7.webp",
  },
  {
    id: "wild-prairie",
    title: "Wild Prairie | Lata Pintada",
    variant: "Colección botánica",
    price: "$32.00 CAD",
    image: "/images/velas8.webp",
  },
  {
    id: "cedar-grove",
    title: "Cedar Grove | Lata Pintada",
    variant: "Notas amaderadas",
    price: "$32.00 CAD",
    image: "/images/velas9.webp",
  },
];

type Product = (typeof menuItems)[number];

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex flex-col items-start">
      <div className="relative w-full max-w-[420px] aspect-square">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 320px"
          className="object-cover"
        />
      </div>

      <div className="mt-2 text-start space-y-2">
        <h3 className="text-base font-semibold  font-josefin gtext-neutral-900">
          {product.title}
        </h3>
        <p className="text-sm font-antic font-bold text-neutral-600">{product.price}</p>
      </div>
    </article>
  );
}

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-10">
          {menuItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
