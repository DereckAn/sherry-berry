import Image from "next/image";

// Top 3 best-selling products
const topProducts = [
  {
    id: "1",
    name: "Lavanda Tranquila",
    price: 24.99,
    image: "/images/velas8.webp",
    colors: ["#8B4049", "#2D2D2D", "#D4AF37"],
    rating: 4.9,
  },
  {
    id: "2",
    name: "Vainilla Clásica",
    price: 22.99,
    image: "/images/velas9.webp",
    rating: 4.8,
  },
  {
    id: "3",
    name: "Bosque de Pino",
    price: 26.99,
    image: "/images/velas10.webp",
    colors: ["#2D5016", "#8B4049"],
    rating: 4.7,
  },
];

export function FeaturedProducts() {
  return (
    <section className="bg-cream grid grid-cols-2 lg:grid-cols-4 w-full">
      {/* First card - Title card */}
      <div className="bg-white p-8 lg:p-10 flex flex-col justify-center">
        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-sans font-black uppercase text-black leading-none mb-4">
          MÁS
          <br />
          VENDIDAS
        </h2>
        <p className="text-sm lg:text-base text-charcoal">
          Nuestras piezas más amadas, perfeccionadas para ti.
        </p>
      </div>

      {/* Product cards */}
      {topProducts.map((product) => (
        <div key={product.id} className="group">
          {/* Image container */}
          <div className="relative aspect-square bg-sand mb-4 overflow-hidden ">
            <div className="relative aspect-square">
              <Image
                src={product.image}
                alt={`Vela ${product.name}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
          </div>

          {/* Product info */}
          <div className="space-y-3 px-10">
            {/* Name and price */}
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-serif text-lg text-black group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              <span className="text-lg font-medium text-charcoal whitespace-nowrap">
                ${product.price}
              </span>
            </div>

            {/* Colors if available */}
            {product.colors && product.colors.length > 0 && (
              <div className="flex gap-2">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    className="w-6 h-6 rounded-full border-2 border-charcoal/20 hover:border-primary transition-colors"
                    style={{ backgroundColor: color }}
                    aria-label={`Color ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-1 text-sm text-charcoal">
                <span className="text-gold">★</span>
                <span className="font-medium">{product.rating}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
