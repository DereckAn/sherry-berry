"use client";

import { useLanguage } from "@/shared/i18n/LanguageProvider";
import { PRODUCT } from "@/shared/i18n/content";
import type { Product } from "@/shared/types/cart";
import Image from "next/image";
import { useState } from "react";
import { ProductDialog } from "./ProductDialog";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { language } = useLanguage();
  const content = PRODUCT[language];
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <article
        className="flex flex-col items-start cursor-pointer group"
        onClick={() => setIsDialogOpen(true)}
      >
        <div className="relative w-full max-w-[420px] aspect-square overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 320px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 text-charcoal px-4 py-2 rounded-sm text-sm font-medium">
              {content.card.viewDetails}
            </span>
          </div>
        </div>

        <div className="mt-2 text-start">
          <h3 className="text-sm font-semibold tracking-wider font-josefin text-neutral-900 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">{product.variant}</p>
          <p className="text-md font-rokkitt tracking-wide text-neutral-600 mt-1">
            {product.price}
          </p>
        </div>
      </article>

      <ProductDialog
        product={product}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
}
