#!/usr/bin/env node
// Injects partials/header.html and partials/footer.html into every root *.html page
// between <!-- header:start --> / <!-- header:end --> (and footer) markers.
// Sets aria-current="page" on [data-nav] links that point at the page being written.
// No dependencies. Run from anywhere: node scripts/sync-partials.mjs
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const partials = { header: "partials/header.html", footer: "partials/footer.html" };
const source = Object.fromEntries(
  Object.entries(partials).map(([name, file]) => [name, readFileSync(join(root, file), "utf8").replace(/\r\n/g, "\n").trim()]),
);

/** Mark [data-nav] links whose href (no hash) is this page. Hash links never get aria-current. */
function setCurrent(html, page) {
  return html.replace(/<a\b[^>]*\bdata-nav\b[^>]*>/g, (tag) => {
    const href = /\bhref="([^"]*)"/.exec(tag)?.[1] ?? "";
    const clean = tag.replace(/\s+aria-current="[^"]*"/, "");
    return !href.includes("#") && href === page ? clean.replace(/\sdata-nav\b/, ' data-nav aria-current="page"') : clean;
  });
}

function inject(html, name, page) {
  const re = new RegExp(`([ \\t]*)<!-- ${name}:start -->[\\s\\S]*?<!-- ${name}:end -->`);
  const match = re.exec(html);
  if (!match) return { html, changed: false };
  const indent = match[1];
  const body = setCurrent(source[name], page)
    .split("\n")
    .map((line) => (line ? indent + line : line))
    .join("\n");
  return { html: html.replace(re, () => `${indent}<!-- ${name}:start -->\n${body}\n${indent}<!-- ${name}:end -->`), changed: true };
}

let count = 0;
for (const file of readdirSync(root).filter((f) => f.endsWith(".html")).sort()) {
  const path = join(root, file);
  const original = readFileSync(path, "utf8").replace(/\r\n/g, "\n");
  let html = original;
  const touched = [];
  for (const name of Object.keys(partials)) {
    const result = inject(html, name, file);
    html = result.html;
    if (result.changed) touched.push(name);
  }
  if (!touched.length) {
    console.log(`skip   ${file} (no markers)`);
    continue;
  }
  if (html !== original) writeFileSync(path, html);
  console.log(`${html !== original ? "synced" : "same  "} ${file} [${touched.join(", ")}]`);
  count++;
}
console.log(`${count} page(s) processed.`);
