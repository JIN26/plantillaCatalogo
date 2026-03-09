# 🎨 Generador de Imágenes de Productos desde Excel

Este proyecto genera imágenes de productos automáticamente usando datos de un archivo Excel. Ideal para catálogos, comercio electrónico o presentaciones visuales.

## 📋 Descripción

El script lee productos desde `PRODUCTOS.xlsx`, busca las imágenes correspondientes, e inserta el ID, título y producto en una plantilla gráfica. Las imágenes finales se guardan en la carpeta `imgFinal/`.

## ✨ Características

- 🔄 **Generación automática** de imágenes desde Excel
- 📏 **Ajuste automático** del tamaño del producto
- 🖼️ **Eliminación automática** de fondo blanco
- 📝 **Título dinámico** que se adapta al espacio disponible
- 🆔 **Caja con ID** del producto
- 🎨 **Soporte para plantilla gráfica** personalizada
- 📦 **Procesamiento en lote** de múltiples productos

## 📁 Estructura del Proyecto

```
project/
│
├── img/
│   ├── plantilla.png    # Plantilla base para las imágenes
│   └── default.jpg      # Imagen por defecto si no se encuentra
│
├── font/
│   └── SANSSERIFCOLLECTION.TTF  # Fuente utilizada
│
├── imgFinal/            # Carpeta de salida para imágenes generadas
│
├── PRODUCTOS.xlsx       # Archivo Excel con datos de productos
├── index.js             # Script principal
├── package.json         # Dependencias del proyecto
└── README.md            # Este archivo
```

## 🛠️ Requisitos

- **Node.js** 18 o superior
- **npm** (viene incluido con Node.js)

### Verificar Instalación

```bash
node -v
npm -v
```

## 🚀 Instalación

1. Clona o copia los archivos del proyecto.
2. Instala las dependencias:

```bash
npm install
```

Las dependencias principales son:
- `xlsx`: Para leer archivos Excel
- `canvas`: Para generar y manipular imágenes

## 📊 Formato del Excel

El archivo `PRODUCTOS.xlsx` debe contener dos hojas:

### Hoja Principal (datos principales)
| ID    | TÍTULO                  |
|-------|-------------------------|
| 34879 | 100 HYDRO WHEY 2 LIBRAS |
| 97083 | 15cm 5m Cinta Impermeable Chova |
| 73281 | 2 METROS ROLLO VINIL   |

### Hoja "PRODUCTOS" (imágenes)
| ID    | TÍTULO                  | ... | IMAGENES (Columna U) |
|-------|-------------------------|-----|----------------------|
| 34879 | 100 HYDRO WHEY 2 LIBRAS | ... | https://ejemplo.com/img1.jpg,https://ejemplo.com/img2.jpg |
| 97083 | 15cm 5m Cinta Impermeable Chova | ... | https://ejemplo.com/img3.jpg |

**Nota:** El script toma automáticamente la primera imagen de la lista separada por comas en la columna U.

## ▶️ Uso

Ejecuta el generador con:

```bash
node index.js
```

### Salida Esperada

```
Procesando 3 productos...
Generando imagen para ID: 34879 - 100 HYDRO WHEY 2 LIBRAS
Generando imagen para ID: 97083 - 15cm 5m Cinta Impermeable Chova
Generando imagen para ID: 73281 - 2 METROS ROLLO VINIL
¡Todas las imágenes generadas exitosamente!
```

Las imágenes se guardarán en `imgFinal/` con nombres como `34879.png`.

## 📝 Notas

- Asegúrate de que `PRODUCTOS.xlsx` esté en la raíz del proyecto.
- La plantilla `img/plantilla.png` debe tener el diseño base deseado.
- Si una imagen no se encuentra, se usa `img/default.jpg`.

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Abre un issue o envía un pull request.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
Cómo funciona

El flujo del script es:

Leer productos desde Excel

Buscar la imagen del producto

Cargar la plantilla

Insertar producto en la plantilla

Dibujar ID y título

Guardar imagen final

Personalización

Puedes modificar fácilmente:

Posición del producto
const x = 22 ; const y = 320 ;   
   
Tamaño máximo del producto
constante maxWidth = 565 ; constante maxHeight = 565 ;   
   
Tamaño del título
ctx . font = 'bold 50px sans-serif' ; 
Salida generada

Cada producto genera una imagen como:

ID: 34879 
TÍTULO: 100 HYDRO WHEY 2 LIBRAS

en una plantilla gráfica lista para:

Catálogos

Tiendas en línea

Mercados

Redes sociales

Mejoras futuras (recomendadas)

Posibles mejoras del proyecto:

Descargar imágenes automáticamente si no existen localmente

Generar imágenes en paralelo (más rápido)

Exportar catálogo completo en PDF

Integrar generación desde CSV

Sistema automático de eliminación de fondos con IA