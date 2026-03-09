const XLSX = require('xlsx');
const { createCanvas, loadImage, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');

// =========================
// LEER DATOS DEL EXCEL
// =========================

function leerDatosExcel(rutaExcel, sheetName = null) {
  const workbook = XLSX.readFile(rutaExcel);
  const sheet = sheetName ? workbook.Sheets[sheetName] : workbook.Sheets[workbook.SheetNames[0]];
  const datos = XLSX.utils.sheet_to_json(sheet, {header:1});
  return datos;
}

async function generarImagen(link, id, titulo) {

  registerFont('font/SANSSERIFCOLLECTION.TTF', { family: 'sans-serif' });

  const plantilla = await loadImage('img/plantilla.png');
  const producto = await loadImage(link);

  const canvas = createCanvas(plantilla.width, plantilla.height);
  const ctx = canvas.getContext('2d');

  const maxWidth = 565;
  const maxHeight = 565;

  let width = producto.width;
  let height = producto.height;

  const scale = Math.min(maxWidth / width, maxHeight / height);
  width *= scale;
  height *= scale;

  const x = 22;
  const y = 320;

  // Canvas temporal para quitar fondo
  const tempCanvas = createCanvas(producto.width, producto.height);
  const tempCtx = tempCanvas.getContext('2d');

  tempCtx.drawImage(producto, 0, 0);
  removeWhiteBackground(tempCtx, producto.width, producto.height);

  // Dibujar plantilla
  ctx.drawImage(plantilla, 0, 0);

  // Dibujar producto
  ctx.drawImage(tempCanvas, x, y, width, height);


  // =========================
  // CAJA ID
  // =========================

  const idText = "ID: " + id;

  ctx.font = 'bold 38px sans-serif';
  const textWidth = ctx.measureText(idText).width;

  const paddingX = 22;

  const boxX = 20;
  const boxY = 230;

  const boxWidth = textWidth + paddingX * 2;
  const boxHeight = 40;

  drawRoundedRect(ctx, boxX, boxY, boxWidth, boxHeight, 18);

  const gradient = ctx.createLinearGradient(0, boxY, 0, boxY + boxHeight);
  gradient.addColorStop(0, "#e08a00");
  gradient.addColorStop(1, "#a65600");

  ctx.fillStyle = gradient;
  ctx.fill();

  ctx.fillStyle = "white";
  ctx.fillText(idText, boxX + paddingX, boxY + 32);

  // =========================
  // CAJA BLANCA CON TITULO
  // =========================

  const whiteBoxY = 270;
  const whiteBoxWidth = 570;

  ctx.font = 'bold 50px sans-serif';

  const textHeight = calculateTextHeight(ctx, titulo, whiteBoxWidth, 50);
  const whiteBoxHeight = textHeight; // padding
  drawRoundedRect(ctx, boxX, whiteBoxY, whiteBoxWidth, whiteBoxHeight, 18);
  
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.fillStyle = "black";
  
  ctx.strokeStyle = "#141313";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.shadowColor = "rgba(233, 0, 0, 0.25)";
  ctx.shadowBlur = 4;
  ctx.shadowOffsetY = 2;

  drawTextBox(
    ctx,
    titulo,
    paddingX,   // X
    310,  // Y
    whiteBoxWidth+20,  // ancho máximo
    50    // altura entre líneas
  );

  ctx.shadowColor = "transparent";

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync('imgFinal/' + id + '.png', buffer);
}


// =========================
// CALCULAR ALTURA DEL TEXTO
// =========================

function calculateTextHeight(ctx, text, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  let lines = 1;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      lines++;
      line = words[n] + ' ';
    } else {
      line = testLine;
    }
  }

  return lines * lineHeight;
}

function drawTextBox(ctx, text, x, y, maxWidth, lineHeight) {

  const words = text.split(' ');
  let line = '';

  for (let n = 0; n < words.length; n++) {

    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {

      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;

    } else {

      line = testLine;

    }

  }

  ctx.fillText(line, x, y);

}


// =========================
// RECTÁNGULO REDONDEADO
// =========================

function drawRoundedRect(ctx, x, y, width, height, radius) {

  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();

}


// =========================
// ELIMINAR FONDO BLANCO
// =========================

function removeWhiteBackground(ctx, width, height) {

  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {

    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    if (r > 240 && g > 240 && b > 240) {
      data[i + 3] = 0;
    }

  }

  ctx.putImageData(imageData, 0, 0);
}


// =========================
// ENCONTRAR IMAGEN
// =========================

function encontrarImagen(titulo, productosDatos) {
  // productosDatos is array of arrays, [0] is headers
  const dataRows = productosDatos.slice(1);
  const matchingRows = dataRows.filter(row => row[1] === titulo);
  const link = matchingRows[0][2].split(',')[0]; // column C is index 2
  return link.trim();
}

async function procesarExcel() {
  try {
    const workbook = XLSX.readFile('PRODUCTOS.xlsx');
    const mainSheetName = workbook.SheetNames[0];
    const mainDatos = XLSX.utils.sheet_to_json(workbook.Sheets[mainSheetName]);

    const productosDatos = leerDatosExcel('PRODUCTOS.xlsx', 'PRODUCTOS');

    console.log(`Procesando ${mainDatos.length} productos...`);

    for (const producto of mainDatos) {
      console.log(`Generando imagen para ID: ${producto.ID} - ${producto.TITULO}`);

      const imagen = encontrarImagen(producto.TITULO, productosDatos);

      await generarImagen(
        imagen || 'img/default.jpg',
        producto.ID,
        producto.TITULO
      );
    }

    console.log('¡Todas las imágenes generadas exitosamente!');

  } catch (error) {
    console.error('Error al procesar el Excel:', error.message);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  procesarExcel();
}