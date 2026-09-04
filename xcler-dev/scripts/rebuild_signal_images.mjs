import sharp from "sharp";
import fs from "fs";

const ink = { r: 7, g: 8, b: 12, alpha: 1 };

async function projectWebp(src, dest) {
  // Preserve full 3:2 dashboard + safe margin so edge labels never crop
  await sharp(src)
    .resize(1520, 1013, { fit: "contain", background: ink })
    .extend({ top: 27, bottom: 27, left: 40, right: 40, background: ink })
    .resize(1600, 1067)
    .webp({ quality: 88 })
    .toFile(dest);
  console.log("webp", dest);
}

async function projectJpg(src, dest) {
  await sharp(src)
    .resize(1520, 1013, { fit: "contain", background: ink })
    .extend({ top: 27, bottom: 27, left: 40, right: 40, background: ink })
    .resize(1600, 1067)
    .jpeg({ quality: 88 })
    .toFile(dest);
  console.log("jpg", dest);
}

async function webp(src, dest, w, h, fit = "cover") {
  await sharp(src)
    .resize(w, h, { fit, background: ink })
    .webp({ quality: 88 })
    .toFile(dest);
  console.log("webp", dest);
}

const projects = ["green-navigator", "aegisflow", "visapath", "overwatch"];

for (const name of projects) {
  const src = `public/projects/${name}.png`;
  await projectWebp(src, `public/projects/${name}.webp`);
  await projectJpg(src, `public/projects/${name}.jpg`);
  await projectWebp(src, `public/projects/${name}-v3.webp`);
}

await webp("public/og-image.png", "public/og-image.webp", 1200, 630);
await webp("public/services/ai-chatbots.png", "public/services/ai-chatbots.webp", 1200, 675);
await webp(
  "public/services/workflow-automation.png",
  "public/services/workflow-automation.webp",
  1200,
  675
);

await sharp("public/og-image.png")
  .resize(1200, 675, { fit: "cover" })
  .webp({ quality: 84 })
  .toFile("public/services/web-development.webp");

await sharp("public/services/workflow-automation.png")
  .modulate({ saturation: 1.05 })
  .resize(1200, 675, { fit: "cover" })
  .webp({ quality: 84 })
  .toFile("public/services/app-development.webp");

await sharp("public/services/ai-chatbots.png")
  .modulate({ brightness: 1.02 })
  .resize(1200, 675, { fit: "cover" })
  .webp({ quality: 84 })
  .toFile("public/services/commerce.webp");

const svg = fs.readFileSync("public/logo.svg");
await sharp(svg, { density: 320 })
  .resize(880, 232, { fit: "contain", background: { r: 7, g: 8, b: 12, alpha: 1 } })
  .png()
  .toFile("public/logo.png");
await sharp(svg, { density: 320 })
  .resize(880, 232, { fit: "contain", background: { r: 7, g: 8, b: 12, alpha: 1 } })
  .webp({ quality: 92 })
  .toFile("public/logo.webp");
await sharp("public/logo.png").resize(660, 174).png().toFile("public/logo-email.png");

const vignette = Buffer.from(
  `<svg width="900" height="1100"><defs><radialGradient id="g" cx="50%" cy="38%" r="72%"><stop offset="50%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#07080c" stop-opacity="0.62"/></radialGradient></defs><rect width="900" height="1100" fill="url(#g)"/></svg>`
);

for (const name of ["musharraf", "abeel", "mehru"]) {
  await sharp(`public/team/${name}.jpg`)
    .resize(900, 1100, { fit: "cover", position: "centre" })
    .modulate({ brightness: 0.9, saturation: 0.72 })
    .linear(1.08, -12)
    .composite([{ input: vignette, blend: "multiply" }])
    .webp({ quality: 82 })
    .toFile(`public/team/${name}.webp`);
  console.log("team", name);
}

console.log("ALL IMAGE REBUILDS DONE");
