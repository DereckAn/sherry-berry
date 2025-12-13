import type { HomeFeaturedProductsContent } from "@/shared/i18n/content";
import Image from "next/image";

type FeaturedProductsProps = {
  content: HomeFeaturedProductsContent;
};

export function FeaturedProducts({ content }: FeaturedProductsProps) {
  const { title, subtitle, products } = content;

  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 w-full my-10">
      {/* First card - Title card */}
      <div className="p-4 lg:p-10 flex flex-col justify-center">
        <h2 className="text-4xl sm:text-6xl lg:text-7xl 3xl:text-8xl font-legquinne uppercase text-black leading-none mb-4">
          {title}
        </h2>
        <p className="text-sm lg:text-base font-antic text-charcoal">
          {subtitle}
        </p>
      </div>

      {/* Product cards */}
      {products.map((product) => (
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
              <h3 className="text-md md:text-xl 2xl:text-2xl font-semibold group-hover:text-primary transition-colors">
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
