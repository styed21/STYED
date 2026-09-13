import DottedMap from "dotted-map";
import { writeFile } from "node:fs/promises";
const region = { lat: { min: -60, max: 85 }, lng: { min: -180, max: 180 } };
const map = new DottedMap({
  height: 100,
  grid: "diagonal",
  projection: { name: "equirectangular" },
  region,
});
for (const [theme, color] of [
  ["light", "#728d8159"],
  ["dark", "#c2d6a66b"],
]) {
  const svg = map
    .getSVG({
      radius: 0.24,
      color,
      shape: "circle",
      backgroundColor: "transparent",
    })
    .replace("<svg ", '<svg preserveAspectRatio="none" ');
  await writeFile(`public/assets/world-dots-${theme}.svg`, svg);
}
await writeFile("src/data/map-region.json", JSON.stringify(region));
console.log("Generated reusable dotted world-map assets.");
