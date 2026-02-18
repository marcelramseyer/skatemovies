import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Ordner anpassen
const inputDir = './originals';
const outputDir = './public/images';

// Output-Ordner anlegen, falls nicht vorhanden
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

const files = fs.readdirSync(inputDir);

for (const file of files) {
  if (!file.match(/\.(jpg|jpeg|png)$/i)) continue;

  const inputFile = path.join(inputDir, file);
  const outputFile = path.join(
    outputDir,
    file.replace(/\.(jpg|jpeg|png)$/i, '.webp'),
  );

  // Prüfen, ob WebP schon existiert und aktueller ist
  if (fs.existsSync(outputFile)) {
    const inputStat = fs.statSync(inputFile);
    const outputStat = fs.statSync(outputFile);

    if (inputStat.mtime <= outputStat.mtime) {
      console.log(`⏭ ${file} schon aktuell`);
      continue; // überspringen
    }
  }

  // Bild resize + WebP
  await sharp(inputFile)
    .resize(400, 600, { fit: 'cover' })
    .webp({ quality: 70 })
    .toFile(outputFile);

  console.log(`✓ ${file} verarbeitet`);
}

console.log('Alle Bilder abgeglichen!');
