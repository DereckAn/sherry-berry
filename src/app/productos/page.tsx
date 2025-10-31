import Image from "next/image";

// Categorías de productos - ahora sin necesidad de especificar 'size'
const productCategories = [
  {
    id: "1",
    title: "Velas Aromáticas",
    subtitle: "Explora más",
    image: "/images/vela11.webp",
  },
  {
    id: "2",
    title: "Velas Decorativas",
    subtitle: "Explora más",
    image: "/images/velas2.webp",
  },
  {
    id: "3",
    title: "Sets de Regalo",
    subtitle: "Explora más",
    image: "/images/velas3.webp",
  },
  {
    id: "4",
    title: "Edición Limitada",
    subtitle: "Explora más",
    image: "/images/velas4.webp",
  },
  {
    id: "5",
    title: "Velas Sostenibles",
    subtitle: "Explora más",
    image: "/images/velas5.webp",
  },
  {
    id: "6",

    title: "Velas de Temporada",
    subtitle: "Explora más",
    image: "/images/velas6.webp",
  },
  {
    id: "7",
    title: "Velas Personalizadas",
    subtitle: "Explora más",
    image: "/images/velas7.webp",
  },
  {
    id: "8",
    title: "Accesorios para Velas",
    subtitle: "Explora más",
    image: "/images/velas8.webp",
  },
  {
    id: "9",
    title: "Velas de Cera Natural",
    subtitle: "Explora más",
    image: "/images/velas9.webp",
  },
];

// Componente para renderizar cada card individual
function CategoryCard({
  category,
  size,
}: {
  category: (typeof productCategories)[number];
  size: "large" | "medium" | "small";
}) {
  const sizeClasses = {
    large: "h-[500px] lg:h-[1000px]",
    medium: "h-[500px] lg:h-[500px]",
    small: "h-[300px] lg:h-[500px]",
  };

  const textSizeClasses = {
    large: "text-4xl lg:text-5xl xl:text-6xl",
    medium: "text-3xl lg:text-4xl",
    small: "text-2xl lg:text-3xl",
  };

  const paddingClasses = {
    large: "p-8 lg:p-12",
    medium: "p-8 lg:p-10",
    small: "p-6 lg:p-8",
  };

  const subtitleClasses = {
    large: "text-sm",
    medium: "text-sm",
    small: "text-xs",
  };

  const arrowClasses = {
    large: "text-xl",
    medium: "text-xl",
    small: "text-lg",
  };

  return (
    <a
      href={`/productos/${category.id}`}
      className={`group block relative ${sizeClasses[size]} overflow-hidden`}
    >
      <div className="relative w-full h-full">
        {/* Image */}
        <Image
          src={category.image}
          alt={category.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />

        {/* Text content */}
        <div
          className={`absolute inset-0 flex flex-col justify-end ${paddingClasses[size]}`}
        >
          <h2 className={`${textSizeClasses[size]} font-serif text-white mb-2`}>
            {category.title}
          </h2>
          <div className="flex items-center gap-2 text-white">
            <span
              className={`${subtitleClasses[size]} uppercase tracking-wider border-b border-white pb-1`}
            >
              {category.subtitle}
            </span>
            <span className={arrowClasses[size]}>→</span>
          </div>
        </div>
      </div>
    </a>
  );
}

export default function ProductosPage() {
  // Agrupar categorías en bloques de 4 para el bento grid
  // Cada bloque sigue el patrón: [large, medium, small, small]
  const bentoBlocks = [];
  for (let i = 0; i < productCategories.length; i += 4) {
    bentoBlocks.push(productCategories.slice(i, i + 4));
  }

  return (
    <main className="min-h-screen bg-cream pt-24 lg:pt-0">
      {/* Hero/Title section */}
      <section className="px-8 lg:px-12 xl:px-16 py-12 lg:py-16">
        <div className="max-w-[1600px] mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif text-black mb-6">
            Menu
          </h1>
          <p className="text-lg lg:text-xl text-charcoal max-w-2xl">
            Descubre nuestras colecciones cuidadosamente elaboradas. Cada vela
            cuenta una historia única.
          </p>
        </div>
      </section>

      {/* Bento Grid Layout - Dinámico con alternancia */}
      <section className="w-full space-y-2">
        {bentoBlocks.map((block, blockIndex) => {
          // Alternar layout: par = normal, impar = flip
          const isFlipped = blockIndex % 2 === 1;

          return (
            <div
              key={blockIndex}
              className="grid grid-cols-1 lg:grid-cols-2 divide-x-8 divide-cream "
            >
              {/* Si NO está flipped: Large izquierda, Stack derecha */}
              {/* Si está flipped: Stack izquierda, Large derecha */}

              {!isFlipped ? (
                <>
                  {/* Layout Normal - Large izquierda */}
                  {block[0] && (
                    <CategoryCard category={block[0]} size="large" />
                  )}

                  {/* Right column - stacked cards */}
                  <div className="grid grid-rows-2 divide-y-8 divide-cream">
                    {block[1] && (
                      <CategoryCard category={block[1]} size="medium" />
                    )}
                    <div className="grid grid-cols-2 divide-x-8 divide-cream">
                      {block[2] && (
                        <CategoryCard category={block[2]} size="small" />
                      )}
                      {block[3] && (
                        <CategoryCard category={block[3]} size="small" />
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Layout Flipped - Stack izquierda */}
                  <div className="grid grid-rows-2 divide-y-8 divide-cream">
                    {block[1] && (
                      <CategoryCard category={block[1]} size="medium" />
                    )}
                    <div className="grid grid-cols-2 divide-x-8 divide-cream">
                      {block[2] && (
                        <CategoryCard category={block[2]} size="small" />
                      )}
                      {block[3] && (
                        <CategoryCard category={block[3]} size="small" />
                      )}
                    </div>
                  </div>

                  {/* Large derecha */}
                  {block[0] && (
                    <CategoryCard category={block[0]} size="large" />
                  )}
                </>
              )}
            </div>
          );
        })}
      </section>
    </main>
  );
}
