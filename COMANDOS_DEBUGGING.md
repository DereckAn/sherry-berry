# 🔍 Guía de Comandos para Debugging y Desarrollo

Esta guía documenta todos los comandos utilizados durante la implementación de la Fase 3, explicando qué hace cada uno y cuándo usarlo.

---

## 📦 Gestión de Paquetes con Bun

### Instalar dependencias

```bash
bun add @square/web-sdk
```

**¿Qué hace?** Instala un paquete npm usando Bun (equivalente a `npm install`)

**Cuándo usarlo:** Cuando necesitas agregar una nueva dependencia al proyecto

**Variantes:**

```bash
bun add <paquete>              # Dependencia de producción
bun add -d <paquete>           # Dependencia de desarrollo
bun add <paquete>@<version>    # Versión específica
```

---

### Listar paquetes instalados

```bash
bun pm ls square
```

**¿Qué hace?** Lista todos los paquetes instalados que coinciden con "square"

**Cuándo usarlo:** Para verificar qué versión de un paquete está instalada

**Variantes:**

```bash
bun pm ls                      # Lista TODOS los paquetes
bun pm ls <nombre>             # Busca paquetes específicos
```

---

## 🔨 Build y Compilación

### Compilar el proyecto

```bash
bun run build
```

**¿Qué hace?** Ejecuta el script de build definido en `package.json` (Next.js build)

**Cuándo usarlo:** Para verificar que no hay errores de TypeScript o compilación

**Salida típica:**

```
✓ Compiled successfully
✓ Generating static pages
✓ Finalizing page optimization
```

---

### Ver solo las primeras líneas del build

```bash
bun run build 2>&1 | head -50
```

**¿Qué hace?**

- `2>&1` - Redirige stderr (errores) a stdout
- `|` - Pipe, pasa la salida al siguiente comando
- `head -50` - Muestra solo las primeras 50 líneas

**Cuándo usarlo:** Cuando el build tiene mucha salida y solo quieres ver el inicio

**Variantes:**

```bash
bun run build 2>&1 | tail -20    # Últimas 20 líneas
bun run build 2>&1 | head -100   # Primeras 100 líneas
```

---

## 📖 Exploración de Archivos

### Ver contenido de un archivo

```bash
cat node_modules/square/package.json
```

**¿Qué hace?** Muestra todo el contenido de un archivo

**Cuándo usarlo:** Para ver archivos pequeños completos

**Variantes:**

```bash
cat archivo.txt                  # Ver archivo completo
cat archivo1.txt archivo2.txt    # Ver múltiples archivos
```

---

### Ver solo las primeras líneas

```bash
head -30 node_modules/square/index.d.ts
```

**¿Qué hace?** Muestra las primeras 30 líneas de un archivo

**Cuándo usarlo:** Para ver el inicio de archivos grandes (como definiciones de tipos)

**Variantes:**

```bash
head archivo.txt                 # Primeras 10 líneas (default)
head -n 50 archivo.txt          # Primeras 50 líneas
head -20 archivo.txt            # Primeras 20 líneas
```

---

### Ver solo las últimas líneas

```bash
tail -20 archivo.txt
```

**¿Qué hace?** Muestra las últimas 20 líneas de un archivo

**Cuándo usarlo:** Para ver el final de logs o archivos grandes

**Variantes:**

```bash
tail archivo.txt                 # Últimas 10 líneas (default)
tail -n 50 archivo.txt          # Últimas 50 líneas
tail -f archivo.log             # Seguir archivo en tiempo real (logs)
```

---

## 🔎 Búsqueda con grep

### Buscar texto en un archivo

```bash
grep "main" node_modules/square/package.json
```

**¿Qué hace?** Busca líneas que contengan "main" en el archivo

**Cuándo usarlo:** Para encontrar texto específico en un archivo

**Variantes:**

```bash
grep "texto" archivo.txt         # Búsqueda simple
grep -i "texto" archivo.txt      # Case-insensitive (ignora mayúsculas)
grep -n "texto" archivo.txt      # Muestra números de línea
grep -v "texto" archivo.txt      # Muestra líneas que NO contienen el texto
```

---

### Buscar con contexto (líneas antes/después)

```bash
grep -A 5 '"main"' node_modules/square/package.json
```

**¿Qué hace?**

- `-A 5` - Muestra 5 líneas DESPUÉS (After) de la coincidencia
- Útil para ver el contexto alrededor de lo que buscas

**Cuándo usarlo:** Cuando necesitas ver qué viene después de una línea específica

**Variantes:**

```bash
grep -A 10 "texto" archivo.txt   # 10 líneas después
grep -B 5 "texto" archivo.txt    # 5 líneas antes (Before)
grep -C 3 "texto" archivo.txt    # 3 líneas antes Y después (Context)
```

**Ejemplo real usado:**

```bash
grep -A 5 "interface BaseClientOptions" node_modules/square/BaseClient.d.ts
```

Esto me mostró la definición completa de la interfaz.

---

### Buscar en múltiples archivos (recursivo)

```bash
grep -r "paymentsApi" node_modules/square/
```

**¿Qué hace?**

- `-r` - Busca recursivamente en todos los archivos del directorio

**Cuándo usarlo:** Cuando no sabes en qué archivo está algo

**Variantes:**

```bash
grep -r "texto" .                # Buscar en directorio actual
grep -r "texto" src/             # Buscar en carpeta específica
grep -rn "texto" .               # Con números de línea
grep -rl "texto" .               # Solo nombres de archivos
```

---

### Buscar con contexto avanzado

```bash
grep -B 5 -A 15 "namespace SquareClient" node_modules/square/Client.d.ts
```

**¿Qué hace?** Muestra 5 líneas antes y 15 después de la coincidencia

**Cuándo usarlo:** Para ver definiciones completas de clases/interfaces

**Ejemplo real:**

```bash
grep -A 30 "Creates a payment" node_modules/square/api/resources/payments/client/Client.d.ts
```

Esto me mostró toda la documentación del método `create()`.

---

### Buscar solo en archivos específicos

```bash
grep "payments" node_modules/square/Client.d.ts
```

**¿Qué hace?** Busca solo en un archivo específico

**Cuándo usarlo:** Cuando sabes exactamente dónde buscar

---

## 🗂️ Navegación de Directorios

### Listar archivos

```bash
ls node_modules/square/api/resources/payments/client/
```

**¿Qué hace?** Lista archivos y carpetas en un directorio

**Cuándo usarlo:** Para explorar la estructura de carpetas

**Variantes:**

```bash
ls                               # Lista simple
ls -l                            # Lista detallada (permisos, tamaño, fecha)
ls -la                           # Incluye archivos ocultos
ls -lh                           # Tamaños legibles (KB, MB)
ls *.ts                          # Solo archivos TypeScript
```

---

## 🔗 Combinación de Comandos (Pipes)

### Buscar y limitar resultados

```bash
cat node_modules/square/api/resources/payments/client/Client.d.ts | head -50
```

**¿Qué hace?**

1. `cat` lee el archivo
2. `|` pasa la salida al siguiente comando
3. `head -50` muestra solo las primeras 50 líneas

**Cuándo usarlo:** Para ver el inicio de archivos muy grandes

---

### Buscar y ver primeras coincidencias

```bash
grep -A 30 "Creates a payment" archivo.ts | head -40
```

**¿Qué hace?**

1. Busca "Creates a payment"
2. Muestra 30 líneas después
3. De esas, solo muestra las primeras 40

**Cuándo usarlo:** Cuando grep devuelve demasiados resultados

---

### Build y ver solo errores

```bash
bun run build 2>&1 | tail -30
```

**¿Qué hace?**

1. Ejecuta el build
2. Redirige errores a salida estándar
3. Muestra solo las últimas 30 líneas (donde suelen estar los errores)

**Cuándo usarlo:** Para ver rápidamente qué falló en el build

---

## 🎯 Casos de Uso Reales

### 1. Investigar un error de importación

**Problema:** `Module '"square"' has no exported member 'Client'`

**Comandos usados:**

```bash
# 1. Ver qué exporta el paquete
head -30 node_modules/square/index.d.ts

# 2. Buscar la clase correcta
grep "Client" node_modules/square/index.d.ts

# 3. Ver la definición completa
grep -A 10 "SquareClient" node_modules/square/index.d.ts
```

**Resultado:** Descubrí que se llama `SquareClient`, no `Client`

---

### 2. Encontrar cómo usar una API

**Problema:** No sé cómo llamar al método de pagos

**Comandos usados:**

```bash
# 1. Buscar métodos relacionados con payments
grep "payments" node_modules/square/Client.d.ts

# 2. Ver la documentación del método
grep -A 30 "Creates a payment" node_modules/square/api/resources/payments/client/Client.d.ts

# 3. Ver el ejemplo completo
grep -A 50 "Creates a payment" node_modules/square/api/resources/payments/client/Client.d.ts
```

**Resultado:** Encontré el ejemplo de uso con `client.payments.create()`

---

### 3. Verificar parámetros de una función

**Problema:** Error de tipo en `accessToken`

**Comandos usados:**

```bash
# 1. Buscar la interfaz de opciones
grep -A 10 "interface BaseClientOptions" node_modules/square/BaseClient.d.ts

# 2. Ver todos los parámetros disponibles
grep -A 20 "interface BaseClientOptions" node_modules/square/BaseClient.d.ts
```

**Resultado:** Descubrí que se llama `token`, no `accessToken`

---

### 4. Explorar estructura de tipos

**Problema:** Error de tipo en `country`

**Comandos usados:**

```bash
# 1. Buscar la interfaz Address
grep -A 10 "interface.*Address" node_modules/square/api/types/Address.d.ts

# 2. Buscar el campo específico
grep "country" node_modules/square/api/types/Address.d.ts
```

**Resultado:** Vi que `country` es de tipo `Square.Country`, necesitaba un cast

---

## 💡 Tips y Trucos

### 1. Combinar grep con head/tail

```bash
# Ver solo las primeras coincidencias
grep -r "texto" . | head -10

# Ver solo las últimas coincidencias
grep -r "texto" . | tail -10
```

---

### 2. Buscar en archivos TypeScript específicamente

```bash
grep -r "texto" --include="*.ts" src/
```

---

### 3. Excluir directorios de la búsqueda

```bash
grep -r "texto" --exclude-dir=node_modules .
```

---

### 4. Contar coincidencias

```bash
grep -c "texto" archivo.txt
```

---

### 5. Ver solo nombres de archivos con coincidencias

```bash
grep -rl "texto" src/
```

---

## 🚀 Workflow Típico de Debugging

### Cuando hay un error de compilación:

```bash
# 1. Ver el error completo
bun run build 2>&1 | tail -30

# 2. Identificar el archivo y línea del error
# Ejemplo: ./src/app/api/route.ts:12:3

# 3. Buscar documentación del tipo/función
grep -A 20 "interface NombreDelTipo" node_modules/paquete/index.d.ts

# 4. Ver ejemplos de uso
grep -A 50 "método" node_modules/paquete/Client.d.ts

# 5. Corregir y verificar
bun run build
```

---

### Cuando necesitas entender una API:

```bash
# 1. Ver qué exporta el paquete
head -50 node_modules/paquete/index.d.ts

# 2. Buscar la clase/función principal
grep "NombreClase" node_modules/paquete/index.d.ts

# 3. Ver la definición completa
grep -B 5 -A 30 "class NombreClase" node_modules/paquete/Client.d.ts

# 4. Buscar ejemplos en comentarios
grep -A 20 "@example" node_modules/paquete/Client.d.ts
```

---

## 📚 Recursos Adicionales

### Documentación de comandos

```bash
man grep          # Manual de grep
man head          # Manual de head
man tail          # Manual de tail
grep --help       # Ayuda rápida de grep
```

---

### Atajos útiles

- `Ctrl + C` - Cancelar comando en ejecución
- `Ctrl + L` - Limpiar terminal
- `↑` / `↓` - Navegar historial de comandos
- `!!` - Repetir último comando
- `!grep` - Repetir último comando que empezó con "grep"

---

## 🎓 Ejercicios Prácticos

### Ejercicio 1: Explorar un paquete

```bash
# 1. Ver qué exporta zustand
head -20 node_modules/zustand/index.d.ts

# 2. Buscar la función create
grep -A 10 "function create" node_modules/zustand/index.d.ts

# 3. Ver ejemplos de uso
grep -A 20 "@example" node_modules/zustand/index.d.ts
```

---

### Ejercicio 2: Debugging de tipos

```bash
# 1. Encontrar un error de tipo en el build
bun run build 2>&1 | grep "Type error"

# 2. Buscar la definición del tipo
grep -r "interface NombreDelTipo" node_modules/

# 3. Ver propiedades disponibles
grep -A 15 "interface NombreDelTipo" node_modules/paquete/types.d.ts
```

---

### Ejercicio 3: Buscar en tu código

```bash
# 1. Encontrar todos los usos de una función
grep -rn "nombreFuncion" src/

# 2. Ver archivos que importan un módulo
grep -rl "from '@/lib/utils'" src/

# 3. Contar cuántas veces usas un hook
grep -rc "useState" src/
```

---

## 🔥 Comandos Avanzados

### Buscar y reemplazar (con sed)

```bash
# Ver qué cambiaría (dry-run)
grep "texto_viejo" archivo.txt

# Reemplazar en archivo (macOS)
sed -i '' 's/texto_viejo/texto_nuevo/g' archivo.txt

# Reemplazar en archivo (Linux)
sed -i 's/texto_viejo/texto_nuevo/g' archivo.txt
```

---

### Buscar archivos por nombre (find)

```bash
# Buscar archivos .ts
find src/ -name "*.ts"

# Buscar archivos que contengan "test"
find src/ -name "*test*"

# Buscar y ejecutar comando
find src/ -name "*.ts" -exec grep "texto" {} \;
```

---

### Buscar en historial de comandos

```bash
# Ver historial
history

# Buscar en historial
history | grep "bun"

# Ejecutar comando del historial
!123  # Ejecuta el comando número 123
```

---

## 📝 Notas Finales

### Mejores prácticas:

1. **Empieza simple**: Usa `cat` y `grep` básico primero
2. **Agrega complejidad**: Luego combina con pipes y opciones
3. **Lee la salida**: Los errores suelen tener la solución
4. **Usa tab**: Autocompletado para evitar errores de tipeo
5. **Guarda comandos útiles**: Crea aliases para comandos frecuentes

### Crear aliases (en ~/.zshrc o ~/.bashrc):

```bash
# Agregar al final del archivo
alias build="bun run build"
alias dev="bun run dev"
alias grepcode="grep -rn --exclude-dir=node_modules"
```

---

**¡Practica estos comandos y te volverás mucho más eficiente en debugging! 🚀**
