# Sherry Berry - E-commerce de Velas Artesanales

Una tienda online elegante y profesional para velas artesanales hechas a mano.

## 🚀 Stack Tecnológico

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript** (strict mode)
- **Tailwind CSS v4**
- **Zustand** (state management)

## 📁 Arquitectura

El proyecto sigue principios de **Clean Architecture** con la siguiente estructura:

```
src/
├── app/                    # Next.js App Router
├── core/                   # Domain Layer (Entities, Interfaces)
├── infrastructure/         # Data Layer (Repositories, API)
├── application/            # Use Cases (Business Logic)
├── presentation/           # UI Layer (Components, Hooks, Stores)
└── shared/                 # Utilities & Constants
```

## 🎨 Sistema de Diseño

### Paleta de Colores
- Crema (#FAF7F2)
- Arena (#E8E0D5)
- Taupe (#B5A393)
- Charcoal (#2D2D2D)
- Burgundy (#8B4049)

### Tipografía
- **Serif**: Playfair Display (headings)
- **Sans-serif**: Inter (body)

### Principios
- Minimalismo sofisticado
- Espaciado generoso
- Sin emojis en producción
- Bordes sutiles
- Transiciones elegantes

## 🏃 Comandos

```bash
# Desarrollo
bun dev

# Build
bun run build

# Lint
bun run lint

# Start production
bun start
```

## 📦 Componentes Principales

### Secciones
- **Hero**: Landing principal con CTA
- **About**: Información sobre la marca
- **FeaturedProducts**: Productos destacados
- **CTASection**: Hook visual con imagen y texto
- **Footer**: Footer elegante con enlaces

### UI Components
- **Button**: Variantes primary, secondary, outline, ghost
- **Container**: Layout wrapper con tamaños responsive
- **ProductCard**: Card de producto con hover effects

## 🗺️ Próximos Pasos

Ver `IMPLEMENTATION_PLAN.md` para el plan completo de implementación.

### Fase Actual: Página Principal ✅
- [x] Hero section
- [x] About section
- [x] Featured products
- [x] CTA section
- [x] Footer

### Próximas Fases
- [ ] Header/Navigation
- [ ] Catálogo completo de productos
- [ ] Página de producto individual
- [ ] Carrito de compras
- [ ] Checkout flow
- [ ] Integración Zustand
- [ ] Sistema de filtros
- [ ] Wishlist

## 🎯 Patrones de Diseño

- **Repository Pattern**: Abstracción de datos
- **Factory Pattern**: Creación de entidades
- **Observer Pattern**: State management (Zustand)
- **Strategy Pattern**: Pagos y envíos
- **Adapter Pattern**: DTOs ↔ Entities

## 📝 Notas de Desarrollo

- TypeScript strict mode habilitado
- Server Components por defecto
- Client Components solo cuando necesario
- Path alias `@/*` apunta a `src/*`

## 🌐 Servidor de Desarrollo

El servidor corre en: http://localhost:3000

---

**Sherry Berry** © 2025
