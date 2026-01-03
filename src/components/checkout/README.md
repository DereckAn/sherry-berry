# Checkout System - Fase 3: Pagos Square

## ✅ Implementación Completada

Sistema de checkout completo con integración de Square Payments.

## 📁 Estructura

```
src/
├── components/checkout/
│   ├── PaymentForm/          # Formulario de pago con Square SDK
│   └── OrderConfirmation/    # Página de confirmación
├── app/
│   ├── (root)/checkout/      # Página principal de checkout
│   └── api/checkout/
│       └── process-payment/  # API para procesar pagos
├── types/
│   ├── checkout.ts           # Tipos del sistema
│   └── square.d.ts           # Tipos de Square SDK
└── shared/store/
    └── checkoutStore.ts      # Estado global del checkout
```

## 🚀 Uso

### 1. Configurar Variables de Entorno

Ya están configuradas en `.env`:

```env
SQUARE_ACCESS_TOKEN=...
NEXT_PUBLIC_SQUARE_APPLICATION_ID=...
NEXT_PUBLIC_SQUARE_LOCATION_ID=...
NEXT_PUBLIC_SQUARE_ENVIRONMENT=production
```

### 2. Flujo de Checkout

```typescript
// El usuario navega a /checkout
// 1. Revisa el carrito
// 2. Ingresa dirección de envío (Fase 2)
// 3. Selecciona método de envío (Fase 2)
// 4. Ingresa información de pago (Fase 3) ← NUEVO
// 5. Confirma la orden (Fase 3) ← NUEVO
```

### 3. Integrar en tu Aplicación

```tsx
// En tu componente de carrito o botón de checkout
import { useCheckoutStore } from "@/shared/store/checkoutStore";

function CartButton() {
  const setStep = useCheckoutStore((state) => state.setStep);

  const handleCheckout = () => {
    setStep("shipping"); // O "payment" si ya tienes shipping
    router.push("/checkout");
  };

  return <button onClick={handleCheckout}>Checkout</button>;
}
```

## 🔒 Seguridad Implementada

### Prevención de Doble Pago

- ✅ Idempotency keys únicos (UUID v4)
- ✅ Estado de transacción en el store
- ✅ Botón deshabilitado durante procesamiento

### Validación

- ✅ Zod schemas en backend
- ✅ Validación de montos y direcciones
- ✅ Manejo de errores robusto

### PCI Compliance

- ✅ Square maneja datos de tarjeta
- ✅ Tokenización antes de enviar al backend
- ✅ No almacenamos información de tarjetas

## 📝 API Endpoints

### POST /api/checkout/process-payment

Procesa un pago con Square.

**Request:**

```json
{
  "sourceId": "cnon:card-nonce-ok",
  "amount": 5000,
  "currency": "USD",
  "shippingAddress": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "address1": "123 Main St",
    "city": "San Francisco",
    "state": "CA",
    "postalCode": "94102",
    "country": "US"
  },
  "idempotencyKey": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response (Success):**

```json
{
  "success": true,
  "paymentId": "KkAkhdMsgzn59SM8A89WgKwekxLZY",
  "orderId": "CAISENgvhTtaTvB8jkmaYF8",
  "receiptUrl": "https://squareup.com/receipt/..."
}
```

**Response (Error):**

```json
{
  "success": false,
  "error": "Payment failed: Insufficient funds"
}
```

## 🧪 Testing

### Tarjetas de Prueba (Sandbox)

```
Visa Success: 4111 1111 1111 1111
CVV: 111
Expiry: Cualquier fecha futura
ZIP: Cualquier código postal

Visa Decline: 4000 0000 0000 0002
```

### Probar el Flujo

```bash
# 1. Iniciar el servidor
bun run dev

# 2. Agregar productos al carrito
# 3. Ir a /checkout
# 4. Completar shipping
# 5. Ingresar tarjeta de prueba
# 6. Confirmar pago
```

## 🎨 Componentes

### PaymentForm

Formulario de pago con Square Web SDK.

```tsx
<PaymentForm
  onPaymentSuccess={(paymentId) => {
    console.log("Payment successful:", paymentId);
  }}
  onPaymentError={(error) => {
    console.error("Payment failed:", error);
  }}
/>
```

### OrderConfirmation

Página de confirmación después del pago exitoso.

```tsx
<OrderConfirmation
  paymentId="KkAkhdMsgzn59SM8A89WgKwekxLZY"
  orderId="CAISENgvhTtaTvB8jkmaYF8"
  receiptUrl="https://squareup.com/receipt/..."
/>
```

## 📊 Estado del Checkout

```typescript
const checkoutStore = useCheckoutStore();

// Acceder al estado
checkoutStore.currentStep; // "payment"
checkoutStore.totals; // { subtotal, shipping, tax, total }
checkoutStore.shipping; // Información de envío
checkoutStore.payment; // Información de pago
checkoutStore.isLoading; // Estado de carga
checkoutStore.error; // Mensaje de error

// Acciones
checkoutStore.setStep("payment");
checkoutStore.updatePayment(paymentInfo);
checkoutStore.reset();
```

## 🐛 Troubleshooting

### Square SDK no carga

- Verificar que las variables de entorno estén configuradas
- Revisar la consola del navegador
- Verificar que el Application ID y Location ID sean correctos

### Pago falla

- Verificar que el Access Token sea válido
- Revisar logs del servidor
- Verificar que el ambiente (sandbox/production) sea correcto

### Errores de CORS

- Square SDK debe cargarse desde el dominio registrado
- Verificar configuración en Square Dashboard

## 📈 Próximos Pasos (Fase 4 y 5)

- [ ] Implementar retry logic
- [ ] Agregar rate limiting
- [ ] Enviar emails de confirmación
- [ ] Mejorar UX con loading states
- [ ] Agregar analytics
- [ ] Testing exhaustivo

## 🔗 Referencias

- [Square Web SDK Docs](https://developer.squareup.com/docs/web-payments/overview)
- [Square Payments API](https://developer.squareup.com/reference/square/payments-api)
- [PCI Compliance](https://developer.squareup.com/docs/security/pci-compliance)
