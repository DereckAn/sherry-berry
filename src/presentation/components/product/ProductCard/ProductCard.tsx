import { Button } from '@/presentation/components/ui/Button';

export interface ProductCardProps {
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
}

export function ProductCard({ name, price, description }: ProductCardProps) {
  return (
    <article className="group">
      {/* Image container */}
      <div className="relative aspect-square bg-sand mb-4 overflow-hidden">
        {/* Placeholder - Replace with actual image */}
        <div className="absolute inset-0 flex items-center justify-center text-taupe">
          <div className="text-center">
            <div className="text-6xl mb-2">🕯️</div>
            <p className="text-xs uppercase tracking-wider">Product Image</p>
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      </div>

      {/* Product info */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-serif text-black group-hover:text-primary transition-colors">
            {name}
          </h3>
          <span className="text-lg font-medium text-charcoal whitespace-nowrap">
            ${price.toFixed(2)}
          </span>
        </div>
        <p className="text-sm text-taupe line-clamp-2">
          {description}
        </p>
        <div className="pt-2">
          <Button variant="outline" size="sm" fullWidth>
            Agregar al carrito
          </Button>
        </div>
      </div>
    </article>
  );
}
