"use strict";

const { readFile, writeFile } = require("fs/promises");
const { join } = require("path");
const pdf = require("pdf-parse");

const { TextProcessorFacade } = require("./textProcessorFacade");

(async () => {
  const dataBuffer = await readFile(join(__dirname, "./../../../docs/contrato.pdf"));
  const data = await pdf(dataBuffer);
  const text = data.text.trim();
  await writeFile(join(__dirname, "text.txt"), text);

  const instance = new TextProcessorFacade(text);
  const people = instance.getPeopleFromPDF();
  console.log("🪁   people", people);
})();
