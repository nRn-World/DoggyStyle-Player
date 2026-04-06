import { Jimp } from 'jimp';

async function resizeIcon() {
  try {
    console.log('Läser in logo.jpg...');
    const image = await Jimp.read('Logo Bilder/logo.jpg');
    
    console.log(`Originalstorlek: ${image.width}x${image.height}`);
    
    // Vi skapar en perfekt kvadrat (1024x1024)
    // Vi lägger logotypen centrerad i mitten
    // Vi använder vit bakgrund (eller transparent om möjligt)
    // Eftersom det är en JPG har den troligen vit bakgrund, så vi matchar det.
    
    const size = 1024;
    
    // Skapa en ny tom vit bild
    const newImage = new Jimp({ width: size, height: size, color: 0xffffffff });
    
    // Skala ner originalet så det får plats (bibehåll proportioner)
    const scale = Math.min(size / image.width, size / image.height) * 0.9; // 90% av ytan för marginaler
    image.scale(scale);
    
    // Centrera bilden på den nya vita kvadraten
    const x = (size - image.width) / 2;
    const y = (size - image.height) / 2;
    newImage.composite(image, x, y);
    
    console.log('Sparar ny icon.png (1024x1024)...');
    await newImage.write('Logo Bilder/icon.png');
    
    console.log('Klart! Ikonen är nu redo för Mac.');
  } catch (error) {
    console.error('Ett fel uppstod vid bildhanteringen:', error);
    process.exit(1);
  }
}

resizeIcon();
