import Image from "next/image";

export function Craft() {
  return (
    <section className="bg-black grid lg:grid-cols-2">
      {/* Content Side - Left */}
      <div className="flex items-center justify-center ">
        <div className="max-w-xl space-y-8">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif text-white leading-tight">
            Técnica
            <br />
            Moldeada
            <br />
            Por Años
          </h2>

          <div className="space-y-6 text-base sm:text-lg text-taupe leading-relaxed">
            <p>
              Cada vela Sherry Berry es el resultado de años de perfeccionar
              nuestra técnica artesanal. Seleccionamos cuidadosamente cada
              ingrediente, desde la cera de soja natural hasta los aceites
              esenciales más puros.
            </p>
            <p className="text-sm sm:text-base">
              Nuestro proceso de elaboración manual asegura que cada pieza
              mantenga la más alta calidad, con una combustión limpia y duradera
              que respeta tanto tu hogar como el medio ambiente.
            </p>
          </div>

          {/* Process steps */}
          <div className="space-y-4 pt-4">
            <div className="flex gap-4">
              <span className="font-serif text-2xl text-primary">01</span>
              <div>
                <h3 className="font-serif text-lg text-sand mb-1">
                  Selección
                </h3>
                <p className="text-sm text-taupe">
                  Ingredientes naturales de origen sostenible
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="font-serif text-2xl text-primary">02</span>
              <div>
                <h3 className="font-serif text-lg text-sand mb-1">
                  Elaboración
                </h3>
                <p className="text-sm text-taupe">
                  Proceso artesanal en pequeños lotes
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="font-serif text-2xl text-primary">03</span>
              <div>
                <h3 className="font-serif text-lg text-sand mb-1">Curado</h3>
                <p className="text-sm text-taupe">
                  Tiempo perfecto para aromas duraderos
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Side - Right */}
      <div className="relative h-[60vh] lg:h-auto aspect-square order-first lg:order-last">
        <Image
          src="/images/velas7.webp"
          alt="Proceso artesanal Sherry Berry"
          fill
          className="object-cover aspect-square"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    </section>
  );
}
