import type { HomeContent } from "@/shared/i18n/homeContent";
import Image from "next/image";

type FeaturedProductsProps = {
  copy: Pick<HomeContent, "featuredTitle" | "featuredSubtitle" | "featuredProducts">;
};

export function FeaturedProducts({ copy }: FeaturedProductsProps) {
  const { featuredTitle, featuredSubtitle, featuredProducts } = copy;

  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 w-full my-10">
      {/* First card - Title card */}
      <div className="p-4 lg:p-10 flex flex-col justify-center">
        <h2 className="text-4xl sm:text-6xl lg:text-9xl font-legquinne uppercase text-black leading-none mb-4">
          {featuredTitle}
        </h2>
        <p className="text-sm lg:text-base font-antic text-charcoal">
          {featuredSubtitle}
        </p>
      </div>

      {/* Product cards */}
      {featuredProducts.map((product) => (
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
          <div className="space-y-3 px-3 md:px-8 py-5 font-legquinne">
            {/* Name and price */}
            <div className="flex items-start justify-between gap-2 ">
              <h3 className="text-md md:text-2xl font-semibold group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              <span className="text-md md:text-2xl font-josefin text-charcoal whitespace-nowrap">
                ${product.price}
              </span>

            </div>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-1 text-md tracking-widest font-bold text-charcoal">
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
