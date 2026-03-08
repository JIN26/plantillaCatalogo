const { createCanvas, loadImage, registerFont } = require('canvas');
const fs = require('fs');

async function generarImagen() {

  registerFont('SANSSERIFCOLLECTION.TTF', { family: 'sans-serif' });

  const plantilla = await loadImage('plantilla.png');
  const producto = await loadImage('platera.jpg');

  const canvas = createCanvas(plantilla.width, plantilla.height);
  const ctx = canvas.getContext('2d');

  const maxWidth = 565;
  const maxHeight = 900;

  let width = producto.width;
  let height = producto.height;

  const scale = Math.min(maxWidth / width, maxHeight / height);
  width *= scale;
  height *= scale;

  const x = 22;
  const y = 320;

  const tempCanvas = createCanvas(producto.width, producto.height);
  const tempCtx = tempCanvas.getContext('2d');

  tempCtx.drawImage(producto, 0, 0);
  removeWhiteBackground(tempCtx, producto.width, producto.height);

  // dibujar plantilla
  ctx.drawImage(plantilla, 0, 0);

  // pegar producto
  ctx.drawImage(tempCanvas, x, y, width, height);

  // =========================
  // TEXTO TITULO
  // =========================

  ctx.font = 'bold 68px Arial';
  ctx.fillStyle = '#111';
  ctx.letterSpacing = "3px";

  ctx.shadowColor = "rgba(0,0,0,0.25)";
  ctx.shadowBlur = 4;
  ctx.shadowOffsetY = 2;

  ctx.fillText('MINI LINTERNA', 50, 120);

  // quitar sombra
  ctx.shadowColor = "transparent";

  // =========================
  // CAJA ID
  // =========================

  const idText = "ID: 2840";

  ctx.font = 'bold 38px Arial';
  const textWidth = ctx.measureText(idText).width;

  const paddingX = 30;
  const paddingY = 18;

  const boxX = 50;
  const boxY = 150;

  const boxWidth = textWidth + paddingX * 2;
  const boxHeight = 60;

  drawRoundedRect(ctx, boxX, boxY, boxWidth, boxHeight, 18);

  const gradient = ctx.createLinearGradient(0, boxY, 0, boxY + boxHeight);
  gradient.addColorStop(0, "#e08a00");
  gradient.addColorStop(1, "#a65600");

  ctx.fillStyle = gradient;
  ctx.fill();

  ctx.fillStyle = "white";
  ctx.fillText(idText, boxX + paddingX, boxY + 42);

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync('producto_final.png', buffer);
}


// función para bordes redondeados
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

generarImagen();