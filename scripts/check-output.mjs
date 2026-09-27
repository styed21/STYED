import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import { resolve, dirname, relative } from "node:path";

const output = resolve("dist");
const pages = [
  "index.html",
  "about.html",
  "programs.html",
  "get-involved.html",
  "donate.html",
  "contact.html",
  "mentorship.html",
];
const html = new Map(
  await Promise.all(
    pages.map(async (file) => [
      file,
      await readFile(resolve(output, file), "utf8"),
    ]),
  ),
);
let checked = 0;

for (const [file, source] of html) {
  assert.match(source, /<main\b/, `${file}: missing prerendered content`);
  assert.match(source, /<h1\b/, `${file}: missing main heading`);
  assert.equal(
    (source.match(/<h1\b/g) || []).length,
    1,
    `${file}: one main heading required`,
  );
  assert.match(source, /<title>[^<]+<\/title>/, `${file}: missing page title`);
  const ids = [...source.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(ids.length, new Set(ids).size, `${file}: duplicate IDs`);
  for (const [, target] of source.matchAll(/(?:href|src|poster)="([^"]+)"/g)) {
    if (/^(?:https?:|data:|mailto:|tel:)/.test(target)) continue;
    const [pathAndQuery, hash] = target.split("#");
    const pathname = pathAndQuery.split("?")[0];
    const destination =
      pathname === "/"
        ? resolve(output, "index.html")
        : pathname
          ? resolve(output, pathname.replace(/^\//, ""))
          : resolve(output, file);
    assert(
      !relative(output, destination).startsWith(".."),
      `${file}: reference outside public output`,
    );
    assert((await stat(destination)).isFile(), `${file}: missing ${target}`);
    if (hash && destination.endsWith(".html")) {
      const targetHtml = await readFile(destination, "utf8");
      assert(
        targetHtml.includes(`id="${hash}"`),
        `${file}: missing anchor ${target}`,
      );
    }
    checked++;
  }
}

async function inspect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    assert(
      !["STYED", ".archive", ".env", "node_modules"].includes(entry.name),
      "Private files in output",
    );
    if (entry.isDirectory()) await inspect(path);
    else if (entry.name.endsWith(".css")) {
      const css = await readFile(path, "utf8");
      for (const [, raw] of css.matchAll(/url\(([^)]+)\)/g)) {
        const target = raw.replace(/^['"]|['"]$/g, "");
        if (/^(?:data:|https?:|#)/.test(target)) continue;
        const assetPath = target.startsWith("/")
          ? resolve(output, target.slice(1))
          : resolve(dirname(path), target);
        assert((await stat(assetPath)).isFile(), `Missing CSS asset ${target}`);
        checked++;
      }
    }
  }
}
await inspect(output);
console.log(
  `Validated ${pages.length} prerendered pages and ${checked} local links/assets. No private material in public output.`,
);
