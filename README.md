Generador de Imágenes de Productos desde Excel

Este proyecto genera imágenes de productos automáticamente usando datos de un archivo Excel .

El guión:

Lee productos desde PRODUCTOS.xlsx

Busca la imagen del producto

Inserta ID, título y producto en una plantilla

Genera imágenes finales listas para catálogo o comercio electrónico

Las imágenes se guardan en:

imgFinal/
Características

Generación automática de imágenes desde Excel

Ajuste automático del tamaño del producto.

Eliminación automática de fondo blanco.

Título dinámico que se adapta al espacio.

Caja con ID del producto

Soporte para plantilla gráfica personalizada

Procesamiento en lote de múltiples productos

Estructura del proyecto
project/ 
│ 
├── img/ 
│ ├── plantilla.png 
│ └── default.jpg 
│ 
├── font/ 
│ └── SANSSERIFCOLLECTION.TTF 
│ 
├── imgFinal/ 
│ 
├── PRODUCTOS.xlsx 
├── script.js 
└── README.md
Requisitos

Necesitas tener instalado:

Node.js 18+

npm

Verificar instalación:

nodo -v npm -v 
 
Instalación

Clonar el proyecto o copiar los archivos y ejecutar:

npm install xlsx canvas
Formato de Excel

El archivo PRODUCTOS.xlsx debe contener:

Hoja principal
ID	TÍTULO
34879	100 HYDRO WHEY 2 LIBRAS
34880	PROTEÍNA DE SUERO 5 LB
HojaPRODUCTOS
ID	TÍTULO	IMAGEN1	IMAGEN2	IMAGEN3
34879	100 HYDRO WHEY 2 LIBRAS	https://...jpg
	https://...jpg
	https://...jpg

El script tomará automáticamente la primera imagen disponible .

Ejecutar el generador
node script.js

Salida esperada en consola:

Procesando 50 productos... 
Generando imagen para ID: 34879 - 100 HYDRO WHEY 2 LIBRAS 
Generando imagen para ID: 34880 - PROTEINA WHEY 5 LB 
¡Todas las imágenes generadas exitosamente!

Las imágenes se guardarán en:

imgFinal/

Ejemplo:

imgFinal/ 
34879.png 
34880.png
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