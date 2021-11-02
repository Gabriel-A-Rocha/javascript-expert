import { writeFile, readFile } from "fs/promises";
import { URL } from "url";

export const save = async (data) => {
  // __dirname, __filename are not available in ES Modules
  const { pathname } = new URL("../database.json", import.meta.url);
  const databaseFile = pathname.slice(1);
  const currentData = JSON.parse(await readFile(databaseFile));

  currentData.push(data);

  await writeFile(databaseFile, JSON.stringify(currentData));
};
