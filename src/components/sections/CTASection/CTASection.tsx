import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

export function CTASection() {
  return (
    <section className="py-24 bg-white">
      <Container size="lg">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            {/* Placeholder - Replace with actual image */}
            <div className="relative aspect-4/5">
              <Image
                src="/images/vela11.webp"
                alt="Vela Lavanda Tranquila"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <h2 className="text-4xl sm:text-5xl font-serif text-black leading-tight">
              Crea tu ambiente perfecto
            </h2>
            <div className="space-y-4 text-lg text-charcoal leading-relaxed">
              <p>
                Cada vela está diseñada para evocar emociones y crear
                experiencias únicas. Desde la tranquilidad de la lavanda hasta
                la calidez de la vainilla, tenemos el aroma perfecto para cada
                momento de tu día.
              </p>
              <p>
                Nuestro compromiso con la calidad significa que cada producto
                pasa por rigurosos controles para garantizar una combustión
                limpia, duradera y aromática que transformará tu espacio.
              </p>
            </div>

            {/* Features list */}
            <ul className="space-y-3 py-4">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span className="text-charcoal">
                  Cera de soja 100% natural y biodegradable
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span className="text-charcoal">
                  Aceites esenciales de la más alta calidad
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span className="text-charcoal">
                  Mechas de algodón orgánico sin plomo
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span className="text-charcoal">
                  Empaque sostenible y reutilizable
                </span>
              </li>
            </ul>

            <div className="pt-4">
              <Button variant="primary" size="lg">
                Descubre más
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
