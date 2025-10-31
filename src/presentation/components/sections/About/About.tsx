import Image from "next/image";

export function About() {
  return (
    <section className="bg-cream">
      <div className="grid lg:grid-cols-2 relative">
        <h2 className="absolute w-full top-0 left-0 z-10 text-[6.5rem] lg:text-[14.5vw] lg:text-nowrap leading-20 lg:leading-36 font-serif font-bold tracking-tighter text-center select-none pointer-events-none">
          LIFESTYLE
        </h2>

        {/* Image Side */}
        <div className="relative h-[60vh] lg:h-auto aspect-square">
          <Image
            src="/images/velas6.webp"
            alt="Taller artesanal Sherry Berry"
            fill
            className="object-cover aspect-square"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Content Side */}
        <div className="flex items-center justify-center px-8 sm:px-12 lg:px-16 xl:px-24 py-16 lg:py-24">
          <div className="max-w-xl space-y-8 ">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif text-black leading-tight">
              Taller
              <br />
              Artesanal
              <br />
              Exclusivo
            </h2>

            <div className="space-y-6 text-base sm:text-lg text-charcoal leading-relaxed">
              <p>
                Ven y descubre la magia detrás de cada vela en nuestro taller
                artesanal o agenda una cita con nuestros artesanos para crear tu
                vela personalizada.
              </p>
              <p className="text-sm sm:text-base">
                Para agendar una visita privada, simplemente selecciona el día
                de tu preferencia y el horario que mejor se adapte a ti.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
