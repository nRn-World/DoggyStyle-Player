import { Jimp } from 'jimp';
import path from 'path';

async function convert() {
  try {
    const image = await Jimp.read('Logo Bilder/Installation.png');
    // Resize to standard NSIS sidebar size (164x314)
    // We cover the area and center it
    image.cover({ w: 164, h: 314 });
    
    await image.write('Logo Bilder/installerSidebar.bmp');
    console.log('Successfully created installerSidebar.bmp');
  } catch (error) {
    console.error('Error converting image:', error);
  }
}

convert();
