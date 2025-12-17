import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AVATAR_DIR = path.join(__dirname, '../src/assets/avatar');
const SIZES = {
  sm: 60,  // untuk avatar kecil
  md: 120  // untuk avatar besar
};

const AVATARS = [
  'Grandma', 'Woman', 'YoungGirl', 'Childgirl', 'Baby',
  'Granpa', 'Man', 'Youngman', 'Childman'
];

async function optimizeAvatars() {
  for (const avatar of AVATARS) {
    const inputPath = path.join(AVATAR_DIR, `${avatar}.jpg`);

    if (!fs.existsSync(inputPath)) {
      console.warn(`Warning: File tidak ditemukan - ${inputPath}`);
      continue;
    }

    for (const [size, dimension] of Object.entries(SIZES)) {
      // WebP version
      await sharp(inputPath)
        .resize(dimension, dimension, {
          fit: 'cover',
          position: 'center'
        })
        .webp({ quality: 80 })
        .toFile(path.join(AVATAR_DIR, `${avatar}-${size}.webp`));

      // JPG version
      await sharp(inputPath)
        .resize(dimension, dimension, {
          fit: 'cover',
          position: 'center'
        })
        .jpeg({ quality: 80 })
        .toFile(path.join(AVATAR_DIR, `${avatar}-${size}.jpg`));
    }

    console.log(`✓ Optimized ${avatar}`);
  }
}

optimizeAvatars().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
