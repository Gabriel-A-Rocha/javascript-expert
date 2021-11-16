"use strict";

const { readFile, writeFile } = require("fs/promises");
const { join } = require("path");
const pdf = require("pdf-parse");

(async () => {
  const dataBuffer = await readFile(join(__dirname, "./../../../docs/contrato.pdf"));
  const data = await pdf(dataBuffer);
  await writeFile(join(__dirname, "text.txt"), data.text.trim());
})();
