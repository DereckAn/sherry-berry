import { menuItems } from "@/shared/data/menu";
import Image from "next/image";

type Product = (typeof menuItems)[number];

export function ProductCard({ product }: { product: Product }) {
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

      <div className="mt-2 text-start ">
        <h3 className="text-sm  font-semibold tracking-wider font-josefin text-neutral-900">
          {product.title}
        </h3>
        <p className="text-md font-rokkitt tracking-wide text-neutral-600">{product.price}</p>
      </div>
    </article>
  );
}