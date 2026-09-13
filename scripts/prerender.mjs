import { readFile, writeFile } from "node:fs/promises";
import { render } from "../.cache/ssr/entry-server.js";

for (const [file, page] of [
  ["index.html", "home"],
  ["about.html", "about"],
  ["programs.html", "programs"],
  ["get-involved.html", "involved"],
  ["donate.html", "donate"],
  ["contact.html", "contact"],
  ["mentorship.html", "mentorship"],
]) {
  const path = new URL(`../dist/${file}`, import.meta.url);
  const template = await readFile(path, "utf8");
  const markup = render(page);
  await writeFile(
    path,
    template.replace('<div id="root"></div>', `<div id="root">${markup}</div>`),
  );
  console.log(`Prerendered ${file}`);
}
