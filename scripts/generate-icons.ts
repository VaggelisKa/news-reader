import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const sizes = [16, 32, 48, 64, 72, 96, 128, 256];

async function generateIcons() {
  const svgBuffer = await fs.readFile(
    path.join(process.cwd(), "app", "icon.svg")
  );

  for (const size of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .toFile(path.join(process.cwd(), "public", `icon-${size}x${size}.png`));
  }

  // Generate apple-icon.png (180x180)
  await sharp(svgBuffer)
    .resize(180, 180)
    .toFile(path.join(process.cwd(), "public", "apple-icon.png"));

  console.log("Icons generated successfully!");
}

generateIcons().catch(console.error);
