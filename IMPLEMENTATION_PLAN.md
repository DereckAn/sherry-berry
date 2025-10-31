# Sherry Berry - Plan de Implementación E-commerce

## Stack Tecnológico

### Core
- **Framework**: Next.js 16 (App Router)
- **Lenguaje**: TypeScript (strict mode)
- **Estilos**: Tailwind CSS v4
- **State Management**: Zustand
- **Validación**: Zod
- **Formularios**: React Hook Form

### Herramientas de Desarrollo
- ESLint + Prettier
- Husky (pre-commit hooks)
- TypeScript strict mode

---

## Arquitectura Limpia

### Estructura de Carpetas

```
src/
├── app/                    # Next.js App Router
│   ├── (main)/            # Grupo de rutas principales
│   │   ├── page.tsx       # Home
│   │   ├── productos/     # Catálogo
│   │   ├── producto/[id]/ # Detalle
│   │   └── carrito/       # Cart
│   ├── checkout/          # Checkout flow
│   └── layout.tsx         # Root layout
│
├── core/                   # Domain Layer
│   ├── entities/
│   │   ├── Product.ts
│   │   ├── Cart.ts
│   │   ├── Order.ts
│   │   └── Customer.ts
│   ├── value-objects/
│   │   ├── Price.ts
│   │   ├── ProductId.ts
│   │   └── Email.ts
│   ├── interfaces/
│   │   ├── IProductRepository.ts
│   │   ├── ICartRepository.ts
│   │   └── IOrderRepository.ts
│   └── types/
│       └── index.ts
│
├── infrastructure/         # Data Layer
│   ├── repositories/
│   │   ├── ProductRepository.ts
│   │   ├── CartRepository.ts
│   │   └── OrderRepository.ts
│   ├── api/
│   │   ├── client.ts
│   │   └── endpoints.ts
│   ├── services/
│   │   ├── PaymentService.ts
│   │   └── ShippingService.ts
│   └── mock/
│       └── products.ts
│
├── application/            # Use Cases
│   ├── use-cases/
│   │   ├── cart/
│   │   │   ├── AddToCart.ts
│   │   │   ├── RemoveFromCart.ts
│   │   │   └── UpdateQuantity.ts
│   │   ├── products/
│   │   │   ├── GetProducts.ts
│   │   │   ├── GetProductById.ts
│   │   │   └── SearchProducts.ts
│   │   └── orders/
│   │       ├── CreateOrder.ts
│   │       └── GetOrderById.ts
│   └── mappers/
│       ├── ProductMapper.ts
│       └── OrderMapper.ts
│
├── presentation/           # UI Layer
│   ├── components/
│   │   ├── ui/            # Design System
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Card/
│   │   │   └── Typography/
│   │   ├── layout/
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   └── Container/
│   │   ├── product/
│   │   │   ├── ProductCard/
│   │   │   ├── ProductGrid/
│   │   │   └── ProductDetail/
│   │   └── cart/
│   │       ├── CartItem/
│   │       └── CartSummary/
│   ├── hooks/
│   │   ├── useCart.ts
│   │   ├── useProducts.ts
│   │   └── useCheckout.ts
│   └── stores/            # Zustand
│       ├── cartStore.ts
│       ├── productsStore.ts
│       └── uiStore.ts
│
└── shared/                # Shared utilities
    ├── utils/
    │   ├── format.ts
    │   ├── validation.ts
    │   └── helpers.ts
    ├── constants/
    │   └── index.ts
    └── config/
        └── site.ts
```

---

## Patrones de Diseño

### 1. Repository Pattern
**Propósito**: Abstraer acceso a datos y proporcionar una interfaz consistente.

```typescript
// core/interfaces/IProductRepository.ts
export interface IProductRepository {
  getAll(): Promise<Product[]>;
  getById(id: string): Promise<Product | null>;
  search(query: string): Promise<Product[]>;
}

// infrastructure/repositories/ProductRepository.ts
export class ProductRepository implements IProductRepository {
  // Implementación concreta
}
```

### 2. Factory Pattern
**Propósito**: Crear instancias de entidades de forma consistente.

```typescript
// core/factories/ProductFactory.ts
export class ProductFactory {
  static create(data: ProductDTO): Product {
    // Validación y creación
  }
}
```

### 3. Observer Pattern (vía Zustand)
**Propósito**: Reactive state management.

```typescript
// presentation/stores/cartStore.ts
export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addItem: (item) => set((state) => ({
    items: [...state.items, item]
  }))
}));
```

### 4. Strategy Pattern
**Propósito**: Diferentes estrategias de pago/envío.

```typescript
// application/strategies/PaymentStrategy.ts
interface PaymentStrategy {
  process(amount: number): Promise<PaymentResult>;
}

class CreditCardPayment implements PaymentStrategy { }
class PayPalPayment implements PaymentStrategy { }
```

### 5. Adapter Pattern
**Propósito**: Convertir entre DTOs y Entities.

```typescript
// application/mappers/ProductMapper.ts
export class ProductMapper {
  static toDomain(dto: ProductDTO): Product {
    // Conversión
  }

  static toDTO(entity: Product): ProductDTO {
    // Conversión
  }
}
```

### 6. Singleton Pattern
**Propósito**: Una única instancia de stores y clients.

```typescript
// infrastructure/api/client.ts
class ApiClient {
  private static instance: ApiClient;

  static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }
}
```

---

## Fases de Implementación

### **Fase 1: Arquitectura Base** ✅ (En esta fase)
- [x] Estructura de carpetas clean architecture
- [x] Configuración TypeScript estricta
- [x] Setup Tailwind CSS v4
- [ ] Tipos base y entities
- [ ] Interfaces y contracts

### **Fase 2: Core Domain**
- [ ] Product entity con validaciones
- [ ] Cart entity con business rules
- [ ] Order entity
- [ ] Value Objects (Price, ProductId, Email)
- [ ] DTOs e interfaces
- [ ] Schemas Zod para validación

### **Fase 3: Infrastructure Layer**
- [ ] ProductRepository implementation
- [ ] CartRepository implementation
- [ ] API client setup
- [ ] Mock data para desarrollo
- [ ] Mappers (DTO ↔ Entity)

### **Fase 4: Application Layer**
- [ ] Use Cases: AddToCart, RemoveFromCart
- [ ] Use Cases: GetProducts, SearchProducts
- [ ] Use Cases: CreateOrder, Checkout
- [ ] Business rules validation
- [ ] Zustand stores setup

### **Fase 5: Design System**
- [x] Sistema de colores elegante
- [x] Tipografía (serif + sans-serif)
- [x] Componentes base (Button, Input, Card)
- [x] Layout components
- [x] Tokens Tailwind personalizados

### **Fase 6: Páginas Principales** ✅ (En esta fase)
- [x] Home page
  - [x] Hero section
  - [x] About section
  - [x] Featured products
  - [x] CTA/Hook section
  - [x] Footer
- [ ] Catálogo de productos
- [ ] Página de producto individual
- [ ] Carrito de compras
- [ ] Checkout flow

### **Fase 7: Features Avanzados**
- [ ] Búsqueda y filtros
- [ ] Wishlist
- [ ] Animaciones sutiles
- [ ] Optimización de imágenes
- [ ] SEO optimization
- [ ] Performance monitoring

---

## Guía de Estilo Visual

### Paleta de Colores
```css
/* Neutrales */
--color-cream: #FAF7F2
--color-sand: #E8E0D5
--color-taupe: #B5A393
--color-charcoal: #2D2D2D
--color-black: #1A1A1A

/* Acentos */
--color-burgundy: #8B4049
--color-gold: #D4AF37
```

### Tipografía
- **Headings**: Serif elegante (Playfair Display, Cormorant)
- **Body**: Sans-serif moderna (Inter, Work Sans)
- **Hierarchy**: clara y consistente

### Principios
1. **Minimalismo sofisticado**: Menos es más
2. **Espaciado generoso**: Breathing room
3. **Fotografía de calidad**: Productos destacados
4. **Geometría limpia**: Ángulos rectos, sin exceso de rounded
5. **Transiciones sutiles**: Micro-interactions elegantes
6. **Sin emojis**: Profesional y serio
7. **Grid layouts**: Orden y estructura

### Componentes UI
- Botones: Rectangulares con hover sutil
- Cards: Bordes mínimos, sombras sutiles
- Inputs: Underline o border simple
- Spacing: Sistema de 8px
- Borders: 1-2px máximo, colores sutiles

---

## Buenas Prácticas

### TypeScript
- Strict mode habilitado
- Tipos explícitos, evitar `any`
- Interfaces para contracts públicos
- Types para shapes de datos

### React/Next.js
- Server Components por defecto
- Client Components solo cuando necesario
- Colocación de código cercana al uso
- Composición sobre herencia

### State Management
- Zustand para estado global mínimo
- React state para UI local
- Server state separado de client state

### Testing (Futuro)
- Unit tests para use cases
- Integration tests para repositories
- E2E tests para flujos críticos

### Performance
- Code splitting automático (Next.js)
- Image optimization (next/image)
- Lazy loading de componentes pesados
- Memoización inteligente

---

## Comandos Útiles

```bash
# Desarrollo
bun dev

# Build
bun run build

# Lint
bun run lint

# Type check
bun run type-check

# Format
bun run format
```

---

## Notas de Implementación

### Prioridades
1. **Funcionalidad core**: Catálogo, carrito, checkout
2. **UX/UI elegante**: Sin comprometer la estética
3. **Performance**: Carga rápida, optimización
4. **Escalabilidad**: Código mantenible y extensible

### Decisiones Técnicas
- **SSR/SSG**: Páginas de productos con SSG para SEO
- **API Routes**: Checkout y operaciones sensibles
- **Imágenes**: CDN para productos (futuro)
- **Pagos**: Integración Stripe/PayPal (Fase 7)

---

**Fecha de inicio**: 31 de octubre de 2025
**Última actualización**: 31 de octubre de 2025
