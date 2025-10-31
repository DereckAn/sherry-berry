# Imágenes Pendientes - Sherry Berry

Este archivo documenta los placeholders de imágenes que necesitan ser reemplazados con fotografías reales de productos.

## 📸 Imágenes Necesarias

### Hero Section Carousel (NUEVO)
- **Ubicación**: `src/presentation/components/sections/Hero/Hero.tsx:9-25`
- **Cantidad**: 3 imágenes (mínimo) - puede ampliarse
- **Dimensiones recomendadas**: 1920px × 1080px (Full HD landscape) o superior
- **Proporción**: 16:9 para pantalla completa
- **Descripción**: Imágenes lifestyle de velas en ambientes elegantes y minimalistas
- **Estilo**:
  - Fotografía profesional estilo arquitectónico
  - Ambientes sofisticados con luz natural
  - Composición minimalista
  - Velas integradas en espacios de vida reales
  - Paleta de colores neutros y cálidos
- **Rutas de archivos**:
  - `/public/images/hero/hero-1.jpg`
  - `/public/images/hero/hero-2.jpg`
  - `/public/images/hero/hero-3.jpg`
- **Características técnicas**:
  - Formato: JPG o WebP optimizado
  - Peso máximo: 500KB por imagen
  - Optimizar para web sin perder calidad

### CTA Section
- **Ubicación**: `src/presentation/components/sections/CTASection/CTASection.tsx:11`
- **Dimensiones recomendadas**: 800px × 1000px (proporción 4:5)
- **Descripción**: Imagen lifestyle mostrando velas en uso
- **Estilo**: Ambiente acogedor, luz natural, composición minimalista

### Product Cards
- **Ubicación**: `src/presentation/components/product/ProductCard/ProductCard.tsx:15`
- **Dimensiones recomendadas**: 600px × 600px (cuadrado)
- **Descripción**: Fotos individuales de cada producto
- **Cantidad necesaria**: 4 imágenes iniciales para productos destacados
- **Estilo**: Fondo neutro, iluminación uniforme, enfoque en el producto

## 🎨 Guía de Estilo Fotográfico

### Paleta de Colores
- Fondos neutros: crema, blanco, beige
- Evitar colores saturados
- Mantener coherencia visual

### Composición
- Minimalista y limpia
- Espacio negativo generoso
- Enfoque nítido en el producto
- Luz natural suave

### Formato Técnico
- **Formato**: JPG o WebP
- **Optimización**: Comprimir para web
- **Nombres**: descriptivos (ej: `lavanda-tranquila.jpg`)

## 🔄 Cómo Reemplazar los Placeholders

### Opción 1: Usando next/image (Recomendado)

```tsx
import Image from 'next/image';

<div className="relative aspect-square">
  <Image
    src="/images/products/lavanda-tranquila.jpg"
    alt="Vela Lavanda Tranquila"
    fill
    className="object-cover"
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
  />
</div>
```

### Opción 2: Background Image con Tailwind

```tsx
<div
  className="relative aspect-square bg-cover bg-center"
  style={{ backgroundImage: 'url(/images/products/lavanda-tranquila.jpg)' }}
/>
```

## 📁 Estructura de Carpetas Sugerida

```
public/
└── images/
    ├── hero/
    │   └── main-hero.jpg
    ├── lifestyle/
    │   └── cta-image.jpg
    └── products/
        ├── lavanda-tranquila.jpg
        ├── vainilla-clasica.jpg
        ├── bosque-pino.jpg
        └── rosa-elegante.jpg
```

## ✅ Checklist de Implementación

- [ ] Conseguir/crear fotografías de productos
- [ ] Optimizar imágenes para web
- [ ] Colocar en carpeta `public/images/`
- [ ] Actualizar Hero section con imagen real
- [ ] Actualizar CTA section con imagen real
- [ ] Actualizar ProductCard con imágenes reales
- [ ] Agregar atributos `alt` descriptivos
- [ ] Verificar responsive design
- [ ] Probar performance (Lighthouse)

## 🎯 Prioridad

1. **Alta**: Imágenes de productos destacados (4)
2. **Media**: Hero image principal
3. **Media**: CTA lifestyle image
4. **Baja**: Imágenes adicionales de catálogo

---

**Nota**: Los emojis (🕯️) son temporales y DEBEN ser reemplazados antes de producción.
